const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('상하의 트위스트 서버 메인');
});

app.listen(port, () => {
  console.log(`sanghai-twist server is listening on port ${port}`);
});
