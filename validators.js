const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    owner: Joi.string().required().custom((value, helpers) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).allow(''),
    about: Joi.string().min(2).max(30).allow(''),
    avatar: Joi.string().uri().allow('').custom((value, helpers) => {
      const urlPattern = /^(https?:\/\/)(www\.)?([\w-]+)\.([\w-]+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
      if (!urlPattern.test(value) && value !== '') {
        return helpers.message('Некорректный URL');
      }
      return value;
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }).error(new Error('Validation failed')),
});

module.exports = {
  validateObjId,
  validateMovie,
  signinValidation,
  signupValidation,
  validateUserUpdate,
};
