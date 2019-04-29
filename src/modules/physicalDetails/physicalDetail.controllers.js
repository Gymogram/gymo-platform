import HttpStatus from 'http-status';
import PhysicalDetail from './models/physicalDetail.model';
import Trainee from '../users/models/trainee.model';

export async function createPhysicalDetail(req, res) {
  try {
    const trainee = await Trainee.findById(req.body.trainee);

    if (!trainee) {
      return res.status(HttpStatus.BAD_REQUEST).send('Trainee not found.');
    }
    return res.status(HttpStatus.OK).json(await PhysicalDetail.createPhysicalDetail(req.body, trainee._id));  
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
}
