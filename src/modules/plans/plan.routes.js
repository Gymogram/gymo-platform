import { Router } from 'express';
import { authJWT } from '../../services/auth.strategies.service';
import * as planController from './plan.controllers';

const routes = new Router();

routes.post('/', authJWT, planController.create);

export default routes;
