const z = require('zod')


// Sign Up Schema
exports.registerSchema = z.object({
    name: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 chracters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must containe at least one number"),
    confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ['confirmPassword'],
});

// Sign In Schema
exports.signInSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string(),
});

// Forgot Password Schema
exports.forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email'),
});

// OTP Verification Schema
exports.otpVerifySchema = z.object({
    email : z.string().email("Invalid email"),
    otp: z.string()
        .length(6, 'OTP must be exactly 6 characters')
        .regex(/^\d+$/, 'OTP must be numeric'),
});

// Reset Password Schema
exports.resetPasswordSchema = z.object({
    email : z.string().email("Invalid email"),
    otp: z.string()
        .length(6, 'OTP must be exactly 6 characters')
        .regex(/^\d+$/, 'OTP must be numeric'),
    newPassword: z.string().min(8, "Password must be at least 8 chracters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must containe at least one number"),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
});
