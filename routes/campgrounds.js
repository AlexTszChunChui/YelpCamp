const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const campgrounds = require('../controllers/campground');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.create))
    

router.get('/new', isLoggedIn, catchAsync(campgrounds.newForm))

router.route('/:id')
    .get(catchAsync(campgrounds.getCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit', isLoggedIn, catchAsync(campgrounds.editForm))

module.exports = router;