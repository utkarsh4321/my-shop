const orderSchema = require('../orders/order');
const productSchemas = require('../products/product');
const mongoose = require('mongoose');
const body = require('body-parser');
const urlPareser = body.urlencoded({extended:false});
let username;



exports.getAllProducts = (req,res,next)=>{
    username = req.cookies.loginUser;
    productSchemas.find().select('name price _id productImage').exec().then(data=>{
    
    

    
    res.status(200).render('home',{products:data,title:"products",username:username});
    
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })



}
exports.postProduct = (req,res,next)=>{

    const product = new productSchemas({

        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
        
        
        });
    
        product.save().then(data=>{
            res.status(200).redirect('/products');
        
        
        
        
        
        
        
        
        }).catch(err=>
            {
        
        res.status(500).json(err);
        
            }
            );


}
exports.getSingleProduct = (req,res,next)=>{
    const id = req.params.id;
    

    productSchemas.findById(id).select("name price _id").exec().then(data=>{
    
        console.log(data);

        if(data){
    
            
            res.status(200).render('indiproducts',{indi:data,title:"Single product",username:username});
    
    
        }
    }).catch(err=>{
    
        console.log(err);
        res.status(500).json(err)
    })
    




}
exports.updateProduct =(req,res,next)=>{
    const id = req.params.id;
   console.log(req.body);
    const oop = {

name:req.body.name,
price:req.body.price

    }
    

    
    productSchemas.findByIdAndUpdate(id,{$set:oop}).exec().then(data=>{
    res.status(200).json({
        message:"Product is updated",
        request:{
            type:"GET",
            url:"http://localhost:3000/products/" + data._id
    
        }
    });
    
    }).catch(err=>{
    res.status(500).json(err)
    
    })



}
exports.deleteProduct = (req,res,next)=>{
    const id = req.params.id;
    
    productSchemas.findByIdAndRemove(id).then(data=>{
        res.status(200).json(data);
    
    
    
    }).catch(err=>{
    res.status(500).json(err);
    
    })

}