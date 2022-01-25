const Product = require("../models/product.model");
const ErrorHander = require("../utils/errorHander");
const catchAsynError = require("../middleware/catchAsyncErrors")

// Get All Products
exports.getAllProducts = catchAsynError(async(req, res) => {
  const products = await Product.find().lean().exec();
  res.status(200).json({
    sucsses: true,
    products,
  });
});

//Get One Product
exports.getoneProduct = catchAsynError(async (req, res,next) => {
  let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found",404))
    }
    product = await Product.findById(req.params.id);

    res.status(200).json({
    sucsses: true,
    product
  });
})

//Create a product ---> Admin
exports.createProduct = catchAsynError(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    sucsses: true,
    product,
  });
});

//Update a product ---> Admin
exports.updateProduct = catchAsynError(async (req, res,next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
        sucsses: true,
        product
    })
});

//Delete a product ---> Admin
exports.deleteProduct = catchAsynError(async (req, res,next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    sucsses: true,
    message:"Product is deleted"
  });
});

