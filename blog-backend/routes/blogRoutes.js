const express = require("express");
const { getAllBlogController, postBlogController, updateBlogController, deleteBlogController, getBlogByIdController, getBlogByUserIdController } = require("../controllers/blogController");

// route object
const router = express.Router();

// Routing

// GET single blog by id
router.get("/all-blog/:id", getBlogByIdController);

// GET user blog by userID
router.get("/user-blog/:id",getBlogByUserIdController);
// GET all blogs
router.get("/all-blogs", getAllBlogController);

// POST blog
router.post("/post-blog", postBlogController);

// Update blog by id
router.put("/update-blog/:id", updateBlogController);

// DELETE blog by id
router.delete("/delete-blog/:id", deleteBlogController);


module.exports = router;