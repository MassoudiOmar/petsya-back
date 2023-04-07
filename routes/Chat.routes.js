const router = require('express').Router();
const Chat = require('../controllers/Chat')

router.post('/sendMessage',Chat.addMessage)
router.get('/getMessage/:convertSation_id',Chat.getChat)
router.post('/makeConversation/:sender_id/:reciever_id',Chat.makeConversation)
router.get('/getChatNotification/:userId',Chat.getChatNotification)
router.post('/updateChat/:receiver_id/:convertSation_id',Chat.updateChat)


module.exports = router;
