const router = require('express').Router();
const UserController = require('../controllers/user');
const authenticate = require('../../utils/verifyToken')

router.get("/user", authenticate, UserController.index);
router.get("/user/:id", authenticate, UserController.get);
router.post("/user", UserController.store);
router.put("/user/:id", authenticate, UserController.update);
router.delete("/user/:id", authenticate, UserController.delete);




module.exports = router;