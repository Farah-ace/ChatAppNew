const z = require('zod');
const { ZodError } = require('zod');
const messages = require('../constants/messages');

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: messages.ZOD_VALIDATION_FAILED,
          errors: error.format(),
        });
      }
      // Handle unexpected errors
      return res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR });
    }
  };
};

module.exports = { validate };

