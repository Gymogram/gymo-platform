import userRoutes from './users/user.routes';
import planRoutes from './plans/plan.routes';
import loginRoutes from './login/login.routes';
import traineeRoutes from './trainees/trainee.routes';

export default app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/plans', planRoutes);
  app.use('/api/v1/login', loginRoutes);
  app.use('/api/v1/trainees', traineeRoutes);
};
