import express from "express";
import { forgotPasswordController, getOrdersController, loginController, registerController, testController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

//routing
//REGISTER || POST
router.post('/register',registerController )

//LOGIN || POST
router.post('/login',loginController)

//test
router.get('/test',requireSignIn,isAdmin, testController)

//protected user route
router.get('/user-auth', requireSignIn, (req, res) =>{
    res.status(200).send({ok:true})
})

//forgot pw || POST
router.post('/forgot-password', forgotPasswordController)


//protected route admin
router.get('/admin-auth', requireSignIn,isAdmin, (req, res) =>{
    res.status(200).send({ok:true})
})

//update
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrdersController)

export default router;