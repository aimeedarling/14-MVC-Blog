const router = require('express').Router();
const withAuth = require('../../utils/auth.js')
const { Post } = require('../../models')

router.get('/', withAuth, async (req, res) =>{
    try{
        const userId = req.session.user_id

        const userPosts = await Post.findAll({where: {user_id: userId}, 
        order:[['createdAt', 'DESC']]})

        res.render('dashboard', {userPosts})
        console.log(allPost)
    } catch (error) {
        res.status(500)
        console.error(error)
    }
})


module.exports = router