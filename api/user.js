const router = require('express').Router();
const { createUserSchema, loginUserSchema } = require('../validations/auth');
const { createUserController, loginController, logoutController } = require('../controllers/user-controller');

router.post('/register', createUserSchema, createUserController);
router.post('/login', loginUserSchema, loginController);
router.get('/logout', logoutController);

module.exports = router;