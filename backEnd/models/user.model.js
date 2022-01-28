const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxlength: [30, "Name cannot exceed 30 cherecters"],
    minlength: [4, "Name should have more than 4 charecters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minlength: [8, "password should be greter than 8 charecters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//hash password
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = bcrypt.hashSync(this.password, 8);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};


//compare Password
userSchema.methods.comparePassword =  function (enterdPassword) { 
    return  bcrypt.compareSync(enterdPassword,this.password)
}


module.exports = mongoose.model("User", userSchema);
