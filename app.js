const express = require('express');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const { signinValidation, signupValidation } = require('./validators');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

const { login, createUser, signout } = require('./controllers/auth');

const app = express();

app.use(express.json());

app.use(requestLogger);

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb',
  { useNewUrlParser: true, useUnifiedTopology: true },
)
  .then(() => {
    const port = process.env.PORT || 3000;

    app.post('/signup', signupValidation, createUser);
    app.post('/signin', signinValidation, login);
    app.post('/signout', signout);

    app.use(auth);

    app.use('/users', usersRouter);
    app.use('/movies', moviesRouter);

    app.use(errorLogger);

    // handle not existing routes
    app.use('*', () => {
      throw new NotFoundError('Запрашиваемая страница не найдена');
    });

    // centralized error handler
    app.use((err, req, res, next) => {
      const { statusCode = 500, message } = err;
      res
        .status(statusCode)
        .send({
          message: statusCode === 500
            ? 'На сервере произошла ошибка'
            : message,
        });
      next();
    });

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Слушаю порт ${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Ошибка подключения к базе: ${err}`);
  });
