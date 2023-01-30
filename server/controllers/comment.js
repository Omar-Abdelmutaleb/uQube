import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import createError from "../error.js";

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ userId: req.user.id, ...req.body });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(comment.videoId);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment has been deleted successfully!");
    } else {
      next(createError(403, "You can only delete your own comments!"));
    }
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedComment);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can only update your own account!"));
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};
