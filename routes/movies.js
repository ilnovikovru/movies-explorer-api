const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateObjId, validateMovie } = require('../validators');

const router = express.Router();

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:id', validateObjId, deleteMovie);

module.exports = router;
