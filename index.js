const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('./routes');

const port = 8080;

//개발 설정
app.use(
  cors({
    origin: [
      'http://192.168.0.115:8080',
      'http://192.168.0.115:3000',
      'http://localhost:8080',
      'http://localhost:3000',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use('/', routes);

app.listen(port, () => {
  console.log(`sanghai-twist server is listening on port ${port}`);
});
