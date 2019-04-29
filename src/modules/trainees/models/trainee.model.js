import moongose, { Schema } from 'mongoose';
import _ from 'lodash';

const TraineeSchema = new Schema({
  emergencyContactName: {
    type: String,
    required: [true, 'Emergency contact name is required'],
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  emergencyContactPhone: {
    type: String,
    required: [true, 'Emergency contact phone is required'],
    trim: true,
    minlength: 8,
    maxlength: 50,
  },
  lastStartDate: {
    type: Date,
    required: [true, 'Last start date is required'],
  },
  lastExitDate: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['M', 'F', 'O'],
    required: [true, 'Gender is required'],
  },
  invitationCode: {
    type: String,
    trim: true,
    minlength: 6,
    maxlength: 6,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },
});

TraineeSchema.pre('save', async function (next) {
  try {
    let ic = null;
    let icValid = false;
    
    do {
      ic = _Trainee.generateInvitationCode();
      
      const customer = await _Trainee.findOne({ invitationCode: ic });
      if (!customer) {
        icValid = true;
      }
    } while (!icValid);

    this.invitationCode = ic;
    return next();
  } catch (error) {
    throw error;
  }
});

TraineeSchema.methods = {
  toJSON() {
    const selectedFields = TraineeSchema.statics.getPublicFields();
    const filteredObj = _.pick(
      this, selectedFields);
    return filteredObj;
  },
};

TraineeSchema.statics = {
  createTrainee(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
  generateInvitationCode() {
    let code = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
      code += alphabet.charAt(Math.floor(Math.random() * alphabet.length)).toUpperCase();
    }
    return code;
  },
  getPublicFields() {
    return ['_id', 'emergencyContactName', 'emergencyContactPhone', 'lastStartDate', 'gender', 'invitationCode', 'user'];
  },
  getUpdatableFields() {
    return ['emergencyContactName', 'emergencyContactPhone', 'lastStartDate', 'gender'];
  },
};

const _Trainee = moongose.model('Trainee', TraineeSchema);

export default moongose.model('Trainee', TraineeSchema);

