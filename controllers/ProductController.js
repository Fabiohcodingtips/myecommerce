const mongoose = require('mongoose');
const express = require('express');
const Product = require ('../models/ProductModel');


const createProduct = async(req,res)=>{
    try{
        const {name,quantity,price,description,image} = req.body;

        const existingProduct = await Product.findOne({name});

        if(existingProduct){
            console.log('Product already exists');
            res.status(400).json({error:"Product already exists"});

        }else{
            const newProduct = await Product.create({
                name,
                quantity,
                price,
                description,
                image

            });
            res.status(201).json(newProduct);
            console.log("Product already created",newProduct);
        }
    }catch(error){
        console.log('Error in creating new product');
        res.status(500).json({error:error.message});

    }
}


// get products
const getProduct = async(req,res)=>{
    try{
        const product = await Product.find()
        console.log("product found");
        res.status(200).json(product)
    }catch(error){
      console.log("error fetching product",error)  
      res.status(500).json({error:error.message});
    }
}
const findProduct = async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!user){
            console.log("error in fetcing product");
            res.status(200).json({erroe:"product not found"});
        }else{
        console.log("product found");
        res.status(200).json(user)
        }
    }catch(error){
      console.log("error in fetching product",error)  
      res.status(500).json({error:error.message});
    }
}
const updateProduct = async(req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body);
        if(!product){
            console.log("error in updating product");
            res.status(200).json({error:`product ${name} not updated`});
        }else{
        console.log("product updated successfully");
        res.status(200).json(product)
        // const updatedUser = await user.findById(id);
        }
    }catch(error){
      console.log("error in fetching product",error)  
      res.status(500).json({error:error.message});
    }
}
const deleteProduct = async(req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id,req.body);
        if(!user){
            console.log("error in deleting product");
            res.status(200).json({error:`product ${name} not deleted`});
        }else{
        console.log("product deleted ");
        res.status(200).json(user)
        }
    }catch(error){
      console.log("error in deletion",error)  
      res.status(500).json({error:error.message});
    }
}


module.exports = {
    createProduct,
    getProduct,
    findProduct,
    updateProduct,
    deleteProduct 
}


