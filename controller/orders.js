const orderSchema = require('../orders/order');
const product = require('../products/product');
const mongoose = require('mongoose');
let username;
exports.getAllOrders = (req,res,next)=>{
username = req.cookies.loginUser;
    orderSchema.find().select('_id quantity name price').populate('product','name').exec().then(data=>{
        res.status(200).render('orders',{username:username,orde:data});
    
    }).catch(err=>{
    res.status(500).json({
        message:"No any orders found"
    
    });
    
    })
    



}
exports.create_order = (req,res,next)=>{

const productId = req.params.product;

    product.findById(productId).then((datas)=>{
        if(!datas){
        
        return res.status(404).json({
            message:"Product not found",
        
        })
        
        
        }
            const orders = new orderSchema({
                _id:mongoose.Types.ObjectId(),
                name:datas.name,
                price:datas.price, 
                quantity:req.body.quantity,
                product:productId
                
                
                
                    });
                    return orders.save();
                })
                    .then(data=>{
                        console.log(data)
                        res.redirect('/orders');



                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            message:"SOMEthing went wrong",
                            err:err,
                        })
                    
        
        
        })



}

exports.getSingleOrders = (req,res,next)=>{
username = req.cookies.loginUser;
res.status(200).render('addorders',{product:req.params.orderId,username:username});




}
exports.deleteOrders = (req,res,next)=>{
    const id = req.params.orderId;
    if(id !== undefined){
        orderSchema.findByIdAndRemove(id).select('_id product quantity').exec().then(data=>{
    

res.status(200).json(data);

            }).catch(err=>{
            res.status(500).json({
            
            err:err
            
            
            })
            
            })



    }
    




}