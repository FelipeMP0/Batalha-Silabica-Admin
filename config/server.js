const dotenv = require('dotenv');
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
}));

consign()
    .include('app/routes')
    .then('app/models/dao')
    .then('app/controllers')
    .into(app);

module.exports = app;
