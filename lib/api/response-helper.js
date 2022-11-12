//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Response Helper - Backend Server Only
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export {
  buildGetResponse,
  buildPatchResponse,
  buildPostResponse,
  buildDeleteResponse,
  buildBadRequestResponse,
  buildUnauthorizedResponse,
  buildForbiddenResponse,
  buildMethodNotAllowedResponse,
  buildServerErrorResponse,
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// INPUT PARAMS
//   @apiUrl   : '/api' or something similar
//   @items    : a valid Object or an Error string with further details of failure
//   @verb     : 'find', 'insert', 'delete', 'acknowledge', or whatever else
//   @details  : basic details of the operation as for success or failure
//   @greeting : [optional] greeting message for the user in case of Success
// OUTPUT ARRAY
//   status    : Number, HTML Response Status Code for the Node.js response 
//   response  : Object, to be JSON encoded for the Node.js response object
// RESPONSE OBJECT DETAILS
//   message   : String, operation abstract for logging/debugging purposes
//   result    : Object
//   .ok       : Boolean, to notify general success or failure
//   .status   : Number, HTML Response Status Code
//  [.count]   : Number, number of items returned in the .essence (on Success)
//   .essence  : Object (on Success), Error String (on Failure)
//  [.greeting]: String, optional greeting for the user (on Success)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function buildGetResponse(apiUrl, items, verb, details, greeting) {
  let ok = false;
  let status = 404;
  let resultCount = 0;
  let resultEssence = `Failed to ${verb} ${details}.`;
  if (typeof items === "string") {
    resultEssence += ` ${items}`;
  }
  else if (items !== null && typeof items === "object") {
    ok = true;
    status = 200;
    resultCount = items.length;
    resultEssence = items;
  }

  const response = {
    message: `GET '${apiUrl}': ${ok ? 'Succeeded' : 'Failed'} to ${verb} ${details}.`,
    result: {
      ok,
      status,
      count: resultCount,
      essence: resultEssence,
      ...(greeting && { greeting }),
    },
  }
  return [status, response];
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// PATCH Response
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function buildPatchResponse(apiUrl, item, verb, details, greeting) {
  let ok = false;
  let status = 422;
  let resultEssence = `Failed to ${verb} ${details}.`;
  if (typeof item === "string") {
    resultEssence += ` ${item}`;
  }
  else if (item !== null && typeof item === "object") {
    ok = true;
    status = 200;
    resultEssence = item;
  }

  const response = {
    message: `PATCH '${apiUrl}': ${ok ? 'Succeeded' : 'Failed'} to ${verb} ${details}.`,
    result: {
      ok,
      status,
      essence: resultEssence,
      ...(greeting && { greeting }),
    },
  }
  return [status, response];
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// POST Response
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function buildPostResponse(apiUrl, item, verb, details, greeting) {
  let ok = false;
  let status = 422;
  let resultEssence = `Failed to ${verb} ${details}.`;
  if (typeof item === "string") {
    resultEssence += ` ${item}`;
  }
  else if (item !== null && typeof item === "object") {
    ok = true;
    status = 201;
    resultEssence = item;
  }

  const response = {
    message: `POST '${apiUrl}': ${ok ? 'Succeeded' : 'Failed'} to ${verb} ${details}.`,
    result: {
      ok,
      status,
      essence: resultEssence,
      ...(greeting && { greeting }),
    },
  }
  return [status, response];
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DELETE Response
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function buildDeleteResponse(apiUrl, item, verb, details, greeting) {
  let ok = false;
  let status = 422;
  let resultEssence = `Failed to ${verb} ${details}.`;
  if (typeof item === "string") {
    resultEssence += ` ${item}`;
  }
  else if (item !== null && typeof item === "object") {
    ok = true;
    status = 200;
    resultEssence = item;
  }

  const response = {
    message: `DELETE '${apiUrl}': ${ok ? 'Succeeded' : 'Failed'} to ${verb} ${details}.`,
    result: {
      ok,
      status,
      essence: resultEssence,
      ...(greeting && { greeting }),
    },
  }
  return [status, response];
}


//-----------------------------------------------------------------------------
// 400 Bad Request
//-----------------------------------------------------------------------------
// The server cannot or will not process the request due to something that is 
// perceived to be a client error (e.g., malformed request syntax, invalid 
// request message framing, or deceptive request routing).
//
function buildBadRequestResponse(apiUrl, method) {
  const response = {
    message: `${method} '${apiUrl}': Request received with malformed or invalid data.`,
    result: {
      ok: false,
      status: 400,
      essence: `Malformed or invalid data received`,
    },
  }
  return [400, response];
}

//-----------------------------------------------------------------------------
// 401 Unauthorized
//-----------------------------------------------------------------------------
// Although the HTTP standard specifies "unauthorized", semantically this 
// response means "unauthenticated". That is, the client must authenticate 
// itself to get the requested response.
//
function buildUnauthorizedResponse(apiUrl, method) {
  const response = {
    message: `${method} '${apiUrl}': Request received, but you are not authenticated.`,
    result: {
      ok: false,
      status: 401,
      essence: `You must be authenticated to issue the ${method} method at '${apiUrl}'`,
    },
  }
  return [401, response];
}

//-----------------------------------------------------------------------------
// 403 Forbidden
//-----------------------------------------------------------------------------
// The client does not have access rights to the content; that is, it is 
// unauthorized, so the server is refusing to give the requested resource. 
// Unlike 401 Unauthorized, the client's identity is known to the server.
//
function buildForbiddenResponse(apiUrl, method) {
  const response = {
    message: `${method} '${apiUrl}': Request received, but you  do not have access rights.`,
    result: {
      ok: false,
      status: 403,
      essence: `You do not have access rights to the content`,
    },
  }
  return [403, response];
}

//-----------------------------------------------------------------------------
// 405 Method Not Allowed
//-----------------------------------------------------------------------------
// The request method is known by the server but is not supported by the target 
// resource. For example, an API may not allow calling DELETE to remove a resource.
//
function buildMethodNotAllowedResponse(apiUrl, method) {
  const response = {
    message: `${method} '${apiUrl}': Request received, but this method is not yet implemented.`,
    result: {
      ok: false,
      status: 405,
      essence: `The ${method} method is not yet implemented at '${apiUrl}'`,
    },
  }
  return [405, response];
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 500 Server Error Response
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * 
 * @param {object} error 
 * @param {string} method 
 * @param {string} apiUrl 
 * @param {string} verb 
 * @param {string} details 
 * @returns 
 */
function buildServerErrorResponse(error, method, apiUrl, verb, details) {
  let status = 500;
  let resultEssence = `Failed to ${verb} ${details}: ${error.message}.`;
  const response = {
    message: `${method} '${apiUrl}' Error: ${resultEssence}`,
    result: {
      ok: false,
      status,
      essence: resultEssence,
    },
  }
  return [status, response];
}
