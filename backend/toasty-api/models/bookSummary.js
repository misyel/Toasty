var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSummarySchema = new Schema({
    bookTitle: {type:String, required: true},
    summary: {type: String, required: true},
    student: {type:Schema.Types.ObjectId, ref: "Student", required: true}
})

module.exports = mongoose.model('bookSummary', bookSummarySchema);