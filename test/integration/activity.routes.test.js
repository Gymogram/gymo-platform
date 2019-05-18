import chaiHttp from 'chai-http';
import chaiSorted from 'chai-sorted';
import chaiThings from 'chai-things';
import chai from 'chai';
import HttpStatus from 'http-status';
import mongoose from 'mongoose';
import config from 'config';
import app from '../../src/index';
import Activity from '../../src/modules/activities/models/activity.model';
import User from '../../src/modules/users/models/user.model';

chai.use(chaiHttp);
chai.use(chaiSorted);
chai.use(chaiThings);

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

  context('/activities/:id DELETE', () => {
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

  context('/activities/:id GET', () => {
    let token;
    let activityData;
    let activityID;
    let savedActivity;

    beforeEach(async () => {
      activityData = {
        name: 'Activity Item',
        description: 'Some brief explanation.',
        recommendations: '04-01-2019',
        activityType: 'RECOVERY',
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

    const executor = () => chai.request(app).get(url + activityID)
      .set('Authorization', token)
      .send();

    it('should get the activity data for a valid request and valid auth token', async () => {
      const res = await executor();
      res.should.have.status(HttpStatus.OK);
      res.body.should.have.deep.property('_id');
      res.body._id.should.equal(activityID.toHexString());
      res.body.should.have.deep.property('name');
      res.body.should.have.deep.property('description');
      res.body.should.have.deep.property('createdBy');
      res.body.should.have.deep.property('media');
    });

    it('should not get any activity for invalid auth token', async () => {
      token = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const res = await executor();
      res.should.have.status(HttpStatus.UNAUTHORIZED);
    });

    it('should not get any activity for valid but not existing activity ID', async () => {
      activityID = mongoose.Types.ObjectId();

      const res = await executor();

      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not get any activity for invalid activity ID', async () => {
      activityID = 'BAD_ID';

      const res = await executor();

      res.should.have.status(HttpStatus.BAD_REQUEST);
    });
  });

  context('/activities/:id GET (filtered)', () => {
    const expect = chai.expect;
    const json = require('./data/activities.json');
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
      await Activity.insertMany(json);
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

    afterEach(async () => {
      await Activity.deleteMany({});
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

    it('should get all the activities for a valid request and valid auth token with the default pagination´s settings.', async () => {
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
      res.body.total.should.equal(json.length);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('description');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('activityType');
      res.body.results[0].should.have.deep.property('recommendations');
      res.body.results[0].should.have.deep.property('media');
    });

    it('should get all the activities for a valid request and valid auth token, paginated with specific page size and page number ', async () => {
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
      res.body.results.length.should.equal(json.length % filterSettings.pageSize);
      res.body.should.have.deep.property('total');
      res.body.total.should.equal(json.length);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('description');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('activityType');
      res.body.results[0].should.have.deep.property('recommendations');
      res.body.results[0].should.have.deep.property('media');
    });

    it('should get all the activities that have specific media Type (e.g.: Video) in descending order by name, for a valid request and valid auth token', async () => {
      attrCriteria = 'mediaType=video';
      filterSettings.sortedBy = 'name';
      filterSettings.order = 'desc';
      buildFilter();
      const expectedElements = json.filter(element => element.media.some(e => e.mediaType === 'VIDEO'));
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
      res.body.total.should.equal(expectedElements.length);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('description');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('activityType');
      res.body.results[0].should.have.deep.property('recommendations');
      res.body.results[0].should.have.deep.property('media');
      res.body.results[0].media.should.include.something.that.have.deep.property('mediaType');
      res.body.results[0].media.should.all.have.property('mediaType', 'VIDEO');
      res.body.results[0].media.should.all.have.deep.property('contentUrl');  
      
      expect(res.body.results).to.be.sortedBy('name', { descending: true });
    });

    it('should get all the activities that match the  provided filter criteria (has media content ) for a valid request and valid auth token', async () => {
      attrCriteria = 'hasAnyMedia=true';
      buildFilter();

      const res = await executor();
      res.should.have.status(HttpStatus.OK);
      res.body.should.be.a('object');
      res.body.should.have.deep.property('page');
      res.body.page.should.deep.equal(0);
      res.body.should.have.deep.property('pageSize');
      res.body.pageSize.should.equal(res.body.results.length);
      res.body.should.have.deep.property('results');
      res.body.results.should.be.a('array');
      res.body.results.length.should.equal(config.get('app.pagination.pageSize'));
      res.body.should.have.deep.property('total');
      res.body.total.should.deep.equal(json.length);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('description');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('activityType');
      res.body.results[0].should.have.deep.property('recommendations');
      res.body.results[0].should.have.deep.property('media');
      res.body.results[0].media.should.all.have.deep.property('mediaType');
      res.body.results[0].media.should.all.have.deep.property('contentUrl');  
      
      expect(res.body.results).to.be.sortedBy('name', { descending: false });
    });

    it('should get all the activities that match the  provided filter criteria (has not any media content ) for a valid request and valid auth token', async () => {
      attrCriteria = 'hasAnyMedia=false';
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
      res.body.results[0].should.have.deep.property('description');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('activityType');
      res.body.results[0].should.have.deep.property('recommendations');
      res.body.results.should.all.have.deep.property('media', []);
      
      expect(res.body.results).to.be.sortedBy('name', { descending: false });
    });

    it('should get all the activities that match the  provided filter criteria (createdBy, activity Type ) for a valid request and valid auth token', async () => {
      filterSettings.pageSize = 10;
      attrCriteria = 'createdBy=5cdce67240c2d671022c6e04&activityType=effort';
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
      res.body.results.length.should.equal(2);
      res.body.should.have.deep.property('total');
      res.body.total.should.equal(2);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('description');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('activityType');
      res.body.results[0].should.have.deep.property('recommendations');
      res.body.results[0].should.have.deep.property('media');
    });

    it('should get all the activities that match the  provided filter criteria (name) for a valid request and valid auth token', async () => {
      attrCriteria = 'name=EXERCITATION';
      const expectedElements = json.filter(element => element.name.toUpperCase().includes('EXERCITATION'));
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
      res.body.results[0].should.have.deep.property('description');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('activityType');
      res.body.results[0].should.have.deep.property('recommendations');
      res.body.results[0].should.have.deep.property('media');
    });

    it('should get all the activities in ascending order by creation Date for a valid request and valid auth token', async () => {
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
      res.body.total.should.equal(json.length);
      res.body.results[0].should.have.deep.property('_id');
      res.body.results[0].should.have.deep.property('name');
      res.body.results[0].should.have.deep.property('description');
      res.body.results[0].should.have.deep.property('createdBy');
      res.body.results[0].should.have.deep.property('activityType');
      res.body.results[0].should.have.deep.property('recommendations');
      res.body.results.should.all.have.deep.property('media');
      
      expect(res.body.results).to.be.sortedBy('createdAt', { descending: false });
    });

    it('should not get any activity for invalid filter criteria (wrong field, e.g: recommendations ) for a valid request and valid auth token', async () => {
      attrCriteria = 'recommendations=Something';
      buildFilter();

      const res = await executor();
      res.should.have.status(HttpStatus.BAD_REQUEST);
    });

    it('should not get any activity valid auth token, when an invalid filter criteria is provided.', async () => {
      attrCriteria = 'mediaType=MOVIE';
      buildFilter();
      const res = await executor();
      res.should.have.status(HttpStatus.NOT_FOUND);
    });

    it('should not get any activity valid auth token, when no document was found.', async () => {
      await Activity.deleteMany({});
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

