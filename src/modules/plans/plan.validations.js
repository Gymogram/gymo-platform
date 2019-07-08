import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export default {
  create: {
    body: {
      name: Joi.string().min(2).max(255).required(),
      goals: Joi.array().items(Joi.string().min(5).max(500)),
      startDate: Joi.date().required(),
      endDate: Joi.date().greater(Joi.ref('startDate')).required(),
      weekFrequency: Joi.number().min(1).max(7),
      traineeID: Joi.objectId().required(),
      months: Joi.array().items(Joi.object({
        order: Joi.number().min(1).required(),
        goals: Joi.array().items(Joi.string().min(5).max(500)),
        periodTypeID: Joi.objectId(),
        stageID: Joi.objectId(),
        weeks: Joi.array().items(Joi.object({
          order: Joi.number().min(1).required(),
          goals: Joi.array().items(Joi.string().min(5).max(500)),
          sessions: Joi.array().items(Joi.object({
            order: Joi.number().min(1).required(),
            goals: Joi.array().items(Joi.string().min(5).max(500)),
            hasTimer: Joi.boolean(),
            isCurrent: Joi.boolean(),
            isSkipped: Joi.boolean(),
            works: Joi.array().items(Joi.object().keys({
              order: Joi.number().min(1).required(),
              series: Joi.number().min(1).max(100),
              reps: Joi.number().min(1).max(100).when('series', { is: Joi.number().exist(), then: Joi.required() }),
              restTimePerSerieSec: Joi.number().min(5)
                .when('series', { is: Joi.number().exist().greater(1), then: Joi.required() }),
              minWeight: Joi.number().min(0.5).max(1000),
              maxWeight: Joi.number().min(0.5).max(1000),
              completionTimeSec: Joi.number().min(0),
              estimatedTimeSec: Joi.number().min(0),
              activityID: Joi.objectId(),
              customNotes: Joi.string().max(1000),
            })),
          })),
        })),
      }
      )),

    },
  },
  update: {
    body: {
      name: Joi.string().min(2).max(255),
      goals: Joi.array().items(Joi.string().min(5).max(500)),
      startDate: Joi.date(),
      endDate: Joi.when('startDate', { is: Joi.date().exist(), then: Joi.date().greater(Joi.ref('startDate')), otherwise: Joi.date() }),
      weekFrequency: Joi.number().min(1).max(7),
      traineeID: Joi.objectId(),
      months: Joi.array().items(Joi.object({
        order: Joi.number().min(1).required(),
        goals: Joi.array().items(Joi.string().min(5).max(500)),
        periodTypeID: Joi.objectId(),
        stageID: Joi.objectId(),
        weeks: Joi.array().items(Joi.object({
          order: Joi.number().min(1).required(),
          goals: Joi.array().items(Joi.string().min(5).max(500)),
          sessions: Joi.array().items(Joi.object({
            order: Joi.number().min(1).required(),
            goals: Joi.array().items(Joi.string().min(5).max(500)),
            hasTimer: Joi.boolean(),
            isCurrent: Joi.boolean(),
            isSkipped: Joi.boolean(),
            works: Joi.array().items(Joi.object().keys({
              order: Joi.number().min(1).required(),
              series: Joi.number().min(1).max(100),
              reps: Joi.number().min(1).max(100).when('series', { is: Joi.number().exist(), then: Joi.required() }),
              restTimePerSerieSec: Joi.number().min(5)
                .when('series', { is: Joi.number().exist().greater(1), then: Joi.required() }),
              minWeight: Joi.number().min(0.5).max(1000),
              maxWeight: Joi.number().min(0.5).max(1000),
              completionTimeSec: Joi.number().min(0),
              estimatedTimeSec: Joi.number().min(0),
              activityID: Joi.objectId(),
              customNotes: Joi.string().max(1000),
            })),
          })),
        })),
      }
      )),

    },
  },
};
