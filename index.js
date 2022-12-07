const express = require('express');
const app = express();
const path = require('path');
const port = 8080;

app.use(
  '/stwist/',
  express.static(path.join(__dirname, 'react-front-app/build')),
);

//app.use('/stwist-api/',) API 경로 미리 확보

app.get('/stwist/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-front-app/build/index.html'));
});

app.listen(port, () => {
  console.log(`sanghai-twist server is listening on port ${port}`);
});
