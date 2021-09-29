import registration from '../src/registration/registration.js';
import express from 'express';

 const SingIn = express.Router();


SingIn.post('/', registration);


export default SingIn