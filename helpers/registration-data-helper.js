import { validateInputEmail } from "./validation-data-helper";

export function validateRegistrationData(registrationData) {
  let inputAccepted, rejectedDetails;
  
  [inputAccepted, rejectedDetails] = validateInputEmail(registrationData.email);
  if (!inputAccepted) {
    return [inputAccepted, rejectedDetails];
  }

  return [true, 'Registration data admitted'];
}