import { compare, hash } from 'bcrypt';
import * as fs from 'fs';
import matter from 'gray-matter';

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