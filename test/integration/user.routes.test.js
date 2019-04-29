import HttpStatus from 'http-status';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import User from '../../src/modules/users/models/user.model';
import app from '../../src/index';

chai.use(chaiHttp);
describe('USERS endpoint', () => {
  const url = '/api/v1/users/';       

  after(async () => {
    await User.deleteMany({ email: { $regex: '.*@tester.*' } });
    delete require.cache[require.resolve('../../src/index')];
  });

  context('/users/:id GET', () => {
    const executor = () => chai.request(app).get(url + searchID)
      .set('Authorization', token);
        
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
    let token;
    let searchID;

    beforeEach(async () => {
      user = new User(userData);
      await user.save();
      token = `JWT ${user.buildToken()}`;
    });

    afterEach(async () => {
      await User.deleteMany({ email: { $regex: '.*@tester.*' } });
    });

    it('should return user data with a valid user ID and valid auth token for current user', async () => {
      searchID = user._id;
      const res = await executor();

      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('email');
      res.body.should.have.deep.property('_id');
      res.body.email.should.equal(user.email);
      res.body._id.should.equal(user._id.toHexString());
    });

    it('should return user data with a valid user ID and valid auth coach/admin token', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'coachtest@tester.com',
        firstname: 'Tester',
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

      searchID = user._id;
      const res = await executor();

      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('email');
      res.body.should.have.deep.property('_id');
      res.body.email.should.equal(user.email);
      res.body._id.should.equal(user._id.toHexString());
    });

    it('should not return user data with valid auth token but is not coach/admin neither the current user', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'customertest@tester.com',
        firstname: 'Tester',
        lastname: 'Testing',
        personalID: '99999999',
        address: 'House 1 Main street',
        phone: '9999999999999',
        identificationType: mongoose.Types.ObjectId(),
        roles: ['CUSTOMER'],
      };
      const testUser = new User(data);
      await testUser.save();
      token = `JWT ${testUser.buildToken()}`;
      const res = await executor();

      res.should.have.status(HttpStatus.FORBIDDEN);
    });

    it('should not return user data with valid auth coach/admin token but not valid user ID to search', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'coachtest@tester.com',
        firstname: 'Tester',
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
      searchID = mongoose.Types.ObjectId();
      const res = await executor();

      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not return user data with invalid auth token', async () => {
      token = 'JWT jkfjskdf';
      const res = await executor();

      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });

    it('should not return user data with invalid user id', async () => {
      searchID = 'test';
      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not return user data for invalid request', async () => {
      searchID = '';
      const res = await executor();

      res.should.have.status(HttpStatus.NOT_FOUND);
    });
  });

  context('/users/:id DELETE (deactivate)', () => { 
    const executor = () => chai.request(app).delete(url + userID)
      .set('Authorization', token);

    const userData = {
      password: 'Usto7cn*',
      email: 'admtest@tester.com',
      firstname: 'Tester',
      lastname: 'Testing',
      personalID: '99999999',
      address: 'House 1 Main street',
      phone: '9999999999999',
      identificationType: mongoose.Types.ObjectId(),
      roles: ['ADMIN'],
    };

    let user;
    let token;
    let userID;

    beforeEach(async () => {
      user = new User(userData);
      await user.save();
      token = `JWT ${user.buildToken()}`;
    });

    afterEach(async () => {
      await User.deleteMany({ email: { $regex: '.*@tester.*' } });
    });

    it('should delete/deactivate user (not itself) for a valid auth admin token', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'coachtest@tester.com',
        firstname: 'Tester',
        lastname: 'Testing',
        personalID: '99999999',
        address: 'House 1 Main street',
        phone: '9999999999999',
        identificationType: mongoose.Types.ObjectId(),
        roles: ['COACH'],
      };
      const testUser = new User(data);
      await testUser.save();
      userID = testUser._id;

      const res = await executor();
      const userUpdated = await User.findById(testUser._id);           

      res.should.have.status(HttpStatus.OK);
      userUpdated.should.not.equal(undefined);
      userUpdated.should.have.deep.property('isArchived', true);
    });

    it('should not complete delete action for a valid auth admin token to deactivate itself.', async () => {
      userID = user._id;
      const res = await executor();

      res.should.have.status(HttpStatus.FORBIDDEN);
    });

    it('should not complete delete action for a valid auth (only) coach token', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'coachtest@tester.com',
        firstname: 'Tester',
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

      const res = await executor();

      res.should.have.status(HttpStatus.FORBIDDEN);
    });

    it('should not complete delete action for a valid auth customer token', async () => {
      const data = {
        password: 'Usto7cn*',
        email: 'customertest@tester.com',
        firstname: 'Tester',
        lastname: 'Testing',
        personalID: '99999999',
        address: 'House 1 Main street',
        phone: '9999999999999',
        identificationType: mongoose.Types.ObjectId(),
        roles: ['CUSTOMER'],
      };
      const testUser = new User(data);
      await testUser.save();
      token = `JWT ${testUser.buildToken()}`;

      const res = await executor();

      res.should.have.status(HttpStatus.FORBIDDEN);
    });

    it('should not complete delete action for invalid auth token', async () => {
      token = 'JWT jkfjskdf';
      const res = await executor();

      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });

    it('should not complete delete action for invalid user ID', async () => {
      userID = 'test';
      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not complete delete action for invalid request', async () => {
      userID = '';
      const res = await executor();

      res.should.have.status(HttpStatus.NOT_FOUND);
    });
  });
});
