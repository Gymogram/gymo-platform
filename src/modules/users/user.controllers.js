import HttpStatus from 'http-status';
import _ from 'lodash';
import mongoose from 'mongoose';
import User from './models/user.model';
import IdentificationType from './models/identificationType.model';

export async function signUp(req, res) {
  try {
    const idType = await IdentificationType
      .findById(req.body.identificationTypeID);
    if (!idType) {
      res.status(HttpStatus.BAD_REQUEST).send('Invalid Identification Type.');
    }
    const user = await User
      .createUser(_.omit(req.body, 'identificationTypeID'), idType._id);
    return res.status(HttpStatus.CREATED).json(user).send();
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error).send();
  }
}

export async function update(req, res) {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(HttpStatus.BAD_REQUEST)
        .send('Object missing. Check API documentation.');
    }
    if (req.body.password) {
      return res.status(HttpStatus.BAD_REQUEST)
        .send('Password change not allowed in this operation.');
    }
    let idType = null;
    if (req.body.identificationTypeID) {
      idType = await IdentificationType.findById(req.body.identificationTypeID);
      if (!idType) {
        res.status(HttpStatus.BAD_REQUEST).send('Invalid Identification Type.');
      }
    }

    let userToUpdate = _.pick(req.body, User.getPublicFields());
    if (idType) {
      userToUpdate = _.set(userToUpdate, 'identificationType', idType._id);
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      userToUpdate,
      { new: true });

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND)
        .send('The user with the given ID was not found.');
    }
    return res.status(HttpStatus.OK).json(user);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}

export async function getUser(req, res) {
  let userToRead;
  try {
    if (req.params.id !== req.user._id) {
      userToRead = await User.findById(req.params.id);

      if (!userToRead) {
        return res.status(HttpStatus.NOT_FOUND).send();
      }
    } else {
      userToRead = req.user;
    }

    return res.status(HttpStatus.OK).json(userToRead.toJSON());
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function deactivate(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(HttpStatus.BAD_REQUEST).send('Invalid user.');
  }

  if (req.params.id === req.user._id.toHexString()) {
    return res.status(HttpStatus.FORBIDDEN)
      .send('Self deactivation not allowed.');
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isArchived: true },
      { new: true });

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND)
        .send('The user with the given ID was not found.');
    }
    return res.status(HttpStatus.OK).send();
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

