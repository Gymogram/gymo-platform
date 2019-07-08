import HttpStatus from 'http-status';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiArrays from 'chai-arrays';
import mongoose from 'mongoose';
import moment from 'moment';
import config from 'config';
import app from '../../src/index';
import Plan from '../../src/modules/plans/models/plan.model';
import Trainee from '../../src/modules/trainees/models/trainee.model';
import User from '../../src/modules/users/models/user.model';

chai.use(chaiHttp);
chai.use(chaiArrays);

describe('PLANS Search endpoint', () => {
  const url = '/api/v1/plans/';
  const jsonPlans = require('./data/plans.json');
  const userData = {
    password: 'Usto7cn*',
    email: 'test@tester.com',
    firstname: 'Tester',
    lastname: 'Testing',
    personalID: '99999999',
    address: 'House 1 Main street',
    phone: '9999999999999',
    identificationType: mongoose.Types.ObjectId(),
    roles: ['COACH', 'ADMIN'],
  };
  let user;

  before(async () => {
    await Plan.insertMany(jsonPlans);
    user = new User(userData);
    await user.save();
    
    userData.email = 'customer@tester.com';
    user.roles = ['CUSTOMER'];

    const userCustomer = new User(userData);
    await userCustomer.save();
  }); 

  after(async () => {
    await Plan.deleteMany({}); 
    await Trainee.deleteMany({});
    await User.deleteMany({});
    delete require.cache[require.resolve('../../src/index')];
  });
  
  context('/plans/ GET (filtered)', () => {
    const expect = chai.expect;
    let token;
    let filter;
    let filterSettings = {
      page: '',
      pageSize: '',
      order: '',
      sortedBy: '', 
    };
    let attrCriteria = '';

    beforeEach(async () => {
      filter = '';
      attrCriteria = '';
      filterSettings = {
        page: '',
        pageSize: '',
        order: '',
        sortedBy: '', 
      };
      token = `JWT ${user.buildToken()}`;
    });

    const buildFilter = () => {
      Object.keys(filterSettings).forEach(e => {
        filter += (filterSettings[e] !== '' ? `${e}=${filterSettings[e]}&` : '');
      });
      filter += attrCriteria !== '' ? attrCriteria : '';
    };

    const executor = () => chai.request(app).get(url + (filter !== '' ? `?${filter}` : ''))
      .set('Authorization', token)
      .send();
   
    it('should get all the plans for a valid request and valid auth token with the default pagination´s settings.', async () => {
      buildFilter();
      const res = await executor();
  
      res.should.have.status(HttpStatus.OK);
      res.body.should.be.a('object');
      res.body.should.have.deep.property('page');
      res.body.page.should.equal(0); // Default first page
      res.body.should.have.deep.property('pageSize');
      res.body.pageSize.should.equal(res.body.results.length); 
      res.body.should.have.deep.property('results');
      res.body.results.should.be.a('array');
      res.body.results.length.should.equal(config.get('app.pagination.pageSize')); // Default page size
      res.body.should.have.deep.property('total');
      res.body.total.should.equal(jsonPlans.length);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('goals');
      res.body.results[0].should.have.deep.property('trainee');
      res.body.results[0].should.have.deep.property('isActive');
      res.body.results[0].should.have.deep.property('startDate');
    });
    
    it('should get all the plans for a valid request and valid auth token, paginated with specific page size and page number ', async () => {
      filterSettings.page = 1;
      filterSettings.pageSize = 10;
      buildFilter();
  
      const res = await executor();
      res.should.have.status(HttpStatus.OK);
      res.body.should.be.a('object');
      res.body.should.have.deep.property('page');
      res.body.page.should.equal(filterSettings.page);
      res.body.should.have.deep.property('pageSize');
      res.body.pageSize.should.equal(res.body.results.length);
      res.body.should.have.deep.property('results');
      res.body.results.should.be.a('array');
      res.body.results.length.should.equal(jsonPlans.length % filterSettings.pageSize);
      res.body.should.have.deep.property('total');
      res.body.total.should.equal(jsonPlans.length);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('goals');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('trainee');
      res.body.results[0].should.have.deep.property('isActive');
    });
    
    it('should get all the plans that match the  provided filter criteria (createdBy, trainee ) for a valid request and valid auth token', async () => {
      filterSettings.pageSize = 10;
      attrCriteria = 'createdBy=5d084e5cc04e3d247e6f3a9c&trainee=5d084e5c7a012f522aa80cf4';
      buildFilter();
  
      const res = await executor();
      res.should.have.status(HttpStatus.OK);
      res.body.should.be.a('object');
      res.body.should.have.deep.property('page');
      res.body.page.should.equal(0);
      res.body.should.have.deep.property('pageSize');
      res.body.pageSize.should.equal(res.body.results.length);
      res.body.should.have.deep.property('results');
      res.body.results.should.be.a('array');
      res.body.results.length.should.equal(1);
      res.body.should.have.deep.property('total');
      res.body.total.should.equal(1);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('trainee');
      res.body.results[0].trainee.should.deep.equal('5d084e5c7a012f522aa80cf4');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].createdBy.should.deep.equal('5d084e5cc04e3d247e6f3a9c');
      res.body.results[0].should.have.deep.property('goals');
      res.body.results[0].should.have.deep.property('isActive');
    });

    it('should get all the plans that match the  provided filter criteria (name) for a valid request and valid auth token', async () => {
      attrCriteria = 'name=MOLLIT';
      const expectedElements = jsonPlans.filter(element => element.name.toUpperCase().includes('MOLLIT'));
      buildFilter();
  
      const res = await executor();
      res.should.have.status(HttpStatus.OK);
      res.body.should.be.a('object');
      res.body.should.have.deep.property('page');
      res.body.page.should.equal(0);
      res.body.should.have.deep.property('pageSize');
      res.body.pageSize.should.equal(res.body.results.length);
      res.body.should.have.deep.property('results');
      res.body.results.should.be.a('array');
      res.body.results.length.should.equal(expectedElements.length);
      res.body.should.have.deep.property('total');
      res.body.total.should.equal(expectedElements.length);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('trainee');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('goals');
    });

    it('should get all the plans in ascending order by creation Date for a valid request and valid auth token', async () => {
      filterSettings.sortedBy = 'createdAt';
  
      buildFilter();
  
      const res = await executor();
      res.should.have.status(HttpStatus.OK);
      res.body.should.be.a('object');
      res.body.should.have.deep.property('page');
      res.body.page.should.equal(0);
      res.body.should.have.deep.property('pageSize');
      res.body.pageSize.should.equal(res.body.results.length);
      res.body.should.have.deep.property('results');
      res.body.results.should.be.a('array');
      res.body.results.length.should.equal(config.get('app.pagination.pageSize'));
      res.body.should.have.deep.property('total');
      res.body.total.should.equal(jsonPlans.length);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('goals');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('months');
      res.body.results[0].should.have.deep.property('isActive');
      res.body.results.should.all.have.deep.property('startDate');
        
      expect(res.body.results).to.be.sortedBy('createdAt', { descending: false });
    });

    it('should not get any plan for invalid filter criteria (wrong field, e.g: coach ) for a valid request and valid auth token', async () => {
      attrCriteria = 'coach=Something';
      buildFilter();
  
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
    
    it('should not get any plan with a valid auth token, when an invalid filter criteria is provided.', async () => {
      attrCriteria = 'startDate=Day2';
      buildFilter();
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
    
    it('should not get any plan with valid auth token, when no document was found.', async () => {
      await Plan.deleteMany({});
      const res = await executor();
      res.should.have.status(HttpStatus.NOT_FOUND);
    });
      
    it('should not get any activity for invalid auth token', async () => {
      token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const res = await executor();
      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });
  });
});

