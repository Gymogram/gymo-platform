import chaiHttp from 'chai-http';
import chai from 'chai';
import HttpStatus from 'http-status';
import mongoose from 'mongoose';
import app from '../../src/index';
import Activity from '../../src/modules/activities/models/activity.model';
import User from '../../src/modules/users/models/user.model';

chai.use(chaiHttp);

describe('ACTIVITY endpoint', () => {
  const url = '/api/v1/activities/';
  let userData = {
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
  let user;

  before(async () => {
    user = new User(userData);
    await user.save();
  }); 

  after(async () => {
    await User.deleteMany({});
    delete require.cache[require.resolve('../../src/index')];
  });

  context('/activities POST', () => {
    let token;
    let requestTemplate;
    
    beforeEach(() => {
      requestTemplate = {
        name: 'Activity One',
        description: 'Some brief explanation.',
        recommendations: '04-01-2019',
        activityType: 'EFFORT',
        media: [
          { mediaType: 'IMAGE',
            contentUrl: 'http://www.url.com' },
        ],
        
      };
      userData = {
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
      token = `JWT ${user.buildToken()}`;
    });

    afterEach(async () => {
      await Activity.deleteMany({});
      await User.deleteMany({ email: { $regex: '.*@testertmp.*' } });
    });

    const executor = () => chai.request(app).post(url)
      .set('Authorization', token)
      .send(requestTemplate);

    it('should create a new Activity with valid coach/admin auth token and valid request data', async () => {
      const res = await executor();
      res.should.have.status(HttpStatus.CREATED);
      res.body.should.have.deep.property('_id');
      res.body.should.have.deep.property('name');
      res.body.should.have.deep.property('description');
      res.body.should.have.deep.property('createdBy');
      res.body.createdBy.should.equal(user._id.toHexString());
      res.body.should.have.deep.property('media');
    }); 

    it('should create a new Activity with valid coach/admin auth token and valid request data, but no media data.', async () => {
      requestTemplate.media = [];
      const res = await executor();
      res.should.have.status(HttpStatus.CREATED);
      res.body.should.have.deep.property('_id');
      res.body.should.have.deep.property('name');
      res.body.should.have.deep.property('description');
      res.body.should.have.deep.property('createdBy');
      res.body.createdBy.should.equal(user._id.toHexString());
      res.body.should.have.deep.property('media');
      res.body.media.should.eql([]);
    });

    it('should not create a new Activity with valid coach/admin auth token and invalid request Media url data', async () => {
      requestTemplate.media[0].contentUrl = 'bad url.com';
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    }); 
    it('should not create a new Activity with valid coach/admin auth token and invalid request MediaType data', async () => {
      requestTemplate.media[0].mediaType = 'PICTURE';
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not create a new Activity with valid coach/admin auth token and invalid request data (e.g: No name)', async () => {
      requestTemplate.name = '';
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not create a new Activity with valid auth coach/admin token and invalid request activity type', async () => {
      requestTemplate.activityType = 'UNKNOWN_TYPE';
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not create a new Activity with valid auth but not admin/coach token', async () => {
      userData.email = 'customertest@testertmp.com';
      userData.roles = ['CUSTOMER'];
      const customerUser = new User(userData);
      await customerUser.save();
      token = `JWT ${customerUser.buildToken()}`;
      const res = await executor();
      res.should.have.status(HttpStatus.FORBIDDEN);
    });

    it('should not create a new Activity for invalid auth token', async () => {
      token = 'JWT ';

      const res = await executor();

      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });

    it('should not create a new Activity for empty request', async () => {
      requestTemplate = '';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
  });

  context('/activities/:id PATCH', () => {
    let token;
    let requestTemplate;
    let activityID;
    let savedActivity;
    
    beforeEach(async () => {
      requestTemplate = {
        name: 'Activity Two',
        description: 'Some brief explanation.',
        recommendations: '04-01-2019',
        activityType: 'EFFORT',
        media: [
          { mediaType: 'IMAGE',
            contentUrl: 'http://www.url.com' },
        ],
      };
      userData = {
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
      
      savedActivity = new Activity(requestTemplate);
      savedActivity.createdBy = user._id;
      await savedActivity.save();
      activityID = savedActivity._id;

      token = `JWT ${user.buildToken()}`;
    });

    afterEach(async () => {
      await Activity.deleteMany({});
      await User.deleteMany({ email: { $regex: '.*@testertmp.*' } });
    });

    const executor = () => chai.request(app).patch(url + activityID)
      .set('Authorization', token)
      .send(requestTemplate);
    it('should update with a valid activity ID and valid auth coach/admin token and valid request', async () => {
      requestTemplate.name = 'Activity One';
      requestTemplate.recommendations = '1. Do this. 2. Do the other.';
      requestTemplate.activityType = 'RECOVERY';
      const res = await executor();

      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('_id');
      res.body._id.should.equal(activityID.toHexString());
      res.body.should.have.deep.property('name');
      res.body.name.should.equal(requestTemplate.name);
      res.body.should.have.deep.property('description');
      res.body.should.have.deep.property('recommendations');
      res.body.recommendations.should.equal(requestTemplate.recommendations);
      res.body.should.have.deep.property('createdBy');
      res.body.createdBy.should.equal(savedActivity.createdBy.toHexString());
      res.body.should.have.deep.property('lastUpdatedBy');
      res.body.createdBy.should.equal(user._id.toHexString());
      res.body.should.have.deep.property('media');
    });

    it('should update with a valid activity ID and valid auth coach/admin token and valid request (w/o media data)', async () => {
      requestTemplate.name = 'Activity One';
      requestTemplate.recommendations = '1. Do this. 2. Do the other.';
      requestTemplate.activityType = 'RECOVERY';
      const existingMedia = requestTemplate.media[0];
      delete requestTemplate.media;
      const res = await executor();

      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('_id');
      res.body._id.should.equal(activityID.toHexString());
      res.body.should.have.deep.property('name');
      res.body.name.should.equal(requestTemplate.name);
      res.body.should.have.deep.property('description');
      res.body.should.have.deep.property('recommendations');
      res.body.recommendations.should.equal(requestTemplate.recommendations);
      res.body.should.have.deep.property('createdBy');
      res.body.createdBy.should.equal(savedActivity.createdBy.toHexString());
      res.body.should.have.deep.property('lastUpdatedBy');
      res.body.createdBy.should.equal(user._id.toHexString());
      res.body.should.have.deep.property('media');
      res.body.media[0].mediaType.should.equal(existingMedia.mediaType);
    });

    it('should not update with valid auth coach/admin token and valid activity ID, but not valid media data (e.g.: MediaType)', async () => {
      requestTemplate.media[0].mediaType = 'ANIMATION';
      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
    
    it('should not update with valid auth coach/admin token but non existing activity ID', async () => {
      activityID = mongoose.Types.ObjectId();
      const res = await executor();
      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not update with valid auth token but not valid request body (eg.: not valid name)', async () => {
      requestTemplate.name = 'NN';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
    
    it('should not complete update action for valid auth token, but is not coach/admin', async () => {
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

    it('should not complete update action for invalid activity ID', async () => {
      activityID = 'test';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not complete update action for invalid request', async () => {
      activityID = '';
      requestTemplate = '';
  
      const res = await executor();
  
      res.should.have.status(HttpStatus.NOT_FOUND);
    });
  });

  context('/activities/:id DELETE', async () => {
    let token;
    let activityData;
    let activityID;
    let savedActivity;

    beforeEach(async () => {
      activityData = {
        name: 'Activity Two',
        description: 'Some brief explanation.',
        recommendations: '04-01-2019',
        activityType: 'EFFORT',
        media: [
          { mediaType: 'IMAGE',
            contentUrl: 'http://www.url.com' },
        ],
      };

      userData = {
        password: 'Usto7cn*',
        email: 'test@tester.com',
        firstname: 'Tester',
        lastname: 'Testing',
        personalID: '99999999',
        address: 'House 1 Main street',
        phone: '9999999999999',
        identificationType: mongoose.Types.ObjectId(),
        roles: ['ADMIN'],
      };
      
      savedActivity = new Activity(activityData);
      savedActivity.createdBy = user._id;
      await savedActivity.save();
      activityID = savedActivity._id;

      token = `JWT ${user.buildToken()}`;
    });

    afterEach(async () => {
      await Activity.deleteMany({});
      await User.deleteMany({ email: { $regex: '.*@testertmp.*' } });
    });

    const executor = () => chai.request(app).delete(url + activityID)
      .set('Authorization', token)
      .send();

    it('should delete activity (unavailable) for a valid auth admin/coach token', async () => {
      const res = await executor();
    
      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('_id');
      res.body._id.should.equal(activityID.toHexString());
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
  
    it('should not complete delete action for invalid activity ID', async () => {
      activityID = 'BAD_ID';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not complete delete action for invalid request', async () => {
      activityID = '';

      const res = await executor();

      res.should.have.status(HttpStatus.NOT_FOUND);
    });
  });

  context('/activities/:id (?filters) GET', () => {
    
  });

});

