import passport from 'passport';
import config from 'config';

import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../modules/users/models/user.model';

const localOpts = {
  usernameField: 'email',
  passReqToCallback: true,
};

export const localStrategy = new LocalStrategy(
  localOpts,
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email }); // check active according to role
      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password) && req.body.socialLoginEnabled !== true) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(null, false);
    }
  }
);

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.get('secretKey'),
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);  
  } catch (error) {
    return done(null, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });

export const authJWT = passport.authenticate('jwt', { session: false });
