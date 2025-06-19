import express from 'express';
import { initiateAuth, verifyAuth } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
// import { checkRole } from '../middlewares/roleMiddleware.js';
import { makeAdmin } from '../controllers/adminController.js';
const router = express.Router();
router.post('/initiate', initiateAuth);

router.post('/verify', verifyAuth);
router.patch('/make-admin/:id', authMiddleware, makeAdmin);

export default router;