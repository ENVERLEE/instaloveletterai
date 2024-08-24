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
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            "model": "gpt-4o-mini",
            "messages": [
              {
                "role": "system",
                "content": "Generate a heartfelt and personalized love letter based on the provided set of 10 questions and answers. Your response should be affectionate and warm, reflecting the user's personality and relationship dynamics. Avoid directly stating the specifics of the user's answers; instead, weave them into the narrative subtly. Use a conversational tone typical of Korean teenagers and young adults (MZ Generation). The letter should be concise, about half the length of typical love letters, while still conveying deep emotion and sincerity."
              },
              {
                "role": "user",
                "content": "You will receive 10 questions with multiple-choice answers. The user's selected answers will guide the content of the love letter. Example structure:\n\n- Question: 연인과의 갈등이 생겼을 때, 나는 주로 어떻게 행동하나요?\n  - Choices:\n    1. 바로 화해한다\n    2. 먼저 화해하기를 기다린다\n    3. 혼자 고민하고 시간을 갖는다\n  - User’s Answer: 3번\n\n- Question: 데이트를 계획할 때 나는 주로 어떻게 하죠?\n  - Choices:\n    1. 미리 세심하게 계획을 세운다\n    2. 즉흥적으로 결정한다\n    3. 상대방의 의견을 우선시한다\n  - User’s Answer: 2번\n\n*(Repeat for a total of 10 questions)*\n\nWhen you want to generate a love letter based on the given questions and answers, provide the input data and issue the command 'Generate Love Letter'."
              },
              {
                "role": "assistant",
                "content": "OK."
              },
              {
                "role": "user",
                "content": prompt + "generate love letter"
              }
            ],
            "temperature": 0.7,
            "max_tokens": 500
          },
          {
            headers: {
              'Authorization': `key`, // OpenAI API 키를 여기에 넣어주세요
              'Content-Type': 'application/json'
            }
          }
        );

    const letter = response.data.choices[0].message.content;
    res.json({ letter });
  } catch (error) {
    console.error('Error generating love letter:', error);
    res.status(500).json({ error: 'Failed to generate love letter' });
  }
});

module.exports = router;
