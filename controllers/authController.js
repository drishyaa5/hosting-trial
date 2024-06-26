import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'

import {comparePassword, hashPassword} from '../helpers/authHelpers.js'
import JWT from 'jsonwebtoken';

export const registerController = async(req,res)=>{
    try{
        const {name,email,password,phone,address,answer} = req.body
        //validation
        if(!name){
            return res.send({message: "Name is required"});
        }
        if(!email){
            return res.send({message: "Name is required"});
        }
        if(!password){
            return res.send({message: "Name is required"});
        }
        if(!phone){
            return res.send({message: "Name is required"});
        }
        if(!address){
            return res.send({message: "Name is required"});
        }
        if(!answer){
            return res.send({message: "Answer is required"})
        }

        //checking user
        const existingUser = await userModel.findOne({email})
        //existing user
        if (existingUser){
            res.status(200).send({
                success: true,
                message: "Already registered pease login",
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({name,email,address, phone, answer, password: hashedPassword}).save()

        res.status(201).send({
            success: true,
            message: "User registered Successfully",
            user,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in registration",
            error,
        })
    }
}


export const loginController = async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //checkuser
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            })
        }
        const match =await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: error,
                message: "invalid password"
            })
        }

        //token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,

            },
            token,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in login",
            error,
        })
    }
}

//testController
export const testController =(req,res)=>{
    res.send('Protected Route')
}


//forgot password
export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };


//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };
  

  //orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};