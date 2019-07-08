import HttpStatus from 'http-status';
import _ from 'lodash';

export const isCoachOrAdmin = function (req, res, next) {
  const hasValidRoles = _.includes(req.user.roles, 'COACH', 'ADMIN');

  if (!hasValidRoles) {
    return res.status(HttpStatus.FORBIDDEN).send('Access denied.');
  }
  next();
};

export const isCoach = function (req, res, next) {
  const hasValidRoles = _.includes(req.user.roles, 'COACH');
    
  if (!hasValidRoles) {
    return res.status(HttpStatus.FORBIDDEN).send('Access denied.');
  }
  next();
};

export const isAdmin = function (req, res, next) {
  const hasValidRoles = _.includes(req.user.roles, 'ADMIN');
  if (!hasValidRoles) {
    return res.status(HttpStatus.FORBIDDEN).send('Access denied.');
  }
  next();
};
