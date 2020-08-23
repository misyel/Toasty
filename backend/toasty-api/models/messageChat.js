var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageChatSchema = new Schema({
    text: {type:String, required: true},
    student: {type:Schema.Types.ObjectId, ref: "Student"},
    teacher: {type:Schema.Types.ObjectId, ref: "Teacher"} 
})

module.exports = mongoose.model('messageChat', messageChatSchema);