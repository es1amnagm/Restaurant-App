const express = require('express');
const router = express.Router();

const {chefPage} = require('../Controllers/Chef/chefController');

router.route('/').get(chefPage);

module.exports = router;