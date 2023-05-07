const config = {
    usernameRegex: /^[a-zA-Z0-9_]{3,16}$/,
    lastNameRegex: /^[a-zA-Z0-9_]{3,16}$/,
    firstNameRegex: /^[a-zA-Z0-9_]{3,16}$/,
    emailRegex: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    usernameErrorMessage: 'Username must be 3 to 16 characters long and can contain letters, numbers, and underscores.',
    firstNameErrorMessage: 'First name must be 3 to 16 characters long and can contain letters, numbers, and underscores.',
    lastNameErrorMessage: 'First name must be 3 to 16 characters long and can contain letters, numbers, and underscores.',
    emailErrorMessage: 'Email must have this format: text@example.com ',
    emailErrorPwd: 'Password must be at least 8 characters',
  };
  
export default config;
  