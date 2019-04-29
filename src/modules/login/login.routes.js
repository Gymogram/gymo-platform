import { Router } from 'express';
import { authLocal } from '../../services/auth.strategies.service';
import { hasUserLoginPremission } from '../../services/auth.op.privileges.services';
import * as loginController from './login.controllers';

const routes = new Router();

routes.post('/', [authLocal, hasUserLoginPremission], loginController.login); 

export default routes;
