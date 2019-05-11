import HttpStatus from 'http-status';
import Plan from './models/plan.model';

export async function create(req, res) {
  return res.status(HttpStatus.BAD_REQUEST).send('Invalid Trainee.');
}
