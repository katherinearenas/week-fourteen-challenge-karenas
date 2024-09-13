const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content'],
        }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('posts', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req,res) => {
  try{
    const allPosts = await Post.findAll();
    res.status(200).json(allPosts);
  } catch {
    res.status(500).json(err);
  }
});

// // Route for creating a new blog post
// router.post('/new-post', async (req, res) => {
//     try {
//         // Extract data from the request body
//         const { title, content, us } = req.body;

//         // Create a new blog post instance
//         const newPost = new Post({
//             title,
//             content,
//             author,
//             createdAt: new Date() // Automatically set the current date
//         });

//         // Save the blog post to the database
//         await newPost.save();

//         // Redirect or respond with success
//         res.status(201).redirect('/posts'); // Or res.json({ message: 'Post created successfully' });
//     } catch (error) {
//         // Handle errors
//         console.error('Error creating blog post:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('posts/:id', withAuth, async (req, res) => {
//   try {
//     const { comment_text } = req.body
//     const newComment = await Comment.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newComment);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;
