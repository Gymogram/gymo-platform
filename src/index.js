/* eslint-disable no-console */
import express from 'express';
import config from 'config';
import constants from './config/constants';
import './config/databases';
import middlewareSetup from './config/middlewares';
import apiRoutes from './modules';

require('express-async-errors');

process.on('uncaughtException', (ex) => {
  console.log(ex); // USE WINSTON
  process.exit(1);
});

process.on('unhandledRejection', (ex) => {
  console.log(ex);
  process.exit(1);
});

if (!config.has('secretKey')) {
  console.error('FATAL ERROR. Gymogram app secret key was not configured. Check documentation');
  process.exit(1);
}

const app = express();

const debug = require('debug')('gymo:startup');

middlewareSetup(app);
apiRoutes(app);

app.get('/', (req, res) => {
  res.send('Gymo API. On going');
});

// eslint-disable-next-line no-unused-vars
app.use('/api', (err, req, res, next) => {
  res.status(err.status).json(err);
});

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    debug(`Server running.\nPort: ${constants.PORT}\nEnvironment: ${process.env.NODE_ENV}`);
    console.log(`Server running.\nPort: ${constants.PORT}\nEnvironment: ${process.env.NODE_ENV}`);
  }
});

export default app;
