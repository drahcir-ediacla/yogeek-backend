const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Define the '/users' route
router.post('/api/register', AuthController.registerUser);
router.post('/api/login', AuthController.loginUser);
router.get('/api/logout', AuthController.logoutUser);

module.exports = router;
