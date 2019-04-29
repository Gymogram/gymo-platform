import HttpStatus from 'http-status';
import _ from 'lodash';
import mongoose from 'mongoose';
import Trainee from '../modules/trainees/models/trainee.model';

export const hasUserUpdatePremission = function (req, res, next) {
  const hasValidRoles = _.includes(req.user.roles, 'ADMIN');
  if (!hasValidRoles && req.user._id !== req.params.id) {
    return res.status(HttpStatus.FORBIDDEN).send('Access denied.');
  }
  next();
};

export const hasUserReadPremission = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpStatus.BAD_REQUEST).send('Invalid user.');
  }
  const hasValidRoles =
    _.intersection(req.user.roles, ['ADMIN', 'COACH']).length > 0;
  if (hasValidRoles === false && req.user._id.toHexString() !== req.params.id) {
    return res.status(HttpStatus.FORBIDDEN).send('Access denied.');
  }
  next();
};

export const hasTraineeUpdatePremission = async function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpStatus.BAD_REQUEST).send('Invalid trainee.');
  }
  const hasValidRoles =
    _.intersection(req.user.roles, ['ADMIN', 'COACH']).length > 0;

  if (hasValidRoles === false) {
    const hasCustomerRole = _.includes(req.user.roles, 'CUSTOMER');

    if (hasCustomerRole === true) {
      const customer = await Trainee.findOne({
        user: req.user._id.toHexString(),
      });
      if (customer && customer._id.toHexString() !== req.params.id) {
        return res.status(HttpStatus.FORBIDDEN).send('Access denied.');
      }
    } else {
      return res.status(HttpStatus.FORBIDDEN).send('Access denied.');
    }
  }
  next();
};

export const hasUserLoginPremission = async function (req, res, next) {
  try {
    const hasCustomerRole = _.includes(req.user.roles, 'CUSTOMER');
    const hasCoachRole = _.includes(req.user.roles, 'COACH');
    if (hasCoachRole && req.user.isArchived === true) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .send('Access denied. User deactivated');
    }
    if (hasCustomerRole) {
      const customer = await Trainee.findOne({ user: req.user._id });
      if (
        !customer ||
        !customer.invitationCode ||
        req.user.isArchived === true
      ) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .send('Access denied. User deactivated');
      }
    }

    next();
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send('Somenthing failed.');
  }
};
