
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    console.log("here")
    const { token } = req.cookies;
    if (!token) { 
        return next(new ErrorHander("Please Login to access this resource", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
   req.user =  await User.findById(decodedToken.id)
    next()
})


