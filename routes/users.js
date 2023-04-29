const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, storeReturnTo} = require('../middleware');
const users = require('../controllers/user');
const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.createUser))

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.userLogin)

router.post('/register', catchAsync(users.createUser));

router.get('/logout', isLoggedIn, users.userLogout); 

module.exports = router;