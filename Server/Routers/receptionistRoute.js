const express = require('express');
const {receptionistPage} = require('../Controllers/Receptionist/receptionistController');
const router = express.Router();

router.route("/").get(receptionistPage);


module.exports = router;