const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const entitiesController = require('../controllers/entities');
const uploadController = require('../controllers/upload');

// Auth Routes
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authController.me);

// Integrations (Upload)
router.post('/integrations/core/upload', uploadController.uploadFile);

// Entities (Generic CRUD)
router.get('/entities/:entityName', entitiesController.list);
router.post('/entities/:entityName', entitiesController.create);
router.get('/entities/:entityName/:id', entitiesController.getById);
router.patch('/entities/:entityName/:id', entitiesController.update);
router.delete('/entities/:entityName/:id', entitiesController.remove);

module.exports = router;
