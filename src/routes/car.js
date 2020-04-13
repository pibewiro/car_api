const router = require('express').Router();
const authenticate = require('../../utils/verifyToken');
const carController = require('../controllers/car');

router.get('/car', carController.index);
router.get('/car/:id', carController.get);
router.post('/car', authenticate, carController.store);
router.put('/car/:id', authenticate, carController.update);
router.delete('/car/:id', authenticate, carController.delete);
router.get('/car/user/:id', carController.userCars)


module.exports = router;