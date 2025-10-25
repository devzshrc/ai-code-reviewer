import aiService from '../services/ai.service.js';

export default async function getReview(req, res) {
  const { code } = req.body;
  if (!code) return res.status(400).send('Prompt is required');

  const response = await aiService(code);
  res.send(response);
}
