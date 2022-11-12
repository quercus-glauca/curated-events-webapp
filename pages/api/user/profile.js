//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// API Entry Point: /api/user/profile
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { getToken } from "next-auth/jwt";
import { acquireUserProfile, hashPassword } from 'lib/helpers/core';

import {
  patchUserProfile,
  patchUserProfileSync,
} from 'data/providers';

import {
  validateChangeProfileData
} from 'lib/validate/input-data';

import {
  buildPatchResponse,
  buildBadRequestResponse,
  buildUnauthorizedResponse,
  buildForbiddenResponse,
  buildMethodNotAllowedResponse,
  buildServerErrorResponse,
} from 'lib/api/response-helper';


export default async function handler(req, res) {
  const apiUrl = '/api/user/profile';
  console.debug(`[API] ${req.method} ${apiUrl} HANDLER BEGIN...`);

  const token = await getToken({ req });
  if (!token) {
    const [status, response] = buildUnauthorizedResponse(
      apiUrl,
      req.method);
    res.status(status).json(response);
    console.debug(`[API] ${req.method} ${apiUrl} HANDLER END`);
    return;
  }

  if (req.method === 'PATCH') {
    const operationVerb = 'update';
    const operationDetails = 'user profile';
    let greetingOnSuccess = '';

    try {
      const changeUserProfile = req.body.changeUserProfile;
      console.log('[DEBUG] changeUserProfile:', changeUserProfile);
      if (!changeUserProfile || !(changeUserProfile?.change?.name || changeUserProfile?.change?.password)) {
        const [status, response] = buildBadRequestResponse(
          apiUrl,
          req.method);
        res.status(status).json(response);
        console.debug(`[API] ${req.method} ${apiUrl} HANDLER END`);
        return;
      }

      if (changeUserProfile.email !== token.email) {
        const [status, response] = buildForbiddenResponse(
          apiUrl,
          req.method);
        res.status(status).json(response);
        console.debug(`[API] ${req.method} ${apiUrl} HANDLER END`);
        return;
      }

      greetingOnSuccess = `Congrats ${changeUserProfile.name}! Your ${operationDetails} has been updated.`;

      const finalItemOrErrorString = await processPatchRequest(changeUserProfile);
      const [status, response] = buildPatchResponse(
        apiUrl,
        finalItemOrErrorString,
        operationVerb,
        operationDetails,
        greetingOnSuccess);
      res.status(status).json(response);
    }
    catch (error) {
      const [status, response] = buildServerErrorResponse(
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
    const [status, response] = buildMethodNotAllowedResponse(
      apiUrl,
      req.method);
    res.status(status).json(response);
  }

  console.debug(`[API] ${req.method} ${apiUrl} HANDLER END`);
}

/**
 * Processes an authorized and well-formed PATCH request to update a user profile.
 * The request data, provided by the user, will be thoroughly validated.
 * @param {object} changeUserProfile The request data object 
 * @returns
 * On success, resolves with the final user profile object.
 * On 'soft' failure, resolves with an error string.
 * On 'hard' error, rejects the Promise with an Error.
 */
async function processPatchRequest(changeUserProfile) {
  // This is a MUST at the Backend: VALIDATE USER INPUT
  const [inputAccepted, rejectedDetails] = validateChangeProfileData(changeUserProfile);
  if (!inputAccepted) {
    return rejectedDetails;
  }

  const userProfile = await acquireUserProfile(changeUserProfile.email, changeUserProfile.password);
  const newUserName = changeUserProfile.change.name || null;
  const newPassword = changeUserProfile.change.password
    ? await hashPassword(changeUserProfile.change.password)
    : null;
  const hashedChangeUserProfile = {
    email: userProfile.email,
    change: {
      ...(newUserName && { name: newUserName }),
      ...(newPassword && { password: newPassword }),
    }
  };
  const finalItemOrErrorString = (process.env.USERS_PROVIDER_SYNC === "true")
    ? patchUserProfileSync(hashedChangeUserProfile)
    : await patchUserProfile(hashedChangeUserProfile);

  return finalItemOrErrorString;
}