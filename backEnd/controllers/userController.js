const ErrorHander = require("../utils/errorHander");
const catchAsynError = require("../middleware/catchAsyncErrors");
const User = require("../models/user.model")


//Register a User 
exports.registerUser = catchAsynError(async (req, res, next) => { 
    const { name, email, password } = req.body
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "This is the sample id",
        url: "profile pic url",
      },
    });

    res.status(201).json({
        success: true,
        user
    })
})