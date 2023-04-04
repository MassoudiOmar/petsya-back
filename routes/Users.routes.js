const router = require('express').Router();
const users = require('../controllers/Users')

router.post('/login',users.login)
router.post('/registration',users.register)
router.get('/userInfo',users.decodeToken)
router.get('/getUsers',users.getUsers)

module.exports = router;
