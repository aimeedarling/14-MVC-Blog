const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

//create user
router.post('/', async (req, res) => {
    try {
        const newUser = req.body
        // hash the password from 'req.body' and save to newUser
        newUser.password = await bcrypt.hash(req.body.password, 10)

        const userData = await User.create(newUser);
        req.session.save(() => {
            req.session.user_id = userData.toJSON().id;
            req.session.logged_in = true;
            res.status(200).json(userData)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { userName: req.body.userName } })
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' })
            return
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        )

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' })
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true

            res.json({ user: userData, message: 'Success, you are now logged in!' })
        })
    } catch (error) {
        res.status(400).json(error)

    }
})


//logout user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router;