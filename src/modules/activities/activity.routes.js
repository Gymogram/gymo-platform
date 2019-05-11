import { Router } from 'express';
import validate from 'express-validation';
import activityValidator from './activity.validations';
import { authJWT } from '../../services/auth.strategies.service';
import * as activityController from './acitivity.controllers';
import { isCoachOrAdmin } from '../../services/auth.roles.service';

const routes = new Router();

routes.post('/', [authJWT, isCoachOrAdmin], validate(activityValidator.create), activityController.create);
routes.patch('/:id', [authJWT, isCoachOrAdmin], validate(activityValidator.update), activityController.update);
routes.delete('/:id', [authJWT, isCoachOrAdmin], activityController.remove);

export default routes;

