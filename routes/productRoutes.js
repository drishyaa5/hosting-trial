import express from 'express';
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {createProductController,getProductController,getSingleProduct,productPhotoController,deleteProductController,updateProductController, productFiltersController, productCountController, productListController, searchProductController, realtedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//get products
router.get('/get-product',getProductController)

//single product
router.get('/get-product/:slug',getSingleProduct)

//get phoot
router.get("/product-photo/:pid", productPhotoController);

//delete
router.delete('/delete-product/:pid',deleteProductController)

//update
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

//filter products
router.post('/product-filters',productFiltersController)

//product count
router.get('/product-count',productCountController)

//product config
router.get('/product-list:page',productListController)

//search product
router.get("/search/:keyword", searchProductController);

//similar products
router.get('/related-product/:pid/:cid',realtedProductController)

//category wise
router.get('/product-category/:slug',productCategoryController)

//payment
//token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)

export default router;