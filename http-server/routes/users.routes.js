const express = require('express');
const router = express.Router();

const userController = require('../controller/users.controller');

router.get('/users', userController.list);
router.post('/users', userController.insert);

//Don't put this below router after router.get('/users/:userId')
router.get('/users/aggregate', userController.getNoOfUsersInRole);

router.get('/users/:userId', userController.getById);
router.put('/users/:userId', userController.patchById);
router.delete('/users/:userId', userController.removeById);


module.exports = router;