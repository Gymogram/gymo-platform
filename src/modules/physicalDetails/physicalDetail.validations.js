import Joi from 'joi';

export default {
  physicalDetail: {
    body: {
      hasHeartDiseases: Joi.boolean().required(),
      heartDiseasesDetail: Joi.string()
        .when('hasHeartDiseases', { is: true, then: Joi.required() }),
      hasRespiratoryDiseases: Joi.boolean().required(),
      respiratoryDiseasesDetail: Joi.string()
        .when('hasRespiratoryDiseases', { is: true, then: Joi.required() }),
      hasMotorDifficulties: Joi.boolean().required(),
      motorDifficultiesDetail: Joi.string()
        .when('hasMotorDifficulties', { is: true, then: Joi.required() }),
      hasInjuries: Joi.boolean().required(),
      injuriesDetail: Joi.string()
        .when('hasInjuries', { is: true, then: Joi.required() }),
      hasMedications: Joi.boolean().required(),
      medicationsDetails: Joi.string()
        .when('hasMedications', { is: true, then: Joi.required() }),
      trainee: Joi.required(),
    },
  },
};
