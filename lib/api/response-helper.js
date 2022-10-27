//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Response Helper - Backend Server Only
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
export function buildGetResponse(apiUrl, items, verb, details, greeting) {
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
// POST Response
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function buildPostResponse(apiUrl, item, verb, details, greeting) {
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
export function buildDeleteResponse(apiUrl, item, verb, details, greeting) {
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


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Helper
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function buildMethodNotAllowed(apiUrl, method) {
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
// ERROR Response
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function buildErrorResponse(error, method, apiUrl, verb, details) {
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
