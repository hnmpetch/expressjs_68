const express = require('express');
const router = express.Router();
const users = require('../controller/userController.js')

router.get('/', users.getUsers);
router.get('/:id', users.getUser);
router.post('/register', users.registerUser);
router.delete('/:id', users.deleteUser);

module.exports = router;