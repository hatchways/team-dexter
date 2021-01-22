//Middleware for validating contents of the req body
//Add validation to a route:
//  1) Create a validation chain
//  2) Include in module.exports
//  3) Include as middleware in app.js

const { body, validationResult } = require('express-validator');
const { BadRequest } = require('../utils/errors');

validate_entry = [
  body('email').exists().trim().isEmail().normalizeEmail(),
  body('password').exists().isLength({ min: 6 }),
  body('courses').custom(courses => {
      if (courses) {
          return Array.isArray(courses);
      }
      return true;
  }),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const response = errors.errors.map(err => err.param);
          const err = new BadRequest(response);
          return res.status(err.getCode()).send({
            status: 'Error',
            response: err.response,
          });
      }
      next();
  },
];

module.exports = {
    entry: validate_entry,
};
