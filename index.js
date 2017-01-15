const express = require('express');

const app = express();

app.use('/', express.static(`${__dirname}/dist/`));

app.listen(3000, console.log('Connected on 3k'));
