const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const urlRegex = /(http|https):\/\/\w*.\w*/;
        return urlRegex.test(v);
      },
      message: 'Введите корректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const urlRegex = /(http|https):\/\/\w*.\w*/;
        return urlRegex.test(v);
      },
      message: 'Введите корректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const urlRegex = /(http|https):\/\/\w*.\w*/;
        return urlRegex.test(v);
      },
      message: 'Введите корректный URL',
    },
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
