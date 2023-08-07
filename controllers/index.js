const router = require('express').Router();
const apiRoutes = require('./api');
const homeroutes = require('./home-routes')

router.use('/api', apiRoutes);
router.use('/', homeroutes)

module.exports = router;
