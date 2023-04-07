const router = require('express').Router();
const users = require('../controllers/Users')

router.post('/login',users.login)
router.post('/registration',users.register)
router.get('/userInfo',users.decodeToken)
router.get('/getUsers',users.getUsers)
router.get('/getUserById/:id',users.getUserById)
router.post('/updateInformation/:id',users.updateInformation)

module.exports = router;
