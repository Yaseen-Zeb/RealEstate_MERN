const express = require('express');
const RegisterController = require('../controllers/RegisterController.js');
const LoginController = require('../controllers/LoginController.js');
const Profile = require('../controllers/Profile.js');
const UpdateUser = require('../controllers/UpdateUser.js');
const ListingController = require('../controllers/ListingController.js');
const { body, validationResult } = require('express-validator');
const router = express.Router();


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split("/")[1]);
    }
});

const fileFilter = (req, file, cb) => {
    // Check if the file type is JPEG
    let ext = file.mimetype.split("/")[1]
    if (ext === 'png'||ext === 'jpeg'||ext === 'jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// router.post('/list/create', upload.fields([{name:'images'}]), CreateListing);


router.post('/list/create',upload.array('images'),[
    body('title').notEmpty().withMessage('Title field is required'),
    body('address').notEmpty().withMessage('Address field is required'),
    body('description').notEmpty().withMessage('Description field is required'),
    body('bedrooms')
      .notEmpty().withMessage('Bed Rooms field is required')
      .isInt({ min: 1 }).withMessage('Bed Rooms field must be greater than zero'),
    body('bathrooms')
      .notEmpty().withMessage('Bath Rooms field is required')
      .isInt({ min: 1 }).withMessage('Bath Rooms field must be greater than zero'),
    body('price')
      .notEmpty().withMessage('Price/Month field is required')
      .isInt({ min: 1 }).withMessage('Price/Month field must be greater than zero'),
    body('images')
      .custom((value, { req }) => {
        if (!req.files || req.files.length === 0) {
          throw new Error('No image selected.');
        }

        // Check each file's extension
        for (let i = 0; i < req.files.length; i++) {
          const ext = req.files[i].originalname.split('.').pop().toLowerCase();
          if (!['png', 'jpeg', 'jpg'].includes(ext)) {
            throw new Error('Only images (jpeg, png, jpg) are allowed.');
          }
        }

        return true;
      }),
  ],
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(200).json({ errors: errors.array() });
      }
      next()

}, ListingController.createListing);

router.post('/list/update/:id',upload.array('images'),[
    body('title').notEmpty().withMessage('Title field is required'),
    body('address').notEmpty().withMessage('Address field is required'),
    body('description').notEmpty().withMessage('Description field is required'),
    body('bedrooms')
      .notEmpty().withMessage('Bed Rooms field is required')
      .isInt({ min: 1 }).withMessage('Bed Rooms field must be greater than zero'),
    body('bathrooms')
      .notEmpty().withMessage('Bath Rooms field is required')
      .isInt({ min: 1 }).withMessage('Bath Rooms field must be greater than zero'),
    body('price')
      .notEmpty().withMessage('Price/Month field is required')
      .isInt({ min: 1 }).withMessage('Price/Month field must be greater than zero'),
    body('images')
      .custom((value, { req }) => {

        // Check each file's extension
        for (let i = 0; i < req.files.length; i++) {
          const ext = req.files[i].originalname.split('.').pop().toLowerCase();
          if (!['png', 'jpeg', 'jpg'].includes(ext)) {
            throw new Error('Only images (jpeg, png, jpg) are allowed.');
          }
        }

        return true;
      }),
  ],
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(200).json({ errors: errors.array() });
      }
      next()

}, ListingController.updateListing);


router.post('/user/register', [
    body("name", "User Name field is required").notEmpty(),
    body('name', "User Name should be at least 3 characters").isLength({ min: 3 }),
    body("email", "Email field is required").notEmpty(),
    body('email', "Enter a valid email").isEmail(),
    body("password", "password field is required").notEmpty(),
    body('password', "Password should be at least 6 characters").isLength({ min: 6 }),
],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        }
        next()
    }, RegisterController);



router.post('/user/login', [
    body('email').notEmpty().withMessage('Email field is required'),
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Password field is required').notEmpty(),
],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        }
        next()
    }, LoginController);
router.post('/user/updateuser/:id', UpdateUser);

router.post('/user-listings', ListingController.userListing);
router.get('/remove-listings/:id/:userRef', ListingController.removeListing);
router.get('/listing/:id', ListingController.Listing);


module.exports = router;






