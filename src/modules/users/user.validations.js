import Joi from 'joi';

export const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

Joi.objectId = require('joi-objectid')(Joi);

export default {
  signup: {
    body: {
      email: Joi.string().required().email(),
      // eslint-disable-next-line max-len
      password: Joi.string().regex(passwordReg).required().error(() => 'Invalid password. It must contain 8 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character'),
      firstname: Joi.string().min(2).max(100).required(), 
      lastname: Joi.string().min(2).max(255).required(),
      personalID: Joi.number().required(),
      phone: Joi.string().min(8).max(50).required(),
      address: Joi.string().min(5).max(255).required(), 
      roles: Joi.array().items(Joi.string().required().valid('CUSTOMER', 'COACH', 'ADMIN')).required(), 
      instaID: Joi.string().min(3).max(255),
      fbID: Joi.string().min(3).max(255),
      identificationTypeID: Joi.objectId().required(),
      displayName: Joi.string().min(2).max(255),
    },
  },
  update: {
    body: {
      email: Joi.string().email(),
      // eslint-disable-next-line max-len
      password: Joi.string().regex(passwordReg).error(() => 'Invalid password. It must contain 8 characters, with at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character'),
      firstname: Joi.string().min(2).max(100), 
      lastname: Joi.string().min(2).max(255),
      personalID: Joi.number(),
      phone: Joi.string().min(8).max(50),
      address: Joi.string().min(5).max(255), 
      roles: Joi.array().items(Joi.string().valid('CUSTOMER', 'COACH', 'ADMIN')), 
      instaID: Joi.string().min(3).max(255),
      fbID: Joi.string().min(3).max(255),
      identificationTypeID: Joi.objectId(),
      displayName: Joi.string().min(2).max(255),
    },
  },
  trainee: {
    body: {
      emergencyContactName: Joi.string().min(2).max(255).required(),
      emergencyContactPhone: Joi.string().min(8).max(50).required(),
      lastStartDate: Joi.date().min('now').required(), 
      gender: Joi.string().valid('M', 'F', 'O').required(),
      userID: Joi.objectId().required(),  
    },
  },
};
