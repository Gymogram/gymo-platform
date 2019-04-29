import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import _ from 'lodash';

const ActivitySchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        trim: true
    },
    description: {
        type: String,
        maxlength: 500,
        trim: true
    },
    recommendations: {
        type: String,
        maxlength: 500,
        trim: true
    },
    createdBy: {
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
            mediatype: {
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
            }
        }),
    }]

}, { timestamps: true });

export default mongoose.model('Activity', ActivitySchema);