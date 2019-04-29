import jwt from 'jsonwebtoken';
import chai from 'chai';
import moongose from 'mongoose';
import config from 'config';
import User from '../../../../../src/modules/users/models/user.model';

const should = chai.should();

describe('User.buildToken', () => {
  it('should return a valid JWT', async () => {
    const data = { _id: new moongose.Types.ObjectId().toHexString(), roles: ['COACH', 'ADMIN'] };
    const testUser = await new User(data);
    const token = testUser.buildToken();
    const decodedToken = jwt.verify(token, config.get('secretKey'));
    decodedToken.should.have.deep.property('roles', data.roles);
    decodedToken.should.have.deep.property('_id', data._id);
  });
});
