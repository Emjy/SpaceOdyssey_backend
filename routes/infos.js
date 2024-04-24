const express = require("express");
const router = express.Router();
const Info = require("../models/infos");


// Route get data d'un objet 
router.get("/infos/:name", async (req, res) => {
    try {
        const info = await Info.findOne({ id: req.params.name });

        if (!info) {
            return res.status(404).json({ result: false, error: "Info not found" });
        }

        return res.json({ result: true, info });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ result: false, error: error.message });
    }
});

module.exports = router;