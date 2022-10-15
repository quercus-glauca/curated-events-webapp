//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Response Helper - Backend Server Only
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// INPUT PARAMS
//   @apiUrl  : '/api' or something similar
//   @items   : a valid Object or an Error string with further details of failure
//   @details : basic details of the operation as for success or failure
// OUTPUT ARRAY
//   ok       : Boolean, overall result
//   status   : Number, an HTML Response Status Code
//   response : Object, { message: '...', result: { <...> } }
// { <...> }  : { itemsCount: <Number>, items: <Array> OR <ErrorString> }
// { <...> }  : {                       item:  <Array> OR <ErrorString> }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function buildGetResponse(apiUrl, items, details) {
  let ok = false;
  let status = 404;
  let resultCount = 0;
  let resultEssence = `Failed to find ${details}.`;
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
    message: `GET '${apiUrl}' to find ${details} ${ok ? 'succeeded' : 'failed'}!`,
    result: {
      itemsCount: resultCount,
      items: resultEssence,
    },
  }
  return [ok, status, response];
}

export function buildPostResponse(apiUrl, item, details) {
  let ok = false;
  let status = 422;
  let resultEssence = `Failed to insert ${details}.`;
  if (typeof item === "string") {
    resultEssence += ` ${item}`;
  }
  else if (item !== null && typeof item === "object") {
    ok = true;
    status = 201;
    resultEssence = item;
  }

  const response = {
    message: `POST '${apiUrl}' to insert ${details} ${ok ? 'succeeded' : 'failed'}!`,
    result: {
      item: resultEssence,
    },
  }
  return [ok, status, response];
}

export function buildDeleteResponse(apiUrl, item, details) {
  let ok = false;
  let status = 422;
  let resultEssence = `Failed to delete ${details}.`;
  if (typeof item === "string") {
    resultEssence += ` ${item}`;
  }
  else if (item !== null && typeof item === "object") {
    ok = true;
    status = 200;
    resultEssence = item;
  }

  const response = {
    message: `DELETE '${apiUrl}' to delete ${details} ${ok ? 'succeeded' : 'failed'}!`,
    result: {
      item: resultEssence,
    },
  }
  return [ok, status, response];
}

export function buildMethodNotAllowed(apiUrl, method) {
  const response = {
    message: `${method} '${apiUrl}' request received. But this method is not implemented.`,
    result: {
      item: 'Method Not Allowed',
    },
  }
  return [false, 405, response];
}
