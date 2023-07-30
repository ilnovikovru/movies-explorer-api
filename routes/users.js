const express = require('express');
const { getUserInfo, updateUserInfo } = require('../controllers/user');
const { validateUserUpdate } = require('../validators');

const router = express.Router();

router.get('/api/me', getUserInfo);
router.patch('/api/me', validateUserUpdate, updateUserInfo);

module.exports = router;
