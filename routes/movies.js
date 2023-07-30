const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const { validateObjId, validateMovie } = require('../validators');

const router = express.Router();

router.get('/api/', getMovies);
router.post('/api/', validateMovie, createMovie);
router.delete('/api/:_id', validateObjId, deleteMovie);

module.exports = router;
