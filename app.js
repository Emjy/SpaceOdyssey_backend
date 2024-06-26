// Charger les variables d'environnement en premier
require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// Configuration de la connexion à la base de données
const mongoose = require('mongoose');
require('./models/connection');

var indexRouter = require('./routes/index');
var bodiesRouter = require('./routes/bodies');
var infosRouter = require('./routes/infos');

var app = express();

// Configuration de CORS pour autoriser des domaines spécifiques
const corsOptions = {
    origin: ['http://localhost:3001', 'https://space-odyssey-frontend.vercel.app', 'https://spaceodyssey.emiliengiraud.fr'],
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bodies', bodiesRouter);
app.use('/infos', infosRouter);

module.exports = app;
