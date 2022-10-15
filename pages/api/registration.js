import {
  buildGetResponse,
  buildPostResponse,
  buildDeleteResponse,
  buildMethodNotAllowed
} from "../../helpers/api-response-helper";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Entry Point: /api/registration
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default async function handler(req, res) {
  console.log(`[API] ${req.method} /api/registration HANDLER BEGIN...`);

  if (req.method === 'POST') {
    try {
      const registrationData = req.body.registrationData;
      const userEmail = registrationData.email;

      // Must at Backend: Validate Input
      let finalItemOrErrorString;
      if (!userEmail || !userEmail.includes('@')) {
        finalItemOrErrorString = 'Invalid email address.';
      }
      else {
        finalItemOrErrorString = {
          ...registrationData,
          date: new Date(),
          welcome: 'Welcome! You are now registered. Thank you!',
        };
      }

      console.log('[DEBUG] finalItemOrErrorString:', finalItemOrErrorString);

      const [, status, response] = buildPostResponse(
        "/api/registration",
        finalItemOrErrorString,
        "the registration data");
      console.log(`[API] ${req.method} Responding to client...`);
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
    console.log(`[API] ${req.method} Responding to client...`);
    res.status(status).json(response);
  }

  console.log(`[API] ${req.method} /api/registration HANDLER END`);
}