var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BulletinSchema = new Schema({
    title: {type: String},
    message: {type: String, required: true},
    teacher: {type:Schema.Types.ObjectId, ref: "Teacher", required: true}
})

module.exports = mongoose.model('Bulletin', BulletinSchema);