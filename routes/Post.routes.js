const router = require('express').Router();
const posts = require('../controllers/Post')

router.post('/addPost/:id',posts.addPost)
router.get('/getPost',posts.getPost)
router.get('/getOnePost/:id',posts.getPostByiD)
router.get('/getPostByUserId/:id',posts.getPostByUserId)

module.exports = router;
