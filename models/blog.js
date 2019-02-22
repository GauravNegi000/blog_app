var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    name: String,
    description : String,
    image: String,
    created: {type:Date, default:Date.now},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    status: {type:Number, default: 1}
});

module.exports = mongoose.model("Blog",blogSchema);