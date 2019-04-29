import moongose, { Schema } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import config from 'config';
import { hashSync, compareSync, genSaltSync } from 'bcrypt-nodejs';
import { passwordReg } from '../user.validations';

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Firstname is required'],
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  displayName: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  personalID: {
    type: Number,
    required: [true, 'Personal ID is required'],
  },
  identificationType: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: [true, 'Identification type is required'],
    ref: 'IdentificationType',
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
    minlength: 8,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  birthDate: {
    type: Date,
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Address is required'],
    minlength: 5,
    maxlength: 255,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  socialLoginEnabled: {
    type: Boolean,
    default: false,
  },
  instaID: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  fbID: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    maxlength: 50,
    trim: true,
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password',
    },
  },
  roles: {
    type: [{
      type: String,
      enum: ['ADMIN', 'COACH', 'CUSTOMER'],
    }],
    required: true,
  },
  urlProfilePhoto: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const salt = genSaltSync(13);
    this.password = hashSync(this.password, salt);
  }
  return next();
});

UserSchema.methods = {
  toJSON() {
    const selectedFields = UserSchema.statics.getPublicFields();
    const filteredObj = _.pick(
      this, selectedFields);
    return filteredObj;
  },
  toAuthJSON() {
    return {
      _id: this._id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      roles: this.roles,
      urlProfilePhoto: this.urlProfilePhoto,
      displayName: this.displayName,
    };
  },
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  buildToken() {
    return jwt.sign({ _id: this._id, roles: this.roles }, config.get('secretKey'));
  },
};

UserSchema.statics = {
  createUser(args, identificationType) {
    return this.create({
      ...args,
      identificationType,
    });
  },
  getPublicFields() {
    return ['_id', 'firstname', 'lastname', 'personalID', 'identificationType', 'phone', 'email', 'birthDate', 'address', 'instaID', 'fbID', 'roles'];
  },
};

export default moongose.model('User', UserSchema);
