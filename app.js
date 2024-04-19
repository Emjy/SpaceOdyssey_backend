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

var app = express();

// Configuration de CORS pour autoriser des domaines spécifiques
const corsOptions = {
    origin: ['http://localhost:3001', 'https://space-odyssey-backend.vercel.app/'],
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bodies', bodiesRouter);

module.exports = app;
