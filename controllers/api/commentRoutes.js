// const router = require('express').Router();
// const { Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//     try {
//       const { comment_text } = req.body
//       const newComment = await Comment.create({
//         ...req.body,
//         user_id: req.session.user_id,
//       });
  
//       res.status(200).json(newComment);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });