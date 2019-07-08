import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';

const PlanSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 255,
    trim: true,
    uppercase: true,
    required: true,
  },
  goals: [{
    type: String,
    minlength: 5,
    maxlength: 500,
    trim: true,
  }],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true, // Turn to false when end or is cancelled explictly
  },
  signOffDate: { // Effective termination day 
    type: Date,
  },
  weekFrequency: {
    type: Number,
    min: 1,
    max: 7,
  },
  trainee: {
    type: Schema.Types.ObjectId,
    ref: 'Trainee',
    required: true,
  },
  months: [{
    type: new Schema(
      {
        order: {
          type: Number,
          min: 1,
          required: true,
        },
        goals: [{
          type: String,
          minlength: 5,
          maxlength: 500,
          trim: true,
        }],
        periodType: {
          type: Schema.Types.ObjectId,
          ref: 'PeriodType',
        },
        stage: {
          type: Schema.Types.ObjectId,
          ref: 'StageType',
        },
        weeks: [new Schema({
          order: {
            type: Number,
            min: 1,
            required: true,
          },
          goals: [{
            type: String,
            minlength: 5,
            maxlength: 500,
            trim: true,
          }],
          sessions: [new Schema({
            order: {
              type: Number,
              min: 1,
              required: true,
            },
            goals: [{
              type: String,
              minlength: 5,
              maxlength: 500,
              trim: true,
            }],
            hasTimer: {
              type: Boolean,
              default: false,
            },
            isCurrent: {
              type: Boolean,
              default: false,
            },
            isSkipped: {
              type: Boolean,
              default: false,
            },
            delayedWeeks: {
              type: Number,
              // min: 1, TODO: review this
              default: 0,
            },
            works: [new Schema({
              order: {
                type: Number,
                min: 1,
                required: true,
              },
              series: {
                type: Number,
                min: 1,
                max: 100,
              },
              reps: {
                type: Number,
                min: 1,
                max: 100,
                required: () => this.series >= 1,
              },
              restTimePerSerieSec: { 
                type: Number,
                min: 5,
                required: () => this.series > 1,
              },
              minWeight: {
                type: Number,
                min: 0.5,
                max: 1000,
              },
              maxWeight: {
                type: Number,
                min: 0.5,
                max: 1000,
              },
              completionTimeSec: {
                type: Number,
                min: 0,
                // CHECK IF MAX NEEDED
              },
              estimatedTimeSec: {
                type: Number,
                min: 0,
                // CHECK IF MAX NEEDED validate WITH BUILDER
              },
              isCompleted: {
                type: Boolean,
                default: false,
              },
              activity: {
                type: Schema.Types.ObjectId,
                ref: 'Activity',
              },
              customNotes: {
                type: String,
                maxlength: 1000,
                trim: true,
              },
            })],

          })],

        })],
      }
    ),
  }],
  isPublished: {
    type: Boolean,
    default: false,
  },
  template: {
    type: Schema.Types.ObjectId,
    ref: 'Template',
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

}, { timestamps: true });

PlanSchema.methods = {
  toJSON() {
    const selectedFields = PlanSchema.statics.getPublicFields();
    selectedFields.push('createdBy');
    selectedFields.push('lastUpdatedBy');
    selectedFields.push('createdAt');
    selectedFields.push('updatedAt');
    selectedFields.push('signOffDate');
    selectedFields.push('_id');
    selectedFields.push('isPublished');
    selectedFields.push('isActive');
    selectedFields.push('template');

    const filteredObj = _.pick(
      this, selectedFields);    
    return filteredObj;
  },
};

PlanSchema.pre('validate', function (next) {
  if (this.startDate > this.endDate) {
    next(new Error('End Date must be greater than Start Date'));
  } else {
    next();
  }
});

PlanSchema.statics = {
  getPublicFields() {
    return ['name', 'goals', 'startDate', 'endDate', 'weekFrequency', 'trainee', 'months'];
  },
};

export default mongoose.model('Plan', PlanSchema);
