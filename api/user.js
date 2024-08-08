const router = require('express').Router();
const { createAccount, login } = require('../controllers/user-controller');
const { createAccountSchema, loginSchema } = require('../helpers/user-validator');

router.post('/register', createAccountSchema, createAccount);
router.post('/login', loginSchema, login);

module.exports = router;