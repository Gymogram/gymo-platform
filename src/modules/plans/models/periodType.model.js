import mongoose, { Schema } from 'mongoose';

const PeriodTypeSchema = new Schema({
    name: {
        type: String,
        min: 1,
        max: 255,
        trim: true,
        required: true
    },
    description: {
        type: String,
        max: 255,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

PeriodTypeSchema.statics = {
    initialize() {
        this.countDocuments({}, (err, count) => {
            if (count <= 0) {
                console.log('No predefined Period Types`s collections were found. Reading file...');
                const data = require('../../../config/data/period_types.json');
                data.forEach(element => {
                    this.create(element);
                });
            }
        });
    }
}

export default mongoose.model('PeriodType', PeriodTypeSchema);