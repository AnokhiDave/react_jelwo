import { getCommentsByBlogModel, addCommentModel } from "../Models/CommentModel.js";

/* GET comments */
export const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await getCommentsByBlogModel(blogId);
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

/* POST comment */
export const addComment = async (req, res) => {
  try {
    const result = await addCommentModel(req.body);
    res.status(201).json({ message: "Comment added successfully", comment_id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};
