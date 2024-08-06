const router = require('express').Router();
const constants = require('../constants');
var pjson = require('../package.json');


router.use('/user', (req, res) => res.status(200).send('Hiiii') );
router.get('/', (req, res) => res.status(constants.status.OK).send(`Welcome to food delivery server v${pjson.version}`))

module.exports = router;