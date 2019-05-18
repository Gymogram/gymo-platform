import HttpStatus from 'http-status';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';
import User from '../../src/modules/users/models/user.model';

chai.use(chaiHttp);
describe('LOGIN endpoint', () => {
  after(async () => {
    await User.deleteMany({});
    delete require.cache[require.resolve('../../src/index')];
  });

  context('/login COACH', () => {
    const url = '/api/v1/login';
    const executor = () => chai.request(app).post(url)
      .set('content-type', 'application/json')
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
      roles: ['COACH'],
    };

    let requestTemplate;
    let user;

    beforeEach(async () => {
      user = new User(userData);
      await user.save();

      requestTemplate = {
        email: userData.email,
        password: userData.password,
      };
    });

    afterEach(async () => {
      await User.deleteMany({ email: { $regex: '.*@tester.*' } });
    });

    it('should login a valid user', async () => {
      const res = await executor();
      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('email', user.email);
      res.header.should.have.deep.property('x-auth-token');
    });
        
    it('should not login a non existing user', async () => {
      requestTemplate.email = 'notsaved@tester.com';

      const res = await executor();
      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });

    it('should not login with an invalid request', async () => {
      delete requestTemplate.password;
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not login with an invalid password', async () => {
      requestTemplate.password = 'anotherPass';
      const res = await executor();
      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });

    it('should not login an archived user', async () => {
      await User.findByIdAndUpdate(
        user._id,
        { isArchived: true });
      const res = await executor();
      res.should.have.status(HttpStatus.FORBIDDEN);
    });
  });
});
