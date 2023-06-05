const express = require('express');
const userRoute = express.Router();
const { addUser, verifyOtp, deleteUser, getUser, updateUser, getMe, checkEmail } = require('../controllers/signupController');
const { authUser } = require('../middleware/auth');

userRoute
    .get('/me', getMe)
    .get('/:id', authUser, getUser)
    .get('/checkEmail/:email',checkEmail)
    .post('/', addUser)
    .post('/verifyOtp', verifyOtp)
    .put('/:id', authUser, updateUser)
    .delete('/:id', authUser, deleteUser);

module.exports = userRoute;  