const router = require('express').Router();
const Notification = require('../controllers/Notifications')

router.post('/sendNotification/:sender_id/:post_id/:userId',Notification.sendLike)
router.get('/getNotification/:sender_id',Notification.getNotification)
router.get('/getNotificationNumber/:sender_id',Notification.getNotificationNumber)
router.post('/updateNotificationSeen/:id',Notification.updateNotificationSeen)

module.exports = router;
