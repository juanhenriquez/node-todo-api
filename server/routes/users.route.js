const express = require('express');
const router = express.Router();

const UsersController = require('./../controllers/user/users.controller');

// handlers
const { catchErrors } = require('./../handlers/errorHandlers');

router.post('/', catchErrors(UsersController.create));

module.exports = router;
