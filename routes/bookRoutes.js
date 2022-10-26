const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookControllers');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.get('/test', bookControllers.test);
router.get('/', bookControllers.getAllBooks);
router.post('/', auth, multer, bookControllers.addBook);
router.put('/:id', auth, bookControllers.modifyBook);
router.get('/:id', bookControllers.getOneBook);
router.delete('/:id', auth, bookControllers.deleteBook);

module.exports = router;
