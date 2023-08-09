const router = require('express').Router();
const withAuth = require('../../utils/auth')
const Post = require('../../models')

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            user_id: req.session.user_id,
            date_created: req.body.date_created,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;