const { body, validationResult } = require('express-validator');

exports.loginValidation = 
  [
    // body('username').isLength({ min: 5 }),
    body('email').isEmail(),
    // ... other validation rules for the request body
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Process the request if validation passes
    // ...
    res.status(200).json({ message: 'Request body is valid' });
  }
