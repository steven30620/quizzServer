const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const auth = require('../middleware/auth');

router.post('/userScore', userControllers.userScore);
router.post('/login', userControllers.userLogin);
router.delete('/:id', auth, userControllers.deleteUser);

module.exports = router;
