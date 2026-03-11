const mongoose = require('mongoose');

const songSchama = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:["neutral","sad","happy","surprised"]
        }
    }
})

const SongModel = mongoose.model('Song',songSchama);

module.exports = SongModel;