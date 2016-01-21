var mongoose = require('mongoose');

var CodeShareSchema = new mongoose.Schema({
    title : String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    },
    upvotes: { type: Number, default : 0 },
    votesFrom: Array,
    description : String,
    tags : Array,
    code : String,
    postedDate : {type : Date, default : Date.now}
})

module.exports = mongoose.model('CodeShare', CodeShareSchema)
