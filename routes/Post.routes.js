const router = require('express').Router();
const posts = require('../controllers/Post')

router.post('/addPost/:id',posts.addPost)
router.get('/getPost',posts.getPost)

module.exports = router;
