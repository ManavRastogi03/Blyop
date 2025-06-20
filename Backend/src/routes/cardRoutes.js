import express from 'express';
import { checkUsernameAvailability, claimUsername, createCard,createPublicCard,deleteCard,getMyCard,getPublicCard,updateCard } from '../controllers/cardController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Private Card Routes
router.post('/create', authMiddleware, createCard); 
router.get('/me', authMiddleware, getMyCard);
router.put('/:id',authMiddleware,updateCard);
router.delete("/:id",authMiddleware,deleteCard);
// Public Card Routes
router.get("/public/:username",getPublicCard);
router.post('/public', authMiddleware, checkUsernameAvailability,createPublicCard);
router.patch('/claim-username',authMiddleware,claimUsername);
router.get('/avail/:username',authMiddleware,checkUsernameAvailability);

export default router;