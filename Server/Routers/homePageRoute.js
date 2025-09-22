const express = require('express');
const signIn = require('../Controllers/signIn');
const { register } = require('../Controllers/register');
const router = express.Router();

router.route('/signIn').post(signIn);
router.route('/register').post(register);



module.exports = router;