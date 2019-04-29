import HttpStatus from 'http-status';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';
import User from '../../src/modules/users/models/user.model';
import Trainee from '../../src/modules/trainees/models/trainee.model';

chai.use(chaiHttp);

describe('TRAINEES endpoint', () => {
  const url = '/api/v1/trainees/';       

  after(async () => {
    await User.deleteMany({ });

    delete require.cache[require.resolve('../../src/index')];
  });

  context('/trainees/:id PUT', () => {
    let requestTemplate;

    const executor = () => chai.request(app).put(url + traineeID)
      .set('Authorization', token)
      .send(requestTemplate);
        
    const userData = {
      password: 'Usto7cn*',
      email: 'test@tester.com',
      firstname: 'Tester',
      lastname: 'Testing',
      personalID: '99999999',
      address: 'House 1 Main street',
      phone: '9999999999999',
      identificationType: mongoose.Types.ObjectId(),
      roles: ['CUSTOMER'],
    };

    let user;
    let trainee;
    let token;
    let traineeID;

    before(async () => {
      user = new User(userData);
      await user.save();
    });

    beforeEach(async () => {
      requestTemplate = {
        emergencyContactName: 'John',
        emergencyContactPhone: '999999999',
        lastStartDate: '04-01-2019',
        gender: 'M',
      };
      trainee = await Trainee.createTrainee(requestTemplate, user._id);
      token = `JWT ${user.buildToken()}`;
    });

    afterEach(async () => {
      await Trainee.deleteMany({ });
      await User.deleteMany({ email: { $regex: '.*@testertmp.*' } });
    });

    it('should update with a valid trainee ID and valid auth token for current user', async () => {
      traineeID = trainee._id;
      requestTemplate.emergencyContactPhone = '77777777';

      const res = await executor();
      
      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('emergencyContactPhone');
      res.body.should.have.deep.property('_id');
      res.body.emergencyContactPhone.should.equal(requestTemplate.emergencyContactPhone);
      res.body._id.should.equal(trainee._id.toHexString());
    });

    it('should update with a valid trainee ID and valid auth coach/admin token', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'coachtest@testertmp.com',
        firstname: 'Temp Tester',
        lastname: 'Testing',
        personalID: '99999999',
        address: 'House 1 Main street',
        phone: '9999999999999',
        identificationType: mongoose.Types.ObjectId(),
        roles: ['COACH'],
      };
      const testUser = new User(data);
      await testUser.save();
      token = `JWT ${testUser.buildToken()}`;

      traineeID = trainee._id;
      requestTemplate.emergencyContactName = 'Mary';
      const res = await executor();

      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('emergencyContactName');
      res.body.should.have.deep.property('_id');
      res.body.emergencyContactName.should.equal(requestTemplate.emergencyContactName);
      res.body._id.should.equal(trainee._id.toHexString());
    });

    it('should not update with valid auth coach/admin/customer token but not existing trainee ID', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'coachtest@testertmp.com',
        firstname: 'Temp Tester',
        lastname: 'Testing',
        personalID: '99999999',
        address: 'House 1 Main street',
        phone: '9999999999999',
        identificationType: mongoose.Types.ObjectId(),
        roles: ['COACH'],
      };
      const testUser = new User(data);
      await testUser.save();
      token = `JWT ${testUser.buildToken()}`;

      traineeID = mongoose.Types.ObjectId().toHexString();
      const res = await executor();

      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not update with valid auth token but is not coach/admin neither the current user/trainee', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'customertest@testertmp.com',
        firstname: 'Temp Tester',
        lastname: 'Testing',
        personalID: '99999999',
        address: 'House 1 Main street',
        phone: '9999999999999',
        identificationType: mongoose.Types.ObjectId(),
        roles: ['CUSTOMER'],
      };
      const testUser = new User(data);
      await testUser.save();
      await Trainee.createTrainee(requestTemplate, testUser._id);
       
      token = `JWT ${testUser.buildToken()}`;

      traineeID = trainee._id;
      const res = await executor();

      res.should.have.status(HttpStatus.FORBIDDEN);
    });

    it('should not update with valid auth token but not valid request body (eg.: not valid date)', async () => {
      traineeID = trainee._id;
      requestTemplate.lastStartDate = 'text';

      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not update with valid auth coach/admin token but not valid trainee ID', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'coachtest@testertmp.com',
        firstname: 'Temp Tester',
        lastname: 'Testing',
        personalID: '99999999',
        address: 'House 1 Main street',
        phone: '9999999999999',
        identificationType: mongoose.Types.ObjectId(),
        roles: ['COACH'],
      };
      const testUser = new User(data);
      await testUser.save();
      token = `JWT ${testUser.buildToken()}`;

      traineeID = 'someid';
      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not complete update action for invalid auth token', async () => {
      token = 'JWT ';
      traineeID = trainee._id;

      const res = await executor();

      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });

    it('should not complete update action for invalid trainee ID', async () => {
      traineeID = 'test';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not complete update action for invalid request', async () => {
      traineeID = '';
      requestTemplate = '';

      const res = await executor();

      res.should.have.status(HttpStatus.NOT_FOUND);
    });
  });
});
