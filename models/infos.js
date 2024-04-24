const mongoose = require('mongoose');

const infosSchema = mongoose.Schema({

    id: String,
    infos: [], 
});

const Info = mongoose.model('infos', infosSchema);

module.exports = Info;