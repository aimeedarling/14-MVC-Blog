//routes that render handlebars -- end in res.render
//get routes
const router = require('express').Router()
const {User, Post, Comment} = require('../models')
const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {                
                model: User, 
                attributes: ['userName']
                }
            ]
        })

        const posts = postData.map((post) => post.get ({plain: true}))

        res.render('home-page', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error)
    }
})



router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('/dashboard', withAuth, (req, res) => {
    res.redirect('/dashboard'); // Redirect to the user's dashboard
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    // user that made post
                    model: User,
                    attributes: ['userName'],
                },
                {
                    model: Comment,
                    //user that made comment
                    include: [User]
                }
            ],
        });

        const post = postData.get({ plain: true });

        res.render('single-post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router