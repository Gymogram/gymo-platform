import HttpStatus from 'http-status';
import _ from 'lodash';
import Trainee from './models/trainee.model';
import User from './../users/models/user.model';

export async function create(req, res) {
  try {
    const customer = await Trainee.findOne({ user: req.body.userID });
  
    if (customer) {
      return res.status(HttpStatus.NOT_FOUND).send('Invalid user.');
    }
  
    const user = await User.findById(req.body.userID);
  
    if (!user || (user && !_.includes(user.roles, 'CUSTOMER'))) {
      return res.status(HttpStatus.NOT_FOUND).send('Invalid user.');
    }
    
    let trainee = _.pick(req.body, Trainee.getUpdatableFields());
    trainee = await Trainee.createTrainee(trainee, user._id);
    return res.status(HttpStatus.OK)
      .json(trainee);  
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

export async function update(req, res) {
  try {
    const traineeToUpdate = _.pick(req.body, Trainee.getPublicFields());
    const trainee = await Trainee.findByIdAndUpdate(
      req.params.id,
      traineeToUpdate,
      { new: true });
    
    if (!trainee) {
      return res.status(HttpStatus.NOT_FOUND)
        .send('The trainee with the given ID was not found.');
    }
    return res.status(HttpStatus.OK).json(trainee);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}

