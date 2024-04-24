const mongoose = require('mongoose');

const bodiesSchema = mongoose.Schema({

    id: String,
    name: String,
    englishName: String,
    isPlanet: Boolean,
    moons: [],
    semimajorAxis: Number,
    perihelion: Number,
    aphelion: Number,
    eccentricity: Number,
    inclination: Number,
    mass: {
        massValue: Number,
        massExponent: Number
    },
    vol: {
        volValue: Number,
        volExponent: Number
    },
    density: Number,
    gravity: Number,
    escape: Number,
    meanRadius: Number,
    equaRadius: Number,
    polarRadius: Number,
    flattening: Number,
    dimension: String,
    sideralOrbit: Number,
    sideralRotation: Number,
    aroundPlanet: {
        planet: String,
        rel: String
    },
    discoveredBy: String,
    discoveryDate: String,
    alternativeName: String,
    axialTilt: Number,
    avgTemp: Number,
    mainAnomaly: Number,
    argPeriapsis: Number,
    longAscNode: Number,
    bodyType: String,
    rel: String,
    numberOfPlanets: {
        type: Number,
        required: false // Définit le champ comme facultatif
    },

});

const Body = mongoose.model('bodies', bodiesSchema);

module.exports = Body;