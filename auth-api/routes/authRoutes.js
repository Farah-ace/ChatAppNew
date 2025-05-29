const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const { registerSchema,
    signInSchema,
    forgotPasswordSchema,
    otpVerifySchema,
    resetPasswordSchema, } = require('../validation/userValidation');

const { validate } = require('../middleware/validate');
const sendEmail = require('../utils/sendEmail');

//Auth routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/verify-email', validate(otpVerifySchema), authController.verifyEmail);
router.post('/login', validate(signInSchema), authController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);
router.get('/users', protect, isAdmin, authController.getUsers);
//router.put('/user/:id', protect, isAdmin, authController.updateUser);
router.delete('/user/:id', protect, isAdmin, authController.deleteUser);



module.exports = router;

