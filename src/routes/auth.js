const router = require('express').Router()
const AuthController = require('../controllers/auth');

router.post('/auth', AuthController.login)
router.get('/auth', AuthController.logout)

module.exports = router