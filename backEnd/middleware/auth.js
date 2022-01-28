
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("./catchAsyncErrors")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) { 
        return next(new ErrorHander("Please Login to access this resource", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id)
    next()
})

exports.authorizeRoles = (...roles) => { 
    return (req, res, next) => { 
        if (!roles.includes(req.user.role)) { 
            return next(new ErrorHander(`Role:${req.user.role} is not allowed to this resourse`,403));   
        }
        next();
    }
}
