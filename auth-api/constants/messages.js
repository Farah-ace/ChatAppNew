module.exports = {
  //Error Messages  
  ZOD_VALIDATION_FAILED: 'Validation failed',
  INTERNAL_SERVER_ERROR: 'Internal server error',

  UNAUTHORIZED_USER_ERROR: 'Unauthorized',
  TOKEN_VALIDATION_ERROR: 'Token invalid or expired',
  ADMIN_ACCESS_ERROR: 'Admin access required',

  EMAIL_ALREADY_REGISTERED_ERROR: 'Email already registered',
  OTP_VALIDATION_ERROR: 'Invalid or expired OTP',

  INVALID_EMAIL_ERROR: 'Email is invalid',
  EMAIL_VERIFICATION_ERROR: 'Please verify your email first',

  INCORRECT_PASSWORD_ERROR: 'Password is incorrect',

  USER_NOT_EXIST_ERROR: 'User not does not exist',

  //Success Messages
  USER_REGISTERED_SUCCESS: (userName) => `User ${userName} registered successfully. Please verify email using OTP.`,
  EMAIL_VERIFICATION_SUCCESS: 'Email verified successfully',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  USER_DELETED_SUCCESS: 'User deleted successfully',
  LOGIN_SUCCESS: 'Login successfully',



  //Declarative Messages
  VERIFY_ACCOUNT: 'Verify Your Account',
  //VERIFICATION_OTP : (otp) => `Your verification OTP is ${otp}`,
  OTP_MESSAGE: 'Your OTP is ',
  RESET_PASSWORD_OTP: 'OTP for Password Reset',
  OTP_SENT: 'OTP sent to your email',
  BAD_WORDS_USED: 'Bad Words Used',

  //Chat Controller Error
  MESSAGE_FETCH_ERROR: 'Error fetching messages',
  ADMIN_NOTIFICATION_FAILED: 'Failed to notify admin',

  //Chat Controller Success
  ADMIN_NOTIFIED: 'Admin notified successfully',


};
