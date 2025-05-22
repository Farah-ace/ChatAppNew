const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
import { validate } from '../models/User';
import {
    registerSchema,
    signInSchema,
    forgotPasswordSchema,
    otpVerifySchema,
    resetPasswordSchema,
} from '../validation/userValidation';
import { validate } from '../middleware/validate';

router.post('/register', validate(registerSchema), authController.register);
router.post('/verify-email', validate(otpVerifySchema), authController.verifyEmail);
router.post('/login', validate(signInSchema), authController.login);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);
router.get('/users', protect, isAdmin, authController.getUsers);
router.put('/user/:id', protect, isAdmin, authController.updateUser);

module.exports = router;

