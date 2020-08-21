var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    teacher: {type:Schema.Types.ObjectId, ref: "Teacher", required: true},
    points: {type: Number, default: 0}
})

module.exports = mongoose.model('Student', StudentSchema);