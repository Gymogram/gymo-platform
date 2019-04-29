/* eslint-disable no-console */

import mongoose from 'mongoose';
import config from 'config';
import IdentificationType from './../modules/users/models/identificationType.model';
import StageType from './../modules/plans/models/stageType.model';
import PeriodType  from './../modules/plans/models/periodType.model';


mongoose.Promise = global.Promise;

try {
  mongoose.connect(config.get('db.url'), { useNewUrlParser: true });
} catch (error) {
  mongoose.createConnection(config.get('db.url'));
}

mongoose.connection
  .on('error', e => { console.error.bind(console, 'DB connection error:'); throw e; })
  .once('open', async() => {
    console.log(`DB connected to: ${config.get('db.url')}`);
    await initializeReferenceData();
  });

async function initializeReferenceData() {
  await IdentificationType.initialize();
  await StageType.initialize();
  await PeriodType.initialize();
}
