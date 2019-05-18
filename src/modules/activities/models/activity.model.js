import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import _ from 'lodash';

const ActivitySchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 1000,
    trim: true,
  },
  recommendations: {
    type: String,
    maxlength: 1000,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lastUpdatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  activityType: {
    type: String,
    enum: ['RECOVERY', 'EFFORT'],
    required: true,
  },
  media: [{
    type: new Schema({
      mediaType: {
        type: String,
        enum: ['IMAGE', 'VIDEO'],
        required: true,
      },
      contentUrl: {
        type: String,
        required: true,
        trim: true,
        validate: {
          validator(contentUrl) {
            return validator.isURL(contentUrl);
          },
          message: '{VALUE} is not a valid url',
        },
      },
    }),
  }],

}, { timestamps: true });

ActivitySchema.methods = {
  toJSON() {
    const selectedFields = ActivitySchema.statics.getPublicFields();
    selectedFields.push('createdBy');
    selectedFields.push('lastUpdatedBy');
    selectedFields.push('createdAt');
    selectedFields.push('updatedAt');
    selectedFields.push('_id');
    const filteredObj = _.pick(
      this, selectedFields);    
    return filteredObj;
  },
};

ActivitySchema.statics = {
  getPublicFields() {
    return ['name', 'description', 'recommendations', 'activityType', 'media'];
  },
};
export default mongoose.model('Activity', ActivitySchema);
