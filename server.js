'use strict';

const port = 3000;

const express = require('express');

const app = express();

app.use('/', express.static('public'));

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
