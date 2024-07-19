const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs')



const createUser = async(req,res)=>{
    try{
        const {username,email,password,phone} = req.body;
            // find user with same email
        const existingUser = await User.findOne({email});

        if(existingUser){
            console.log("Email already exists");
            res.status(400).json({error:"Email already exists"});
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({
                username,
                email,
                password:hashedPassword,
                phone
            });
            res.status(201).json(newUser);
            console.log('user created successfully',newUser);
        }

    }catch(error){
       console.log('error in creating new user',error);
        res.status(500).json({error:error.message});
    }
}
const getUser = async(req,res)=>{
    try{
        const user = await User.find()
        console.log("user found");
        res.status(200).json(user)
    }catch(error){
      console.log("error fetching user",error)  
      res.status(500).json({error:error.message});
    }
}
const Login = async(req, res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            console.log("User not found");
            return res.status(404).json({error:error.message});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            console.log("Invalid credentials");
            return res.status(400).json({error:error.message});
        }
        else{
            res.json({message:"Logged in successfully",user})
        }
    }catch(error){
        return res.status(500).json({error:error.message});
        console.log('User not found',err)

    }
}
const findUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            console.log("error in fetcing user");
            res.status(200).json({erroe:"user not found"});
        }else{
        console.log("user found");
        res.status(200).json(user)
        }
    }catch(error){
      console.log("error in fetching user",error)  
      res.status(500).json({error:error.message});
    }
}
const updateUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body);
        if(!user){
            console.log("error in updating user");
            res.status(200).json({error:`user ${name} not updated`});
        }else{
        console.log("user updated successfully");
        res.status(200).json(user)
        // const updatedUser = await user.findById(id);
        }
    }catch(error){
      console.log("error in fetching user",error)  
      res.status(500).json({error:error.message});
    }
}
const deleteUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id,req.body);
        if(!user){
            console.log("error in deleting user");
            res.status(200).json({error:`user ${name} not deleted`});
        }else{
        console.log("user deleted ");
        res.status(200).json(user)
        }
    }catch(error){
      console.log("error in deletion",error)  
      res.status(500).json({error:error.message});
    }
}

module.exports = {
    createUser,
    findUser,
    updateUser, 
    deleteUser,
    getUser,
    Login
}
