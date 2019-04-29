import { Router } from 'express';
import validate from 'express-validation';
import { authJWT } from '../../services/auth.strategies.service';
import { isCoachOrAdmin } from '../../services/auth.roles.service';
import * as traineeController from './trainee.controllers';
import traineeValidator from './trainee.validations';
import { hasTraineeUpdatePremission } from '../../services/auth.op.privileges.services';

const routes = new Router();
routes.post('/', [authJWT, isCoachOrAdmin], validate(traineeValidator.create), traineeController.create);
routes.put('/:id', [authJWT, hasTraineeUpdatePremission], validate(traineeValidator.update), traineeController.update);

export default routes;

