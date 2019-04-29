import { Router } from 'express';
import validate from 'express-validation';
import * as userController from './user.controllers';
import userValidator from './user.validations';
import { authJWT } from '../../services/auth.strategies.service';
import { isAdmin } from '../../services/auth.roles.service';
import { hasUserUpdatePremission, hasUserReadPremission } from '../../services/auth.op.privileges.services';

const routes = new Router();

routes.post('/signup', validate(userValidator.signup), userController.signUp);
routes.put('/:id', [authJWT, hasUserUpdatePremission], validate(userValidator.update), userController.update);
routes.get('/:id', [authJWT, hasUserReadPremission], userController.getUser);
routes.delete('/:id', [authJWT, isAdmin], userController.deactivate);

// NEW ENDPOINTS SEPARATE set coach profile 
// COACH ADMIN,  MEDIA user endpoint update profile pic (prv user)

export default routes;
