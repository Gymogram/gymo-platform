import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  create: {
    body: {
      emergencyContactName: Joi.string().min(2).max(255).required(),
      emergencyContactPhone: Joi.string().min(8).max(50).required(),
      lastStartDate: Joi.date().min('now').required(), 
      gender: Joi.string().valid('M', 'F', 'O').required(),
      userID: Joi.objectId().required(),  
    },
  },
  update: {
    body: {
      emergencyContactName: Joi.string().min(2).max(255),
      emergencyContactPhone: Joi.string().min(8).max(50),
      lastStartDate: Joi.date(), 
      gender: Joi.string().valid('M', 'F', 'O'),
    },
  },
};

