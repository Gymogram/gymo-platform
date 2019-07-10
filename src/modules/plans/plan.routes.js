import { Router } from 'express';
import validate from 'express-validation';
import { authJWT } from '../../services/auth.strategies.service';
import { isCoach, isCoachOrAdmin } from '../../services/auth.roles.service';
import planValidator from './plan.validations';
import * as planController from './plan.controllers';

const routes = new Router();

routes.post('/', [authJWT, isCoach], validate(planValidator.create), planController.create);
routes.patch('/:id', [authJWT, isCoach], validate(planValidator.update), planController.update);
routes.delete('/:id', [authJWT, isCoachOrAdmin], planController.remove);
routes.get('/:id', authJWT, planController.searchById);
routes.get('/', authJWT, planController.search);
routes.get('/mine/current', authJWT, planController.getCurrent);

export default routes;
