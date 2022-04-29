const router = require('express').Router();

//Rutas
const login = require('./login');
const register = require('./register');
const product = require('./product');

router.use('/login', login);
router.use('/register', register);
router.use('/product', product);

module.exports = router;