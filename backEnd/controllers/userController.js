const ErrorHander = require("../utils/errorHander");
const catchAsynError = require("../middleware/catchAsyncErrors");
const User = require("../models/user.model");
const sendToken = require("../utils/jwtToken")
//Register a User
exports.registerUser = catchAsynError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is the sample id",
      url: "profile pic url",
    },
  });

  // const token = user.getJWTToken();

  // res.status(201).json({
  //   success: true,
  //   token,
  // });
  return sendToken(user, 2001, res);
});

//Login User

exports.loginUser = catchAsynError(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user given both password and email
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Emial & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid Email or Password", 401));
  }

  const isPasswordMatched = user.comparePassword(password);
  console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid Email or Password", 401));
  }

    sendToken(user,200,res)
});


exports.logout = catchAsynError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly:true
  })
  res.status(200).json({
    success: true,
    message:"Logged Out"
  })
})