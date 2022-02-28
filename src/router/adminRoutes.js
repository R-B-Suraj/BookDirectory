const express = require('express');
const router = new express.Router();

// authentication middleware
const authenticate = require('../middleware/authentication');
const controller = require('./routeController/admin');

router.post('/adminlogin', controller.adminLogin);
router.post('/logout',authenticate,controller.logout);

module.exports = router;