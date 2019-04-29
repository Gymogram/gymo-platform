import moongose, { Schema } from 'mongoose';

const PhysicalDetailSchema = new Schema({
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  hasHeartDiseases: {
    type: Boolean,
    required: true,

  },
  heartDiseasesDetail: {
    type: String,
    trim: true,
    required: () => this.hasHeartDiseases,
  },
  hasRespiratoryDiseases: {
    type: Boolean,
    required: true,
  },
  respiratoryDiseasesDetail: {
    type: String,
    trim: true,
    required: () => this.hasRespiratoryDiseases, // TODO: ARROW function doesnt have access to "this"
  },
  hasMotorDifficulties: {
    type: Boolean,
    required: true,
  },
  motorDifficultiesDetail: {
    type: String,
    trim: true,
    required: () => this.hasMotorDifficulties,
  },
  hasInjuries: {
    type: Boolean,
    required: true,
  },
  injuriesDetail: {
    type: String,
    trim: true,
    required: () => this.hasInjuries,
  },
  smokeFrecuency: {
    type: String,
    enum: ['N', 'O', 'F'], // N: No, O: Ocasional, F: Frequently
    default: 'N',
  },
  drinkFrequency: {
    type: String,
    enum: ['N', 'O', 'F'], // N: No, O: Ocasional, F: Frequently
    default: 'N',
  },
  hasMedications: {
    type: Boolean,
    required: true,
  },
  medicationsDetails: {
    type: String,
    trim: true,
    required: () => this.hasMedications,
  },
  trainee: {
    type: Schema.Types.ObjectId,
    ref: 'Trainee',
    unique: true,
    required: true,
  },

});

PhysicalDetailSchema.statics = {
  createPhysicalDetail(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
};

export default moongose.model('PhysicalDetail', PhysicalDetailSchema);
