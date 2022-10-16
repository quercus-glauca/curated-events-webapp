import { validateInputEmail, validateInputText } from "./validation-data-helper";

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