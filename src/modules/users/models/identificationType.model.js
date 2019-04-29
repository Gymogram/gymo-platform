import moongose, {Schema} from 'mongoose';

const IdentificationTypeSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

IdentificationTypeSchema.statics = {
  initialize() {
    this.countDocuments({}, (err, count) => {
      if (count <= 0) {
        console.log('No IdentificationType`s predefined collections' +
         'were found. Reading file...');
        const data = require('../../../config/data/identification_types.json');
        data.forEach((element) => {
          this.create(element);
        });
      }
    });
  },
};

export default moongose.model('IdentificationType', IdentificationTypeSchema);
