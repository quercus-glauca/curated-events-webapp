import _ from "lodash";


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
