const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, answers } = req.body;

  const prompt = `
  Generate a heartfelt and personalized love letter based on the provided set of questions and answers.
  Name: ${name}
  Answers: ${answers.join(', ')}
  `;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const letter = response.data.choices[0].message.content;
    res.json({ letter });
  } catch (error) {
    console.error('Error generating love letter:', error);
    res.status(500).json({ error: 'Failed to generate love letter' });
  }
});

module.exports = router;
