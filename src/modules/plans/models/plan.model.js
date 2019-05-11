import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';

const PlanSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 255,
    trim: true,
    uppercase: true,
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
    default: true,
  },
  signOffDate: {
    type: Date,
  },
  weekFrequency: {
    type: Number,
    min: 1,
    max: 21,
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
        weeks: new Schema({
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
          sessions: new Schema({
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
              min: 1,
            },
            works: new Schema({
              series: {
                type: Number,
                min: 1,
                max: 100,
              },
              reps: {
                type: Number,
                min: 1,
                max: 100,
              },
              weight: {
                type: Number,
                min: 1,
                max: 1000,
              },
              completionTime: {
                type: Number,
                min: 1,
                // CHECK IF MAX NEEDED
              },
              estimatedTime: {
                type: Number,
                min: 1,
                // CHECK IF MAX NEEDED
              },
              isCompleted: {
                type: Boolean,
                default: false,
              },
              activity: {
                type: Schema.Types.ObjectId,
                ref: 'Activity',
              },
            }),

          }),

        }),
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

}, { timestamps: true });

export default mongoose.model('Plan', PlanSchema);
