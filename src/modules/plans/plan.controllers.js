/* eslint-disable radix */
import HttpStatus from 'http-status';
import _ from 'lodash';
import mongoose from 'mongoose';
import config from 'config';
import Trainee from '../trainees/models/trainee.model';
import Plan from './models/plan.model';
import PlanIntegrityValidator from './plan.integrity.validations';

export async function create(req, res) {
  try {
    // Check valid trainee
    const trainee = await Trainee.findById(req.body.traineeID).populate('user');

    if (!trainee) {
      return res.status(HttpStatus.NOT_FOUND).send('Trainee was not found.');
    } else if (trainee.user.isArchived === true) {
      return res.status(HttpStatus.BAD_REQUEST).send('Trainee is deactivated.');
    }

    const planIntegrityValidatorBuilder = new PlanIntegrityValidator.Builder(req.body);
    await planIntegrityValidatorBuilder.syncronizeLegacyData();

    const planIntegrityValidator = planIntegrityValidatorBuilder.withDefaultBasicValidation()
      .build();

    if (planIntegrityValidator.isBasicStructureValid === false) {
      if (planIntegrityValidator.areAllStagesValid === false) {
        return res.status(HttpStatus.BAD_REQUEST).send('One or more stage types were not found.');
      }

      if (planIntegrityValidator.areAllPeriodTypesValid === false) {
        return res.status(HttpStatus.BAD_REQUEST).send('One or more period types were not found.');
      }

      if (planIntegrityValidator.areAllActivitiesValid === false) {
        return res.status(HttpStatus.BAD_REQUEST).send('One or more activities were not found.');
      }
    }

    const planData = _.pick(req.body, Plan.getPublicFields());
    _.assign(planData, { createdBy: req.user._id });
    _.assign(planData, { trainee: trainee._id });

    const plan = await Plan.create(planData);

    return res.status(HttpStatus.CREATED).json(plan);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function update(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid plan.');
    }

    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(HttpStatus.NOT_FOUND)
        .send('The plan with the given ID was not found.');
    }

    let trainee = null;
    if (req.body.traineeID) {
      trainee = await Trainee.findById(req.body.traineeID).populate('user');

      if (!trainee) {
        return res.status(HttpStatus.NOT_FOUND).send('Trainee was not found.');
      } else if (trainee.user.isArchived === true) {
        return res.status(HttpStatus.BAD_REQUEST).send('Trainee is deactivated.');
      }
    }

    const planIntegrityValidatorBuilder = new PlanIntegrityValidator.Builder(req.body, plan);
    await planIntegrityValidatorBuilder.syncronizeLegacyData();

    const planIntegrityValidator = planIntegrityValidatorBuilder.withDefaultBasicValidation()
      .withPlanDurationValidation()
      .build();

    if (planIntegrityValidator.isBasicStructureValid === false) {
      if (planIntegrityValidator.areAllStagesValid === false) {
        return res.status(HttpStatus.BAD_REQUEST).send('One or more stage types were not found.');
      }

      if (planIntegrityValidator.areAllPeriodTypesValid === false) {
        return res.status(HttpStatus.BAD_REQUEST).send('One or more period types were not found.');
      }

      if (planIntegrityValidator.areAllActivitiesValid === false) {
        return res.status(HttpStatus.BAD_REQUEST).send('One or more activities were not found.');
      }
    }

    if (planIntegrityValidator.isPlanDurationValid === false) {
      return res.status(HttpStatus.BAD_REQUEST).send('The (Current/New) End date must be greater than the (Current/New) start date.');
    }

    const planToUpdate = _.pick(req.body, Plan.getPublicFields());
    _.assign(planToUpdate, { lastUpdatedBy: req.user._id });
    
    if (trainee) {
      _.assign(planToUpdate, { trainee: trainee._id });
    }

    const planUpdated = await Plan.findByIdAndUpdate(req.params.id, planToUpdate, { new: true });

    return res.status(HttpStatus.OK).json(planUpdated);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function remove(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid plan.');
    }

    const plan = await Plan.findByIdAndRemove(req.params.id);

    if (!plan) return res.status(HttpStatus.NOT_FOUND).send('The plan with the given ID was not found.');

    res.send(plan);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function searchById(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpStatus.BAD_REQUEST).send('Invalid plan.');
  }

  try {
    const result = await Plan.findById(req.params.id)
      .populate('trainee')
      .populate({ path: 'months.periodType' })
      .populate({ path: 'months.stage' })
      .populate({ path: 'months.weeks.sessions.works.activity' });
    if (!result) return res.status(HttpStatus.NOT_FOUND).send('The plan with the given ID was not found.');

    return res.status(HttpStatus.OK).json(result);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function search(req, res) {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.pageSize) || config.get('app.pagination.pageSize');
    const sortedBy = req.query.sortedBy || config.get('app.search.plan.defaultSortField');
    const order = req.query.order || config.get('app.search.plan.defaultSortOrder');
    const attrMatchs = config.get('app.search.plan.filterAttributes');
    const reqParamsCriteria = _.intersection(Object.keys(req.query), attrMatchs);
    const searchCriteria = {};

    if (reqParamsCriteria && reqParamsCriteria.length > 0) {
      reqParamsCriteria.forEach(element => {
        const value = getMatchCriteria(element, req.query);
        searchCriteria[element] = value;
      });
    } else {
      const remQuery = _.difference(Object.keys(req.query), attrMatchs);
      
      let valid = true; 
      for (const element of remQuery) { 
        switch (element) {
          case 'pageSize':
          case 'page':
          case 'order':
          case 'sortedBy':
            valid = true;
            break;
          default:
            valid = false;
        }
        if (valid === false) {
          break;
        }
      }
      if (valid === false) {
        res.status(HttpStatus.BAD_REQUEST).send(`Invalid search criteria. The following fields are available: ${attrMatchs}`);
      }
    }

    let sortCriteria = '';
    switch (order.toUpperCase()) {
      case 'DESC': 
        sortCriteria = `-${sortedBy}`;
        break;
      case 'ASC': 
        sortCriteria = `${sortedBy}`;
        break;
      default: 
        sortCriteria = `${sortedBy}`;
    }

    const results = await Plan.find(searchCriteria)
      .populate({ path: 'months.periodType' })
      .populate({ path: 'months.stage' })
      .populate({ path: 'months.weeks.sessions.works.activity' })
      .limit(limit)
      .skip(page * limit)
      .sort(sortCriteria);

    if (results === undefined || results.length === 0) return res.status(HttpStatus.NOT_FOUND).send('No plan was found.');

    const count = await Plan.count(searchCriteria);
    return res.status(HttpStatus.OK).json({
      total: count,
      page,
      pageSize: results.length,
      results,
    });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    if (error.name === 'CastError') {
      return res.status(HttpStatus.BAD_REQUEST).json(error).send();
    }
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send();
  }
}

function getMatchCriteria(element, paramMap) {
  let value;

  switch (element) {
    case 'createdBy':
    case 'lastUpdatedBy':
    case 'trainee': 
    case 'periodType':
    case 'stage':
    case 'isActive':
    case 'isPublished':
    case 'weekFrequency':
    case 'startDate':
      value = paramMap[element];
      break;
    default:
      value = { $regex: paramMap[element], $options: 'i' };
  }

  return value;
}
