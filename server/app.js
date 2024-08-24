const express = require('express');
const cors = require('cors');
const loveLetterRoute = require('./routes/loveLetter');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/love-letter', loveLetterRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
