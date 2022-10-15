import fs from 'fs';
import path from 'path';

const DUMMY_COMMENTS = [
  {
    email: 'hello@its.me',
    name: 'Maximilian',
    text: 'My comment is amazing!',
  },
  {
    email: 'hithere@its.me',
    name: 'Angela',
    text: 'My comment is awesome!',
  },
  {
    email: 'hithere@its.me',
    name: 'Severus',
    text: 'My comment is thrilling!',
  },
];

const simpleCommentsFilePath = path.join(process.cwd(), 'data', 'simple-comments.json');

function readSimpleComments() {
  const fileData = fs.readFileSync(simpleCommentsFilePath);
  const comments = JSON.parse(fileData);
  return comments;
}

function appendSimpleComment(newComment) {
  const fileData = fs.readFileSync(simpleCommentsFilePath);
  const comments = JSON.parse(fileData);
  comments.push(newComment);
  fs.writeFileSync(simpleCommentsFilePath, JSON.stringify(comments));
}

export default function handler(req, res) {
  const { eventId } = req.query;

  if (req.method === 'GET') {
    const eventComments = readSimpleComments();
    res.status(200).json({
      message: 'Some comments found!',
      eventId: eventId,
      comments: eventComments,
    });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name || name.trim() === '' ||
      !text || text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const userComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    appendSimpleComment(userComment);
    res.status(201).json({
      message: 'Thank you for your comment!',
      eventId: eventId,
      comment: userComment,
    });
    return;
  }

  // 405 Method Not Allowed
  res.status(405).json({ message: `${req.method} request received. Only GET and POST are allowed.` });
}