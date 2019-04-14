const mongoose = require('mongoose');
const userSchema = require('../user/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.usersSignup = (req,res,next)=>{

    if(req.body.email !== '' && req.body.password !== ''){

        console.log(req.body.email,req.body.password)
        // res.redirect('/user/login');
        bcrypt.hash(req.body.password,10,(err,hash)=>{
        userSchema.find({email:req.body.email}).exec().then(user=>{
        
        if(user.length > 1){
        console.log(user);
        return res.status(409).render('signup',{
        
        message:'User already exist with this email id',color:'red',
        display:true
        
        
        })
        
        
        }else{
        
        
            if(err){
        console.log(err);
                res.status(500).render('signup',{
            message:"check your connection",
            color:"red",
            display:true
                });
                
                }else{
                    const user = new userSchema({
                        _id:new mongoose.Types.ObjectId(),
                        username:req.body.username,
                        email:req.body.email,
                        password:hash
                    });
                    user.save().then(data=>{
                        console.log(data);
                res.status(201).render('signup',{
                message:"Account created please login",color:'green',
                display:true
                
                });
    
                
                
                    }).catch(err=>{
                
                console.log(err);
                // res.status(500).render({
                //     message:"Something went wrong",
                //     color:"red",
                //     display:true
                // })
                
                    })
                }
        
        
        
        
        
        
        }
        
        
        
        });
        
        
        
        
        
        
        
        
        });













    }
  





}

exports.userLogin = (req,res,next)=>{
console.log(req.body.email,req.body.password)
if(req.body.email !== '' && req.body.password !== ''){
    
    userSchema.find({email:req.body.email}).exec().then(users=>{

        if(users.length < 1){
        return res.status(401).render('login',{
            message:'Auth failed',
            color:'red'
        })
        
        
        }
        bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
        if(err){
        return res.status(401).render('login',{
        message:"Auth failed",
        color:'red'
        
        })
        
        }
        if(result){
        console.log(process.env.JWT_KEY)
        const token = jwt.sign({email:users[0].email,userId:users[0]._id},process.env.JWT_KEY,{
            expiresIn:"1h"
        });
        const cookies = req.cookies.jwtToken;
        if(!cookies){
            res.cookie('jwtToken', token);


        }

        let username = req.cookies.loginUser;
if(username === undefined){
    res.cookie('loginUser',users[0].username,{maxAge:3600000});
   

}


    

        return res.status(200).render('dash',{
        
        
        
        username:users[0].username
        
        
        });
        
        
        }else{
            res.status(401).render('login',{
                message:"Please fill valid email and password"
            })
        }
        
        
        
        })
        
        }).catch(err=>{
            res.status(500).json({
                message:'Somthing went wrong',
                error:err
            })
        })



}







}


exports.deleteAccount = (req,res,next)=>{
    userSchema.findByIdAndRemove(req.params.userId).exec().then(data=>{

        res.status(200).json({
            message:"User deleted",
            user:{
        
        email:data.email
        
            }
        })
        
        
        }).catch(err=>{
        res.status(500).json({
        
        message:"user does not exist of this name",
        error:err
        
        })
        })

    
}