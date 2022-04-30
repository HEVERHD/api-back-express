const router = require('express').Router();

//Rutas
const login = require('./login');
const register = require('./register');
const product = require('./product');
const user = require('./user');

router.use('/login', login);
router.use('/register', register);
router.use('/product', product);
router.use('/user', user);

module.exports = router;