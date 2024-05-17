import Blog from "../models/blog.model.js";

export async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    return res.status(200).json(blogs);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
}

export async function getBlog(req, res) {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId)
      .populate("discussions")
      .populate("authorId")
      .select("-authorId.password");
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ error: "Internal server Error" });
  }
}

export async function createBlog(req, res) {
  try {
    const authorId = req.user._id;
    const { title, coverImage, content } = req.body;
    if (!title || !coverImage || !content || !authorId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const blog = await Blog.create({
      title,
      coverImage,
      content,
      authorId,
    });
    return res.status(201).json(blog);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

export async function deleteBlog(req, res) {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    if (blog.authorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await blog.delete();
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

export async function updateBlog(req, res) {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    if (blog.authorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { title, coverImage, content } = req.body;
    if (!title && !coverImage && !content) {
      return res.status(400).json({ error: "All fields are required" });
    }
    blog.title = title || blog.title;
    blog.coverImage = coverImage || blog.coverImage;
    blog.content = content || blog.content;
    await blog.save();
    return res.status(200).json(blog);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server Error" });
  }
}
