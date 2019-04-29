import morgan from 'morgan';
import bodyParse from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import error from './error';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

export default app => {
  if (isProd) {
    app.use(helmet());
    app.use(compression());
  }
  app.use(bodyParse.json());
  app.use(bodyParse.urlencoded({ extended: true }));

  if (isDev) {
    app.use(morgan('dev'));
  }
  
  app.use(error);
};
