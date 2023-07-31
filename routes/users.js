const express = require('express');
const { getUserInfo, updateUserInfo } = require('../controllers/user');
const { validateUserUpdate } = require('../validators');

const router = express.Router();

router.get('/me', getUserInfo);
router.patch('/me', validateUserUpdate, updateUserInfo);

module.exports = router;
