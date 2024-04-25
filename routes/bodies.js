const express = require("express");
const router = express.Router();
const Body = require("../models/bodies");


// Route get data d'un objet 
router.get("/body/:name", async (req, res) => {
    try {
        const body = await Body.findOne({ id: req.params.name });

        if (!body) {
            return res.status(404).json({ result: false, error: "Body not found" });
        }

        return res.json({ result: true, body });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ result: false, error: error.message });
    }
});

// Route get pour récupérer uniquement les planètes
router.get("/planets", async (req, res) => {
    try {
        const planetsFind = await Body.find({ isPlanet: true });

        if (!planetsFind || planetsFind.length === 0) {
            return res.status(404).json({ result: false, error: "Planets not found" });
        }

        const planets = planetsFind.sort((a, b) => a.semimajorAxis - b.semimajorAxis);
        return res.json({ result: true, planets });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ result: false, error: error.message });
    }
});

// Route get pour récupérer uniquement les astéroides
router.get("/asteroids", async (req, res) => {
    try {
        const asteroidFind = await Body.find({ bodyType: 'Asteroid', semimajorAxis: { $lte: 628000000 } });

        if (!asteroidFind || asteroidFind.length === 0) {
            return res.status(404).json({ result: false, error: "Asteroid not found" });
        }

        const asteroids = asteroidFind.sort((a, b) => b.meanRadius - a.meanRadius);
        return res.json({ result: true, asteroids });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ result: false, error: error.message });
    }
});



// Route pour récupérer toutes les lunes d'une planète en utilisant son ID
router.get("/moons/:name", async (req, res) => {
    try {
        // Récupérer les informations de la planète depuis la base de données
        const planet = await Body.findOne({ id: req.params.name });

        if (!planet) {
            return res.status(404).json({ result: false, error: "Planet not found" });
        }

        // Vérifier si la planète a des lunes
        if (planet.moons && planet.moons.length > 0) {

            const moonNames = planet.moons.map(moon => moon.rel.split("bodies/")[1]);
            const moonsFind = await Body.find({ id: { $in: moonNames } });
            const moons = moonsFind.sort((a, b) => b.meanRadius - a.meanRadius);
            return res.json({ result: true, moons });

        } else {
            return res.json({ result: true, moons: [] });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ result: false, error: error.message });
    }
});




// Route pour récupérer et insérer les données dans la base de données // a n'utiliser qu'une fois
router.post("/", async (req, res) => {
    try {
        const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        // Itérer sur les données récupérées et insérer chaque corps dans la base de données
        for (const bodyData of data.bodies) {
            const newBody = new Body(bodyData);
            await newBody.save();
        }

        res.json({ result: true, message: 'Data inserted successfully' });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ result: false, error: error.message });
    }
});



// Route pour effacer toute la base de données
router.delete("/reset", async (req, res) => {
    try {
        // Supprimer tous les documents de la collection "bodies"
        await Body.deleteMany({});
        return res.json({ result: true, message: "Database reset successful" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ result: false, error: error.message });
    }
});


module.exports = router;
