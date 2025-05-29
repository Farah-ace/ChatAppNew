const z = require('zod');
const { ZodError } = require('zod');
const messages = require('../constants/messages');

const validate = (schema) => {
  return (req, res, next) => {
    try {

      const parsedData = schema.parse(req.body);
      //console.log(parsedData);
      req.body = parsedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("Zod Validation Error:", error.errors);
        return res.status(400).json(error.errors);

        // const formattedErrors = error.errors.reduce((acc, err) => {
        //   acc[err.path[0]] = err.message;
        //   return acc;
        // }, {});
        // return res.status(400).json({
        //   message: messages.ZOD_VALIDATION_FAILED,
        //   errors: formattedErrors,
        // });


      }
      //errors
      return res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR });
    }
  };
};

module.exports = { validate };

