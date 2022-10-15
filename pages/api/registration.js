export default function handler(req, res) {
  if (req.method === 'POST') {
    const registrationData = req.body;
    const userEmail = registrationData.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    console.log('Registration:', userEmail);
    res.status(201).json({
      message: 'You are now registered!',
      details: `Registration data: ${registrationData.email}`
    });

  }
  else {
    // 405 Method Not Allowed
    res.status(405).json({ message: `${req.method} request received. Try it again using POST.` });
  }
}