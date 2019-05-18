/* eslint-disable radix */
import HttpStatus from 'http-status';
import _ from 'lodash';
import mongoose from 'mongoose';
import config from 'config';
import Activity from './models/activity.model';

export async function create(req, res) {
  try {
    const activityData = _.pick(req.body, Activity.getPublicFields());
    _.assign(activityData, { createdBy: req.user._id });

    const activity = await Activity.create(activityData);

    return res.status(HttpStatus.CREATED)
      .json(activity);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send();
  }
}

export async function update(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid activity.');
    }

    const activityToUpdate = _.pick(req.body, Activity.getPublicFields());
    _.assign(activityToUpdate, { lastUpdatedBy: req.user._id });

    const activity = await Activity.findByIdAndUpdate(req.params.id, activityToUpdate, { new: true });
  
    if (!activity) {
      return res.status(HttpStatus.NOT_FOUND)
        .send('The activity with the given ID was not found.');
    }
    return res.status(HttpStatus.OK).json(activity);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send();
  }
}

export async function remove(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid activity.');
    }
    const activity = await Activity.findByIdAndRemove(req.params.id);

    if (!activity) return res.status(HttpStatus.NOT_FOUND).send('The activity with the given ID was not found.');

    res.send(activity);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send();
  }
}

export async function searchById(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpStatus.BAD_REQUEST).send('Invalid activity ID.');
  }

  try {
    const result = await Activity.findById(req.params.id);
    if (!result) return res.status(HttpStatus.NOT_FOUND).send('The activity with the given ID was not found.');

    return res.status(HttpStatus.OK).json(result);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send();
  }
}

export async function search(req, res) {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.pageSize) || config.get('app.pagination.pageSize');
    const attrMatchs = config.get('app.search.activity.filterAttributes');
    const sortedBy = req.query.sortedBy || config.get('app.search.activity.defaultSortField');
    const order = req.query.order || config.get('app.search.activity.defaultSortOrder');
    const reqParamsCriteria = _.intersection(Object.keys(req.query), attrMatchs);
    const searchCriteria = {};

    if (reqParamsCriteria && reqParamsCriteria.length > 0) {
      reqParamsCriteria.forEach(element => {
        const path = getPath(element);
        const value = getMatchCriteria(element, req.query);
        searchCriteria[path] = value;
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

    const results = await Activity.find(searchCriteria)
      .populate({ path: 'media.entity' })
      .limit(limit)
      .skip(page * limit)
      .sort(sortCriteria);

    if (results === undefined || results.length === 0) return res.status(HttpStatus.NOT_FOUND).send('No activity was found.');
   
    const count = await Activity.count(searchCriteria);
    return res.status(HttpStatus.OK).json({
      total: count,
      page,
      pageSize: results.length,
      results,
    });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send();
  }
}

function getPath(element) {
  let path;
  switch (element) {
    case 'mediaType':
      path = `media.${element}`;
      break;
    case 'hasAnyMedia':
      path = 'media';
      break;
    default:
      path = element;
  }
  return path;
}

function getMatchCriteria(element, paramMap) {
  let value;

  switch (element) {
    case 'createdBy':
    case 'lastUpdatedBy': 
      value = paramMap[element];
      break;
    case 'hasAnyMedia': 
      if (paramMap[element] === 'true') {
        value = { $ne: null };
      } else {
        value = { $size: 0 };
      }
      break;
    default:
      value = { $regex: paramMap[element], $options: 'i' };
  }

  return value;
}
