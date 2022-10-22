//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Response Helper - Backend Server Only
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// INPUT PARAMS
//   @apiUrl  : '/api' or something similar
//   @items   : a valid Object or an Error string with further details of failure
//   @details : basic details of the operation as for success or failure
// OUTPUT ARRAY
//   status   : Number, an HTML Response Status Code
//   response : Object, { message: '...', result: { <...> } }
// { <...> }  : { itemsCount: <Number>, items: <Array> OR <ErrorString> }
// { <...> }  : {                       item:  <Array> OR <ErrorString> }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function buildGetResponse(apiUrl, items, verb, details) {
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
    },
  }
  return [status, response];
}

export function buildPostResponse(apiUrl, item, verb, details) {
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
    },
  }
  return [status, response];
}

export function buildDeleteResponse(apiUrl, item, verb, details) {
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
    },
  }
  return [status, response];
}

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
