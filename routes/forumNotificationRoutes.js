const express = require('express')
const router = express.Router();
const ForumNotificationController = require('../controllers/forumNotificationController')

router.get('/api/forum-activities/:id', ForumNotificationController.getForumActivitiesByUserId);
router.get('/api/forum-notifications', ForumNotificationController.getForumNotificationsByUserId);
router.get('/api/total-forum-notifications', ForumNotificationController.fetchTotalNotifications);
router.put('/api/read-forum-notification/:notificationId', ForumNotificationController.markReadNotification);
router.put('/api/read-all-forum-notifications', ForumNotificationController.markReadAllNotifications);
router.delete('/api/delete-forum-notification/:id', ForumNotificationController.deleteForumNotificationbyId);
router.delete('/api/delete-all-forum-notifications', ForumNotificationController.deleteAllForumNotifications)


module.exports = router;