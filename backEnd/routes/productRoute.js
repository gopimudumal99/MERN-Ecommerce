const express = require("express");
const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {getAllProducts,getoneProduct,createProduct,updateProduct,deleteProduct} = require('../controllers/productController')

router
  .route("/products")
  .get( getAllProducts);
router.route("/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router
  .route("/products/:id")
  .put(isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
  .get(getoneProduct)

module.exports = router;



