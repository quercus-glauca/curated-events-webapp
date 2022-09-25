export default function handler(req, res) {
  if (req.method === 'POST') {
    const registrationData = req.body;
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