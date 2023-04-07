const router = require('express').Router();
const Notification = require('../controllers/Notifications')

router.post('/sendNotification/:sender_id/:post_id',Notification.sendLike)
router.get('/getNotification/:sender_id',Notification.getNotification)

module.exports = router;
