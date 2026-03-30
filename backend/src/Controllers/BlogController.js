import {
  getAllBlogModel,
  getSingleBlogModel,
  createBlogModel,
  getRecentBlogModel 
} from "../Models/BlogModel.js";

export const getAllBlog = async (req, res) => {
  try {
    const blogs = await getAllBlogModel();
    res.json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getSingleBlogModel(id);

    if (result.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(result[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createBlog = async (req, res) => {
  try {
    const result = await createBlogModel(req.body);
    res.status(201).json({
      message: "Blog created",
      blog_id: result.insertId
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getRecentBlog = async (req, res) => {
  try {
    const blogs = await getRecentBlogModel();
    res.json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
};