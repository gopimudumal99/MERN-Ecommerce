const express = require("express");
const router = express.Router()
const { isAuthenticatedUser} = require("../middleware/auth")
const {getAllProducts,getoneProduct,createProduct,updateProduct,deleteProduct} = require('../controllers/productController')

router.route("/products").get(isAuthenticatedUser,getAllProducts);
router.route("/products/new").post(createProduct)
router.route("/products/:id").put(updateProduct).get(getoneProduct).delete(deleteProduct)

module.exports = router;



