import { Router } from 'express';
import User from './app/models/User'
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// User routes
routes.post('/users', UserController.store);

// Auth routes
routes.post('/sessions', SessionController.store);



export default routes;
