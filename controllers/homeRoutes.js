const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try{
   const posts = await Post.findAll({
    include: [{
              model: User,
              attributes: ['name'],
            },
          ],
        });
   console.log('Posts List: ', posts);
   const postList = posts.map(post => post.get({ plain: true }));
   res.render('homepage', { posts: postList });
  } catch(err) {
  res.status(500)
  .json({ message: 'Failed to fetch posts', error: err.message });
 }
 });
// router.get('/', async (req, res) => {
//   // if (req.session.logged_in) { maybe uncomment not sure
//     // res.redirect('/profile');
//     try {
//     // Get all posts and JOIN with user data
//     const postData = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const posts = postData.map((posts) => posts.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage') 
//     //   { 
//     //   posts, 
//     //   logged_in: req.session.logged_in 
//     // }
//   ;
//     } catch (err) {
//       res.status(500).json(err)};
//   // } else {
//   //   res.redirect('login') maybe uncomment
//   // }
// });

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
          include: [User]
        }
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post)

    res.render('posts', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/profile', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
