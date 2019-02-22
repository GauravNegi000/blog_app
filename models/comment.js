var mongoose    = require("mongoose");

var commentSchema = new mongoose.Schema({
    name: String,
    description: String,
    created: {type:Date, default:Date.now}
});

module.exports = mongoose.model("Comment", commentSchema);