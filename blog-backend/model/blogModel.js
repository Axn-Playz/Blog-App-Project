const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is must']
    },
    description: {
        type: String,
        required: [true, 'Desp is must']
    },
    image: {
        type: String,
        required: [true, 'Image is must']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, 'userid is must']
    }

}, { timestamps: true });

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;