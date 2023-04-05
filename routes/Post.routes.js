const router = require('express').Router();
const posts = require('../controllers/Post')

router.post('/addPost/:id',posts.addPost)
router.get('/getPost',posts.getPost)
router.get('/getOnePost/:id',posts.getPostByiD)
router.get('/getPostByUserId/:id',posts.getPostByUserId)
router.post('/sendlike/:post_id/:sender_id',posts.sendLike)
router.post('/sendcomment/:post_id/:sender_id',posts.sendComment)
router.get('/getlikes/:post_id',posts.getLikes)
router.get('/getcomments/:post_id',posts.getcomments)

module.exports = router;
