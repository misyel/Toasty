var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BulletinSchema = new Schema({
    title: {type: String},
    message: {type: String, required: true},
})

module.exports = mongoose.model('Bulletin', BulletinSchema);