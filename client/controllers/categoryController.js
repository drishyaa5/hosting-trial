import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify';

export const createCategoryController = async(req,res)=>{
    try{    
        const {name} = req.body
        if(!name){
            return res.status(401).send({
                message: 'Name is Required'
            })
        }
        const existingCategory = await categoryModel.findOne({name})
        if (existingCategory){
            return res.status(200).send({
                success: true,
                message: "Category created"
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "New Categry Created",
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating category"
        })
    }
}


//update category controller
export const updateCategoryController = async(req,res) =>{
    try{
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success: true,
            message: "category updated successfully",
            category,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed while updating",
            error
        })
    }
}

//get all cat
export const categoryController = async(req,res) =>{
    try{
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All category list",
            category,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories"
        })
    }
}

//single category controller
export const singleCategoryController =async(req,res)=>{
    try{
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message: "Single category fetched",
            category,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single categories"
        })
    }
    
}

//delete cat controller
export const deleteCategoryController = async(req,res)=>{
    try{
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Cat deleted successfully",
            
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category"
        })
    }
    
}