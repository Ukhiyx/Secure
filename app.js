const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const index = require(path.join(__dirname, 'routes/index.js'));

app.use('/', index);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});