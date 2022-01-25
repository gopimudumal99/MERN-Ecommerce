const ErrorHander = require("../utils/errorHander")

module.exports = (err, req, res, next) => { 
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //MongoDB  CastErrors 
    if (err.name == "CastError") { 
        const message = `Resourse not found, Invalid: ${err.path}`
        err = new ErrorHander(message,400)
    }

    res.status(err.statusCode).json({
        success: false,
        error:err.message
    })
}