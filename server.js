import express from "express";
import colors from "colors";
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import morgan from 'morgan';
import { connect } from "mongoose";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';
//rest object
const app = express();

//configure env
dotenv.config();

//database config
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);



//rest api
app.get('/',(req,res)=>{
    res.send("<h1>This is bello world</h1>")
});

const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT,()=>{
    console.log(`Server is running on mode ${process.env.dev} on port ${PORT}`.bgCyan.white)
})