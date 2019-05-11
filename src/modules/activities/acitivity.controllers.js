import HttpStatus from 'http-status';
import _ from 'lodash';
import mongoose from 'mongoose';
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

    if (!activity) return res.status(404).send('The activity with the given ID was not found.');

    res.send(activity);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send();
  }
}
