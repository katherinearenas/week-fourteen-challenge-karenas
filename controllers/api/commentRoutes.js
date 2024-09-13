const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
      const { comment_text, post_id } = req.body;
      const postId = parseInt(post_id);
      console.log(req.session.user_id);
      console.log(comment_text);
      console.log(postId);
      const newComment = await Comment.create({
        comment_text: comment_text,
        post_id: postId,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;