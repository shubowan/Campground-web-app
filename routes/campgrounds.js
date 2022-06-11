const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')
const campground = require('../controllers/campground')
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({storage})

// list campgrouds
router.get('/', catchAsync(campground.index))

// add new campground
router.get('/new', isLoggedIn, campground.renderNewForm)

router.post('/', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campground.createCampground))

// show campground details
router.get('/:id', catchAsync(campground.showCampground))

// edit campground
router.get('/:id/edit', isLoggedIn, isAuthor, campground.renderEditForm)

router.put('/:id', isLoggedIn, upload.array('image'), validateCampground, catchAsync(campground.editCampground))

// delete campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campground.deleteCampground))

module.exports = router