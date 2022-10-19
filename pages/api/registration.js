//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Entry Point: /api/registration
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
  validateRegistrationData
} from '../../helpers/registration-data-helper';

import {
  buildGetResponse,
  buildPostResponse,
  buildDeleteResponse,
  buildMethodNotAllowed
} from '../../helpers/api-response-helper';


export default async function handler(req, res) {
  console.debug(`[API] ${req.method} /api/registration HANDLER BEGIN...`);

  if (req.method === 'POST') {
    try {
      const registrationData = req.body.registrationData;

      // This is a MUST at the Backend: VALIDATE USER INPUT
      let finalItemOrErrorString;
      const [inputAccepted, rejectedDetails] = validateRegistrationData(registrationData);
      if (!inputAccepted) {
        finalItemOrErrorString = rejectedDetails;
      }
      else {
        finalItemOrErrorString = {
          ...registrationData,
          date: new Date().toISOString(),
          welcome: 'Welcome! You are now registered. Thank you!',
        };
      }

      const [, status, response] = buildPostResponse(
        "/api/registration",
        finalItemOrErrorString,
        "the registration data");
      console.debug(`[API] ${req.method} Responding to client...`);
      res.status(status).json(response);
    }
    catch (error) {
      console.error(`[API] ${req.method} Error:`, error);
      res.status(500).json(error);
    }

  }
  else {
    const [, status, response] = buildMethodNotAllowed(
      "/api/registration",
      req.method);
    console.debug(`[API] ${req.method} Responding to client...`);
    res.status(status).json(response);
  }

  console.debug(`[API] ${req.method} /api/registration HANDLER END`);
}
