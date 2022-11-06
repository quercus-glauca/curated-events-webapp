import _ from "lodash";

const MIN_PASSWORD_LENGTH = 6;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Email
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function validateInputEmail(email) {
  if (typeof email !== "string") {
    return [false, 'Bogus email address'];
  }

  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  if (!pattern.test(email)) {
    return [false, 'Invalid email address'];
  }

  return [true, 'Email address admitted'];
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Text
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function validateInputText(text, details) {
  if (typeof text !== "string") {
    return [false, `Bogus ${_.lowerCase(details)} field`];
  }

  if (text.trim() === '') {
    return [false, `Invalid ${_.lowerCase(details)} field`];
  }

  return [true, `${_.capitalize(details)} field admitted`];
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Password
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function validateInputPassword(password) {
  if (typeof password !== "string") {
    return [false, 'Bogus password field'];
  }

  if (password.trim() === '') {
    return [false, 'Invalid password'];
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return [false, 'Password too short'];
  }

  return [true, 'Password field admitted'];
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// RegistrationData
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function validateRegistrationData(registrationData) {
  let inputAccepted, rejectedDetails;

  [inputAccepted, rejectedDetails] = validateInputEmail(registrationData.email);
  if (!inputAccepted) {
    return [inputAccepted, rejectedDetails];
  }

  return [true, 'Registration data admitted'];
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// SignupData
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function validateSignupData(signupData) {
  let inputAccepted, rejectedDetails;

  [inputAccepted, rejectedDetails] = validateInputEmail(signupData.email);
  if (!inputAccepted) {
    return [inputAccepted, rejectedDetails];
  }

  [inputAccepted, rejectedDetails] = validateInputText(signupData.name, 'user name');
  if (!inputAccepted) {
    return [inputAccepted, rejectedDetails];
  }

  [inputAccepted, rejectedDetails] = validateInputPassword(signupData.password);
  if (!inputAccepted) {
    return [inputAccepted, rejectedDetails];
  }

  return [true, 'Sign-up data admitted'];
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// UserComment
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function validateUserComment(userComment) {
  let inputAccepted, rejectedDetails;

  [inputAccepted, rejectedDetails] = validateInputEmail(userComment.email);
  if (!inputAccepted) {
    return [inputAccepted, rejectedDetails];
  }

  [inputAccepted, rejectedDetails] = validateInputText(userComment.name, 'user name');
  if (!inputAccepted) {
    return [inputAccepted, rejectedDetails];
  }

  [inputAccepted, rejectedDetails] = validateInputText(userComment.text, 'comment body');
  if (!inputAccepted) {
    return [inputAccepted, rejectedDetails];
  }

  return [true, 'User comment admitted'];
}
