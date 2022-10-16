import _ from "lodash";


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


export function validateInputText(text, details) {
  if (typeof text !== "string") {
    return [false, `Bogus ${_.lowerCase(details)} field`];
  }

  if (text.trim() === '') {
    return [false, `Invalid ${_.lowerCase(details)} field`];
  }

  return [true, `${_.capitalize(details)} field admitted`];
}
