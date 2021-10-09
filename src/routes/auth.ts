import express, { Router } from 'express';
import { signup, getUser, updateScore, getTopUser } from '../controllers/auth';
const userRouter = Router();

userRouter.post('/signup', signup);

userRouter.post('/score', updateScore);
userRouter.post('/user', getUser);
userRouter.get('/topUser', getTopUser);

export default userRouter;
