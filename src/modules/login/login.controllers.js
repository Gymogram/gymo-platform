import HttpStatus from 'http-status';
import _ from 'lodash';
import User from './../users/models/user.model';



export async function login(req, res) {
    try {
      if (req.body.socialLoginEnabled && req.body.socialLoginEnabled === true) { 
        // TODO: Improve not to update every time social login, only if there changes.
        await User.findByIdAndUpdate(
          req.user._id,
          {
            socialLoginEnabled: true,
            urlProfilePhoto: req.body.urlProfilePhoto,
            phone: req.body.phone,
            displayName: req.body.displayName,
            isActivated: true,
          }, 
          { new: true });
      } else if (!req.user.isActivated) {
        await User.findByIdAndUpdate(
          req.user._id,
          {
            isActivated: true,
          }, 
          { new: true });
      }
  
      const token = `JWT ${req.user.buildToken()}`;
      return res.header('x-auth-token', token).status(HttpStatus.OK).json(req.user.toAuthJSON());
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
}