//routes 

const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
// const commentRoutes = require('./comment-routes')

router.use('/users', userRoutes);
router.use('/post-routes', postRoutes);
// router.use('/comments-routes', commentRoutes);
module.exports = router;
