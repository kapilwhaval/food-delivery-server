const router = require('express').Router();
const constants = require('../constants');
var pjson = require('../package.json');
const userRouter = require('./user');


router.use('/user', userRouter);
router.get('/', (req, res) => res.status(constants.status.OK).send(`Welcome to food delivery server v${pjson.version}`))

module.exports = router;