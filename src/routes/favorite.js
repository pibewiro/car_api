const router = require('express').Router();
const favorite = require('../controllers/favorite');
const auth = require('../../utils/verifyToken');

router.get('/favorite/:userId', favorite.get)
router.post('/favorite', favorite.store)
router.delete('/favorite/:userId/:favId', favorite.delete)


module.exports = router;