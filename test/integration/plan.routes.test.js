import HttpStatus from 'http-status';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';
import Plan from '../../src/modules/plans/models/plan.model';
import Trainee from '../../src/modules/trainees/models/trainee.model';
import User from '../../src/modules/users/models/user.model';

chai.use(chaiHttp);
describe('PLANS endpoint', () => {
  const url = '/api/v1/plans/';

  const userData = {
    password: 'Usto7cn*',
    email: 'test@tester.com',
    firstname: 'Tester',
    lastname: 'Testing',
    personalID: '99999999',
    address: 'House 1 Main street',
    phone: '9999999999999',
    identificationType: mongoose.Types.ObjectId(),
    roles: ['COACH'],
  };

  context('/plans POST', () => {
    let token;
    let requestTemplate;
    let user;

    before(async () => {
      user = new User(userData);
      await user.save();
    });

    after(async () => {
      await Plan.deleteMany({}); 
      await Trainee.deleteMany({});
      await User.deleteMany({});
      delete require.cache[require.resolve('../../src/index')];
    });

    beforeEach(() => {
      token = `JWT ${user.buildToken()}`;
    });

    const executor = () => chai.request(app).post(url)
      .set('Authorization', token)
      .send(requestTemplate);

    it('should create a new Plan with valid auth Coach and valid request', () => {

    });

    it('should create a new Plan with valid auth Admin and valid request', () => {

    });

    it('should not create a new Plan with valid auth Coach and valid request, but trainee has on going plan', () => {

    });

    it('should not create a new Plan with valid auth  and deactivated trainee', () => {

    });

    it('should not create a new Plan with valid auth and invalid period type', () => {

    });

    it('should not create a new Plan with valid auth and invalid stage type', () => {

    });

    it('should not create a new Plan with valid auth and invalid activity', () => {

    });

    it('should not create a new Plan with valid auth and invalid request sessions data', () => {

    });

    it('should not create a new Plan for invalid auth token', () => {

    });

    it('should not create a new Plan for empty request', async () => {
      requestTemplate = '';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
  });
});
