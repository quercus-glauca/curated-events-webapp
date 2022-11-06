//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Entry Point: /api/auth/signup
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
  postSignupData,
  postSignupDataSync,
} from 'data/providers';

import {
  validateSignupData
} from 'lib/validate/input-data';

import {
  buildGetResponse,
  buildPostResponse,
  buildDeleteResponse,
  buildMethodNotAllowed,
  buildErrorResponse
} from 'lib/api/response-helper';


export default async function handler(req, res) {
  console.debug(`[API] ${req.method} /api/auth/signup HANDLER BEGIN...`);

  const apiUrl = '/api/auth/signup';
  let operationVerb = '';
  let operationDetails = '';
  let greetingOnSuccess = '';

  if (req.method === 'POST') {
    try {
      const signupData = req.body.signupData;
      operationVerb = 'create';
      operationDetails = 'the account';

      // This is a MUST at the Backend: VALIDATE USER INPUT
      let finalItemOrErrorString;
      const [inputAccepted, rejectedDetails] = validateSignupData(signupData);
      if (!inputAccepted) {
        finalItemOrErrorString = rejectedDetails;
      }
      else {
        greetingOnSuccess = `Welcome ${signupData.name}! Your account have been created.`;
        const secureSignupData = {
          date: signupData.date,
          email: signupData.email,
          name: signupData.name,
          password: 'DUMMY-HASHED-PASSWORD-VALUE',
        };
        finalItemOrErrorString = (process.env.USERS_PROVIDER_SYNC === "true")
          ? postSignupDataSync('E_PARAM', secureSignupData)
          : await postSignupData('E_PARAM', secureSignupData);
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

  console.debug(`[API] ${req.method} /api/auth/signup HANDLER END`);
}

