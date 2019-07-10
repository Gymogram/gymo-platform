import HttpStatus from 'http-status';
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiArrays from 'chai-arrays';
import mongoose from 'mongoose';
import moment from 'moment';
import _ from 'lodash';
import app from '../../src/index';
import Plan from '../../src/modules/plans/models/plan.model';
import Trainee from '../../src/modules/trainees/models/trainee.model';
import User from '../../src/modules/users/models/user.model';
import Stage from '../../src/modules/plans/models/stageType.model';
import PeriodType from '../../src/modules/plans/models/periodType.model';
import Activity from '../../src/modules/activities/models/activity.model';

chai.use(chaiHttp);
chai.use(chaiArrays);

describe('PLANS endpoint', () => {
  const url = '/api/v1/plans/';
  const json = require('./data/activities.json');
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

  const traineeData = {
    emergencyContactName: 'some name',
    emergencyContactPhone: '999999999',
    lastStartDate: moment().format(), 
    gender: 'O',
    user: '', 
  };
  let trainee;

  let legacyStages;
  let legacyPeriodTypes;
  let legacyActivities;

  before(async () => {
    await Activity.insertMany(json);
    legacyActivities = await Activity.distinct('_id');
    legacyStages = await Stage.distinct('_id');
    legacyPeriodTypes = await PeriodType.distinct('_id');
    user = new User(userData);
    await user.save();
    
    userData.email = 'customer@tester.com';
    user.roles = ['CUSTOMER'];

    const userCustomer = new User(userData);
    await userCustomer.save();

    traineeData.user = userCustomer._id;

    trainee = new Trainee(traineeData);
    await trainee.save();
  }); 

  after(async () => {
    await Plan.deleteMany({}); 
    await Trainee.deleteMany({});
    await User.deleteMany({});
    await Activity.deleteMany({});
    delete require.cache[require.resolve('../../src/index')];
  });

  context('/plans POST', () => {
    const expect = chai.expect;
    let token;
    let requestTemplate;

    beforeEach(() => {
      token = `JWT ${user.buildToken()}`;
      requestTemplate = buildRequest(legacyStages, legacyPeriodTypes, legacyActivities, trainee);
    });

    afterEach(async () => {
      await User.deleteMany({ email: { $regex: '.*@testertmp.*' } });
      await Plan.deleteMany({});
    });

    const executor = () => chai.request(app).post(url)
      .set('Authorization', token)
      .send(requestTemplate);

    it('should create a new Plan with valid auth Coach and valid request', async () => {
      const res = await executor();

      res.should.have.status(HttpStatus.CREATED);
      res.body.should.have.deep.property('_id');
      res.body.should.have.deep.property('name');
      res.body.name.should.equal(requestTemplate.name.toUpperCase().trim());
      res.body.goals.should.be.a('array');
      res.body.goals.length.should.be.equal(requestTemplate.goals.length);
      res.body.should.have.deep.property('startDate');
      expect(res.body.startDate).to.contain(moment(requestTemplate.startDate).format('YYYY-MM-DD').toString());
      res.body.should.have.deep.property('endDate');
      expect(res.body.endDate).to.contain(moment(requestTemplate.endDate).format('YYYY-MM-DD').toString());
      res.body.should.have.deep.property('isActive');
      res.body.isActive.should.equal(true);
      res.body.should.have.deep.property('weekFrequency');
      res.body.weekFrequency.should.equal(requestTemplate.weekFrequency);
      res.body.should.have.property('trainee');
      res.body.trainee.should.equal(trainee._id.toHexString());
      res.body.should.have.property('months');
      res.body.months.should.be.a('array');
      res.body.months.length.should.equal(requestTemplate.months.length);  
      res.body.months[0].should.have.deep.property('weeks');
      res.body.months[0].weeks.should.be.a('array');
      res.body.months[0].weeks[0].should.have.deep.property('sessions');
      res.body.months[0].weeks[0].sessions.should.be.a('array');
      res.body.months[0].weeks[0].sessions[0].should.have.deep.property('works');
      res.body.months[0].weeks[0].sessions[0].works.should.be.a('array');
      res.body.months[0].weeks[0].sessions[0].works.length.should.be.equal(requestTemplate.months[0].weeks[0].sessions[0].works.length);
      res.body.should.have.deep.property('isPublished');
      res.body.isPublished.should.equal(false);      
      res.body.should.have.deep.property('createdBy');
      res.body.createdBy.should.equal(user._id.toHexString());
    });

    it('should create a new Plan with valid auth Coach and valid request, with no detail of months.', async () => {
      requestTemplate.months = [];
      const res = await executor();

      res.should.have.status(HttpStatus.CREATED);
      res.body.should.have.deep.property('_id');
      res.body.should.have.deep.property('name');
      res.body.name.should.equal(requestTemplate.name.toUpperCase().trim());
      res.body.goals.should.be.a('array');
      res.body.goals.length.should.be.equal(requestTemplate.goals.length);
      res.body.should.have.deep.property('startDate');
      expect(res.body.startDate).to.contain(moment(requestTemplate.startDate).format('YYYY-MM-DD').toString());
      res.body.should.have.deep.property('endDate');
      expect(res.body.endDate).to.contain(moment(requestTemplate.endDate).format('YYYY-MM-DD').toString());
      res.body.should.have.deep.property('isActive');
      res.body.isActive.should.equal(true);
      res.body.should.have.deep.property('weekFrequency');
      res.body.weekFrequency.should.equal(requestTemplate.weekFrequency);
      res.body.should.have.property('trainee');
      res.body.trainee.should.equal(trainee._id.toHexString());
      res.body.should.have.property('months');
      res.body.months.should.be.a('array');
      res.body.months.length.should.equal(requestTemplate.months.length);  
      res.body.should.have.deep.property('isPublished');
      res.body.isPublished.should.equal(false);      
      res.body.should.have.deep.property('createdBy');
      res.body.createdBy.should.equal(user._id.toHexString());
    });

    it('should not create a new Plan with valid auth Admin (only) and valid request', async () => {
      userData.email = 'admin@testertmp.com';
      userData.roles = ['ADMIN'];
      const adminUser = new User(userData);
      await adminUser.save();
      token = `JWT ${adminUser.buildToken()}`;

      const res = await executor();
      res.should.have.status(HttpStatus.FORBIDDEN);
    });

    it('should not create a new Plan with valid auth and deactivated trainee', async () => {
      await User.findByIdAndUpdate(trainee.user._id, { isArchived: true });

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);

      await User.findByIdAndUpdate(trainee.user._id, { isArchived: false });
    });

    it('should not create a new Plan with valid auth and non existing trainee', async () => {
      requestTemplate.traineeID = mongoose.Types.ObjectId().toHexString();

      const res = await executor();

      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not create a new Plan with valid auth and a non existing stage type', async () => {
      requestTemplate.months[0].stageID = mongoose.Types.ObjectId().toHexString();

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not create a new Plan with valid auth and invalid stage type', async () => {
      requestTemplate.months[0].stageID = 'test ID';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not create a new Plan with valid auth and a non existing period type', async () => {
      requestTemplate.months[0].periodTypeID = mongoose.Types.ObjectId().toHexString();

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not create a new Plan with valid auth and invalid period type ID', async () => {
      requestTemplate.months[0].periodTypeID = 'test ID';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not create a new Plan with valid auth and invalid activity', async () => {
      requestTemplate.months[0].weeks[0].sessions[0].works[0].activityID = 'some id';
      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not create a new Plan with valid auth and invalid request sessions data (e.g.: Invalid start date, greater than end date)', async () => {
      requestTemplate.startDate = moment().add(12, 'months').format('MM-DD-YYYY').toString();

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not create a new Plan with valid auth but not coach token', async () => {
      userData.email = 'customertest@testertmp.com';
      userData.roles = ['CUSTOMER'];
      const customerUser = new User(userData);
      await customerUser.save();
      token = `JWT ${customerUser.buildToken()}`;
      const res = await executor();
      res.should.have.status(HttpStatus.FORBIDDEN);
    });

    it('should not create a new Plan for invalid auth token', async () => {
      token = 'JWT ';

      const res = await executor();

      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });

    it('should not create a new Plan for empty request', async () => {
      requestTemplate = '';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
  });

  context('/plans/:id PATCH', () => {
    const expect = chai.expect;
    let token;
    let requestTemplate;
    let planID;
    let savedPlan;
    
    beforeEach(async () => {
      token = `JWT ${user.buildToken()}`;
      requestTemplate = buildRequest(legacyStages, legacyPeriodTypes, legacyActivities, trainee);

      savedPlan = new Plan(requestTemplate);
      savedPlan.createdBy = user._id;
      savedPlan.trainee = trainee._id;
      await savedPlan.save();
      planID = savedPlan._id;
    });

    afterEach(async () => {
      await User.deleteMany({ email: { $regex: '.*@testertmp.*' } });
      await Plan.deleteMany({});
    });

    const executor = () => chai.request(app).patch(url + planID)
      .set('Authorization', token)
      .send(requestTemplate);

    it('should update with valid auth coach/admin token, and a request to add a new month with no works', async () => {
      const newMonth = requestTemplate.months[0];
      newMonth.order = 2;
      newMonth.goals = [];
      newMonth.weeks[0].sessions[0].works = [];
      newMonth.weeks.push({
        order: 2,
        goals: [],
        sessions: [
          { order: 1,
            works: [],
          },
          { order: 2,
            works: [],
          },
          { order: 3,
            works: [],
          },
        ],
      });
      requestTemplate.months.push(newMonth);
      const res = await executor();
      
      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('_id');
      res.body.should.have.deep.property('name');
      res.body.name.should.equal(requestTemplate.name.toUpperCase().trim());
      res.body.should.have.deep.property('goals');
      res.body.goals.should.be.a('array');
      res.body.should.have.deep.property('startDate');
      res.body.should.have.deep.property('endDate');
      res.body.should.have.deep.property('isActive');
      res.body.isActive.should.equal(true);
      res.body.should.have.deep.property('weekFrequency');
      res.body.should.have.property('trainee');
      res.body.trainee.should.equal(trainee._id.toHexString());
      res.body.should.have.property('months');
      res.body.months.should.be.a('array');
      res.body.months.length.should.equal(2);
      res.body.months[1].should.have.deep.property('weeks');
      res.body.months[1].weeks.should.be.a('array');
      res.body.months[1].weeks.length.should.equal(newMonth.weeks.length);
      res.body.months[1].weeks[1].should.have.deep.property('sessions');
      res.body.months[1].weeks[1].sessions.should.be.a('array');
      res.body.months[1].weeks[1].sessions.length.should.equal(newMonth.weeks[1].sessions.length);
      res.body.should.have.deep.property('isPublished');
      res.body.isPublished.should.equal(false);      
      res.body.should.have.deep.property('createdBy');
      res.body.should.have.deep.property('lastUpdatedBy');
      res.body.lastUpdatedBy.should.equal(user._id.toHexString());
    });

    it('should update with valid auth coach/admin token, and a request to change only the name', async () => {
      requestTemplate = _.pick(requestTemplate, 'name');
      requestTemplate.name = 'THIS other';

      userData.email = 'anotherCoachtest@testertmp.com';
      userData.roles = ['COACH'];
      const coachUser = new User(userData);
      await coachUser.save();
      token = `JWT ${coachUser.buildToken()}`;
      const res = await executor();

      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('_id');
      res.body.should.have.deep.property('name');
      res.body.name.should.equal(requestTemplate.name.toUpperCase().trim());
      res.body.should.have.deep.property('goals');
      res.body.goals.should.be.a('array');
      res.body.should.have.deep.property('startDate');
      res.body.should.have.deep.property('endDate');
      res.body.should.have.deep.property('isActive');
      res.body.isActive.should.equal(true);
      res.body.should.have.deep.property('weekFrequency');
      res.body.should.have.property('trainee');
      res.body.trainee.should.equal(trainee._id.toHexString());
      res.body.should.have.property('months');
      res.body.months.should.be.a('array');
      res.body.should.have.deep.property('isPublished');
      res.body.isPublished.should.equal(false);      
      res.body.should.have.deep.property('createdBy');
      res.body.should.have.deep.property('lastUpdatedBy');
      res.body.lastUpdatedBy.should.equal(coachUser._id.toHexString());
    });
    
    it('should not update with valid auth coach/admin token but not valid end date, in comparison the original document.', async () => {
      delete requestTemplate.startDate;
      requestTemplate.endDate = moment().subtract(2, 'days').format('MM-DD-YYYY').toString();
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
      
    it('should not update with valid auth coach/admin token but non existing plan ID', async () => {
      planID = mongoose.Types.ObjectId();
      const res = await executor();
      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not update with valid auth coach token and valid plan ID, but not existing Stage ', async () => {
      requestTemplate = _.pick(requestTemplate, ['months']);
      requestTemplate.months[0].stageID = mongoose.Types.ObjectId();
      
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not update with valid auth token but not valid request body (eg.: not valid name, and  invalid endDate)', async () => {
      delete requestTemplate.startDate;
      requestTemplate.name = '';
      requestTemplate.endDate = 'March';
  
      const res = await executor();
  
      res.should.have.status(HttpStatus.BAD_REQUEST);
      res.body.should.have.deep.property('errors');
      res.body.errors.should.be.a('array');
      res.body.errors.length.should.be.equal(2);
    });

    it('should not complete update action for valid auth token, but is not coach', async () => {
      userData.email = 'customertest@testertmp.com';
      userData.roles = ['CUSTOMER'];
      const customerUser = new User(userData);
      await customerUser.save();
      token = `JWT ${customerUser.buildToken()}`;
      const res = await executor();
      res.should.have.status(HttpStatus.FORBIDDEN);
    });
  
    it('should not complete update action for invalid auth token', async () => {
      token = 'JWT ';
    
      const res = await executor();
    
      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });
  
    it('should not complete update action for invalid plan ID', async () => {
      planID = 'test';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
  
    it('should not complete update action for invalid request', async () => {
      planID = '';
      requestTemplate = '';
  
      const res = await executor();
  
      res.should.have.status(HttpStatus.NOT_FOUND);
    });
  });

  context('/plans/:id DELETE', () => {
    let token;
    let requestTemplate;
    let planID;
    let savedPlan;
    
    beforeEach(async () => {
      token = `JWT ${user.buildToken()}`;
      requestTemplate = buildRequest(legacyStages, legacyPeriodTypes, legacyActivities, trainee);

      savedPlan = new Plan(requestTemplate);
      savedPlan.createdBy = user._id;
      savedPlan.trainee = trainee._id;
      await savedPlan.save();
      planID = savedPlan._id;
    });

    afterEach(async () => {
      await User.deleteMany({ email: { $regex: '.*@testertmp.*' } });
      await Plan.deleteMany({});
    });

    const executor = () => chai.request(app).delete(url + planID)
      .set('Authorization', token)
      .send();

    it('should delete plan (document in DB ) for a valid auth admin/coach token', async () => {
      const res = await executor();
      
      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('_id');
      res.body._id.should.equal(planID.toHexString());
    });

    it('should not delete a non existing plan', async () => {
      planID = mongoose.Types.ObjectId();
      
      const res = await executor();
      
      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not complete delete action for a valid auth customer token', async () => {
      userData.email = 'customertest@testertmp.com';
      userData.roles = ['CUSTOMER'];
      const customerUser = new User(userData);
      await customerUser.save();
      token = `JWT ${customerUser.buildToken()}`;
  
      const res = await executor();
  
      res.should.have.status(HttpStatus.FORBIDDEN);
    });
      
    it('should not complete delete action for invalid auth token', async () => {
      token = 'JWT SOME34';
      const res = await executor();
      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });
    
    it('should not complete delete action for invalid plan ID', async () => {
      planID = 'BAD_ID';
  
      const res = await executor();
  
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
    
    it('should not complete delete action for invalid request', async () => {
      planID = '';
  
      const res = await executor();
  
      res.should.have.status(HttpStatus.NOT_FOUND);
    });
  });

  context('/plans/:id GET', () => {
    let token;
    let planData;
    let planID;
    let savedPlan;

    beforeEach(async () => {
      token = `JWT ${user.buildToken()}`;
      planData = buildRequest(legacyStages, legacyPeriodTypes, legacyActivities, trainee);

      savedPlan = new Plan(planData);
      savedPlan.createdBy = user._id;
      savedPlan.trainee = trainee._id;
      await savedPlan.save();
      planID = savedPlan._id;
    });

    afterEach(async () => {
      await User.deleteMany({ email: { $regex: '.*@testertmp.*' } });
      await Plan.deleteMany({});
    });
    
    const executor = () => chai.request(app).get(url + planID)
      .set('Authorization', token)
      .send();

    it('should get the plan data for a valid request and valid auth token', async () => {
      const res = await executor();
      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('_id');
      res.body._id.should.equal(planID.toHexString());
      res.body.should.have.deep.property('name');
      res.body.name.should.equal(savedPlan.name);
      res.body.should.have.deep.property('goals');
      res.body.should.have.deep.property('createdBy');
    });

    it('should not get any plan for valid but not existing activity ID', async () => {
      planID = mongoose.Types.ObjectId();
  
      const res = await executor();
  
      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not get any plan for invalid auth token', async () => {
      token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const res = await executor();
      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });

    it('should not get any plan for invalid plan ID', async () => {
      planID = 'BAD_ID';
  
      const res = await executor();
  
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
  });

  context('/plans/mine/current GET', () => {
    let token;
    let planData;
    let planID;
    let savedPlan;

    beforeEach(async () => {
      token = `JWT ${user.buildToken()}`;
      planData = buildRequest(legacyStages, legacyPeriodTypes, legacyActivities, trainee);

      savedPlan = new Plan(planData);
      savedPlan.createdBy = user._id;
      savedPlan.trainee = trainee._id;
      await savedPlan.save();
      planID = savedPlan._id;
    });

    afterEach(async () => {
      await User.deleteMany({ email: { $regex: '.*@testertmp.*' } });
      await Plan.deleteMany({});
    });
    
    const executor = () => chai.request(app).get(`${url}mine/current`)
      .set('Authorization', token)
      .send();

    it('should get the current plan fof the user with valid auth token', async () => {
      const traineeUser = await User.findById(trainee.user._id);
      token = `JWT ${traineeUser.buildToken()}`;
      await Plan.findByIdAndUpdate(savedPlan._id, { isPublished: true });

      const res = await executor();

      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('_id');
      res.body._id.should.equal(planID.toHexString());
      res.body.should.have.deep.property('name');
      res.body.name.should.equal(savedPlan.name);
      res.body.should.have.deep.property('goals');
      res.body.should.have.deep.property('createdBy');
      res.body.should.have.deep.property('isPublished');
      res.body.isPublished.should.be.deep.equal(true);
    });

    it('should not get any plan for valid auth token but no active plan', async () => {
      userData.email = 'customertest@testertmp.com';
      userData.roles = ['CUSTOMER'];
      const customerUser = new User(userData);
      await customerUser.save();
      token = `JWT ${customerUser.buildToken()}`;
      traineeData.user = customerUser._id;
      const newTrainee = new Trainee(traineeData);
      await newTrainee.save();
  
      const res = await executor();
  
      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not get any plan for valid auth token but no trainee profile', async () => {
      const res = await executor();
  
      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not get the current plan for invalid auth token', async () => {
      token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const res = await executor();
      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });
  });
});

function buildRequest(stageList, periodTypeList, activityList, trainee) {
  return {
    name: 'plan A 2019',
    goals: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat venenatis nulla, eget ultricies orci pretium eu. Maecenas venenatis vulputate pulvinar. Nulla ac arcu blandit, sollicitudin orci sit amet, consectetur velit.',
      'Interdum et malesuada fames ac ante ipsum primis in faucibus.'],
    startDate: moment().format('MM-DD-YYYY').toString(),
    endDate: moment().add(4, 'months').format('MM-DD-YYYY').toString(),
    weekFrequency: 3,
    traineeID: trainee._id.toHexString(),
    months: [
      {
        order: 1,
        goals: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat venenatis nulla, eget ultricies orci pretium eu. Maecenas venenatis vulputate pulvinar. Nulla ac arcu blandit, sollicitudin orci sit amet, consectetur velit.'],
        periodTypeID: periodTypeList[Math.floor(Math.random() * periodTypeList.length)].toHexString(),
        stageID: stageList[Math.floor(Math.random() * stageList.length)].toHexString(),
        weeks: [
          {
            order: 1,
            goals: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat venenatis nulla, eget ultricies orci pretium eu. Maecenas venenatis vulputate pulvinar.', 
              ' Nulla ac arcu blandit, sollicitudin orci sit amet, consectetur velit.'],
            sessions: [
              {
                order: 1,
                goals: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam volutpat venenatis nulla, eget ultricies orci pretium eu.', 
                  'Nulla ac arcu blandit, sollicitudin orci sit amet, consectetur velit.',
                  'Maecenas venenatis vulputate pulvinar.'],
                works: [{
                  order: 1,
                  series: 3,
                  reps: 12,
                  minWeight: 5,
                  maxWeight: 10,
                  restTimePerSerieSec: 30,
                  estimatedTimeSec: 120,
                  activityID: activityList[Math.floor(Math.random() * activityList.length)],
                },
                {
                  order: 2,
                  estimatedTimeSec: 60,
                  activityID: activityList[Math.floor(Math.random() * activityList.length)],
                },
                {
                  order: 3,
                  estimatedTimeSec: 180,
                  activityID: activityList[Math.floor(Math.random() * activityList.length)],
                },
                {
                  order: 4,
                  series: 1,
                  reps: 12,
                  minWeight: 5,
                  maxWeight: 10,
                  estimatedTimeSec: 120,
                  activityID: activityList[Math.floor(Math.random() * activityList.length)],
                },
                {
                  order: 5,
                  estimatedTimeSec: 60,
                  activityID: activityList[Math.floor(Math.random() * activityList.length)],
                },
                {
                  order: 3,
                  estimatedTimeSec: 180,
                  activityID: activityList[Math.floor(Math.random() * activityList.length)],
                },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
