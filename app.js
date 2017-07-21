const http = require('http');
const express = require('express');
const routes = require('./routes/index');
const path = require('path');

const app = express();

//use settings in .env file. Include this file in your gitignore file
require('dotenv').config({ path: 'variables.env' });
const hostname = process.env.HOST;
const port = process.env.PORT;

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

//all routes in a separated file
app.use('/', routes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
