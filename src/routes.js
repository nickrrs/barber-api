import { Router } from 'express';

// Models
import User from './app/models/User'

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Middlewares
import AuthMiddleware from './app/middleware/AuthMiddleware';

const routes = new Router();

// User routes
    routes.post('/users', UserController.store);


// Auth routes
    routes.post('/sessions', SessionController.store);

// Auth Middleware - Routes
    // User - Update
    routes.use(AuthMiddleware);
    routes.put('/users_update', UserController.update);



export default routes;
