import Plan from './models/plan.model';
import HttpStatus from 'http-status';


export async function create(req, res) {
    return res.status(HttpStatus.BAD_REQUEST).send('Invalid Trainee.')
}