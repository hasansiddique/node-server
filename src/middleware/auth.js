import jwt from 'jsonwebtoken';
import config from '../config';
import asyncHandler from './async';
import UserModel from '../routes/v1/user/user.model';


const Protect = asyncHandler(async (ctx, next) => {
  let token;
  if (ctx.headers.authorization.startsWith('Bearer')) {
    token = ctx.headers.authorization.split(' ')[1];
  }
  try {
    const decoded = jwt.verify(token, config.jwtConfig.JWT_SECRET);
    if (token && decoded.id === ctx.params.id) {
      ctx.user = await UserModel.findById(decoded.id);
      return next();
    }
  } catch (err) {
    ctx.throw(401, 'Not authorized to access this route');
  }
  return null;
});

export default Protect;
