// model
const { default: mongoose } = require("mongoose");
const Blog = require("../model/blogModel");
const { User } = require("../model/userModel");

// GET singal blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        // search for id
        const blog = await Blog.findById(id);
        if (blog) {
            return res.status(200).send({
                message: "Blog found",
                success: true,
                blog: blog
            });

        }
        return res.status(201).send({
            message: "No blog found at given id",
            success: false
        });

    } catch (error) {
        console.log('Error at get single blog:', error);
        return res.status(500).send({
            message: "Error at getting single blog",
            success: false,
            error: error.message
        });
    }
};

// GET all blogs
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('user');
        console.log('the blog is ',blogs)
        if (blogs.length <= 0) {
            return res.status(201).send({
                message: "notBlogs",
                success: false
            })
        }
        return res.status(200).send({
            message: "blog",
            success: true,
            blogCount: blogs.length,
            blogs
        })

    } catch (error) {
        console.log('err at get all blogs', error);
        return res.status(400).send({
            message: "Error at getting all  blog",
            success: false,
            error
        })
    }

};

// POST blog
exports.postBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        if (!title || !description || !image || !user) {
            return res.status(200).send({
                message: 'inputField is empty',
                success: false,
                data:{title,description,image,user}
            })
        }
        const checkUserExistence = await User.findById(user);
        // console.log(checkUserExistence)
        if (!checkUserExistence) {
            return res.status(401).send({
                message: "no user found",
                success: false
            })
        }

        const newBlog = new Blog({ title, description, image, user });

        await newBlog.save();
        checkUserExistence.blogs.push(newBlog);
        await checkUserExistence.save();
        return res.status(200).send({
            message: "Blog posted successfully",
            success: true,
            createdBlog: newBlog
        })
    } catch (error) {
        console.log('err at get all blogs', error);
        return res.status(400).send({
            message: "Error at getting all blogs",
            success: false,
            error
        })
    }

};

// UPDATE blog by id
exports.updateBlogController = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, image } = req.body;
        const updateBlog = await Blog.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (updateBlog) {
            return res.status(200).send({
                message: 'Blog updated',
                success: true,
                updatedBlog: updateBlog
            })
        }
        return res.status(200).send({
            message: "not updated",
            success: false,
        })
    } catch (error) {
        return res.status(400).send({
            message: "Error at updating blogs",
            success: false,
            error
        })
    }
};

// DELETE blog by id
exports.deleteBlogController = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteBlog = await Blog.findByIdAndDelete(id).populate('user');
        const pull = await deleteBlog.user.blogs.pull(deleteBlog);
        console.log(pull)
        await deleteBlog.user.save();
        console.log(deleteBlog)
        if (deleteBlog) {
            return res.status(200).send({
                message: "Blog deleted",
                success: true,
                deleteBlog
            })
        }
        return res.status(200).send({
            message: "not deleted",
            success: false
        })

    } catch (error) {
        return res.status(400).send({
            message: "Error at deleting blogs",
            success: false,
            error
        })
    }
};

// GET user's blog by userID
exports.getBlogByUserIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await User.findById(id).populate('blogs');
        if (blog.blogs.length>=1) {
            return res.status(200).send({
                message: "Blog found",
                success: true,
                blog: blog
            });

        }
        return res.status(201).send({
            message: "No blog found at given id",
            success: false
        });

    } catch (error) {
        console.log('Error at get single blog:', error);
        return res.status(500).send({
            message: "Error at getting single blog",
            success: false,
            error: error.message
        });
    }
};