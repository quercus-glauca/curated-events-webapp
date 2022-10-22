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
  buildMethodNotAllowed,
  buildErrorResponse
} from '../../helpers/api-response-helper';


export default async function handler(req, res) {
  console.debug(`[API] ${req.method} /api/registration HANDLER BEGIN...`);

  const apiUrl = '/api/registration';
  let operationVerb = '';
  let operationDetails = '';
  let greetingOnSuccess = 'Welcome! You are now registered. Thank you!';

  if (req.method === 'POST') {
    try {
      const registrationData = req.body.registrationData;
      operationVerb = 'acknowledge';
      operationDetails = 'the registration data';

      // This is a MUST at the Backend: VALIDATE USER INPUT
      let finalItemOrErrorString;
      const [inputAccepted, rejectedDetails] = validateRegistrationData(registrationData);
      if (!inputAccepted) {
        finalItemOrErrorString = rejectedDetails;
      }
      else {
        // <<TODO>> Forward the validated data to the Data Server
        finalItemOrErrorString = {
          ...registrationData,
          date: new Date().toISOString(),
        };
      }

      const [status, response] = buildPostResponse(
        apiUrl,
        finalItemOrErrorString,
        operationVerb,
        operationDetails,
        greetingOnSuccess);
      res.status(status).json(response);
    }
    catch (error) {
      const [status, response] = buildErrorResponse(
        error,
        req.method,
        apiUrl,
        operationVerb,
        operationDetails
      );
      res.status(status).json(response);
    }

  }
  else {
    const [status, response] = buildMethodNotAllowed(
      apiUrl,
      req.method);
    res.status(status).json(response);
  }

  console.debug(`[API] ${req.method} /api/registration HANDLER END`);
}
