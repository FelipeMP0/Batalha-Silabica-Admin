const dotenv = require('dotenv');
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
}));

consign()
    .include('routes')
    .then('models/dao')
    .then('controllers')
    .into(app);

module.exports = app;
