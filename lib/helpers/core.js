import { compare, hash } from 'bcrypt';
import * as fs from 'fs';
import matter from 'gray-matter';
import { getUserProfile, getUserProfileSync } from 'data/providers';

const BCRYPT_SALTROUNDS = 12;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § SignupData : Utility Functions (for Backend only)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function hashPassword(plainPassword) {
  const hashedPassword = await hash(plainPassword, BCRYPT_SALTROUNDS);
  return hashedPassword;
}

export async function verifyPassword(plainPassword, hashedPassword) {
  return compare(plainPassword, hashedPassword);
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Credentials : Utility Functions (for Backend only)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export async function acquireUserProfile(email, plainPassword) {
  const userProfile = (process.env.USERS_PROVIDER_SYNC === "true")
    ? getUserProfileSync(email)
    : await getUserProfile(email);
  if (typeof userProfile === "string") {
    throw new Error(userProfile);
  }

  const passwordsMatch = await verifyPassword(plainPassword, userProfile.password);
  if (!passwordsMatch) {
    throw new Error('Sorry, but the password did not match!');
  }

  return userProfile;
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// § Events : Utility Functions (for Backend only)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export function readEventPost(eventFilePath) {
  const rawEventPost = fs.readFileSync(eventFilePath, 'utf-8');
  return parseEventPost(rawEventPost);
}

export function parseEventPost(rawEventPost) {
  const { data, content } = matter(rawEventPost);
  const eventPost = { data, content };
  return eventPost;
}