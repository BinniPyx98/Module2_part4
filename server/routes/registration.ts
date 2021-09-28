import registration from '../src/registration/registration.js';
import express from 'express';

export const router = express.Router();


router.post('/registration', registration);


