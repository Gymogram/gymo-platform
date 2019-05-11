import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  create: {
    body: {
      name: Joi.string().min(3).max(255).required(),
      description: Joi.string().max(500).required(),
      recommendations: Joi.string().max(500).required(),
      activityType: Joi.string().valid('EFFORT', 'RECOVERY').required(),
      media: Joi.array().items(Joi.object({
        mediaType: Joi.string().valid('IMAGE', 'VIDEO').required(),
        contentUrl: Joi.string().uri().required(),
      })),
    },
  },
  update: {
    body: {
      name: Joi.string().min(3).max(255),
      description: Joi.string().max(500),
      recommendations: Joi.string().max(500),
      activityType: Joi.string().valid('EFFORT', 'RECOVERY'),
      media: Joi.array().items(Joi.object({
        mediaType: Joi.string().valid('IMAGE', 'VIDEO'),
        contentUrl: Joi.string().uri().required(),
      })),
    },
  },
};
