import * as fs from 'fs';
import matter from 'gray-matter';

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