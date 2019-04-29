import { Router } from 'express';
import validate from 'express-validation';
import physicalDetailValidator from './physicalDetail.validations';
import * as physicalDetailController from './physicalDetail.controllers';
import { authJWT } from '../../services/auth.strategies.service';

const routes = new Router();

routes.post('/physicalDetail', authJWT, validate(physicalDetailValidator.physicalDetail), physicalDetailController.createPhysicalDetail);
