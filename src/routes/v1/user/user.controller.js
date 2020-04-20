import UserModel from './user.model';
import asyncHandler from '../../../middleware/async';

// @desc      Register user
// @route     POST /v1/user/register
// @access    Public
export const registerUser = asyncHandler(async (ctx) => {
  let user;
  const { username, email, password } = ctx.request.body;
  user = await UserModel.findOne({ email });
  if (user) {
    ctx.throw(400, 'user with same credentials already exists');
  }
  user = await UserModel.findOne({ username });
  if (user) {
    ctx.throw(400, 'UserName already exists');
  }
  await UserModel.create({
    username,
    email,
    password,
  });
  ctx.status = 201;
  ctx.body = { success: true, status: 'user Successfully Registered' };
});


// @desc      Login user
// @route     POST /v1/user/login
// @access    Public
export const loginUser = asyncHandler(async(ctx) => {
  const { email, password } = ctx.request.body;
  // Validate emil & password
  if (!email || !password) {
    ctx.throw(400, 'please provide email and password');
  }
  // Check for user in database
  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    ctx.throw(400, 'Invalid credentials');
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    ctx.throw(400, 'Invalid credentials');
  }
  const userById = await UserModel.findById(user.id);
  // Create token
  const token = user.getJwtToken();
  ctx.status = 200;
  ctx.body = { success: true, user: userById, token };
  return null;
});


// @route     POST /v1/user/getUser/:id
// @access    Private
export const getUser = asyncHandler(async(ctx) => {
  const user = await UserModel.findById(ctx.user.id);
  ctx.body = { success: true, user };
});
