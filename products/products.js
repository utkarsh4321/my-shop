const express = require('express');
const routes = express.Router();
// const mongoose = require('mongoose');
// const productSchemas = require('./product');

const multer = require('multer');
const checkAuth = require('../middleware/check_auth');
const productController = require('../controller/products');
const body = require('body-parser');

let username;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    }
  })
  const fileFilter = (req,file,cb)=>{

if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);
    
    
}else{
    cb(null,false);

}


  }
const uplaod = multer({storage:storage,limits:{
    fileSize:1024*1024*5
},
fileFilter:fileFilter

});




// =========== THIS FOR TO GET THE ALL PRODUCTS LIST ==========
routes.get('/',productController.getAllProducts);
// routes.get('/',(req,res,next)=>{
// productSchemas.find().select('_id name price').exec().then(data=>{


//   res.status(200).json(data)

// }).catch(err=>{
//   console.log(err)
// })


// })



routes.get('/addproducts',checkAuth,(req,res,next)=>{
username = req.cookies.loginUser;
console.log(username);
res.status(200).render('addproduct',{username:username});



})

// =========== THIS IS POSTING THE NEW PRODUCT ==========
routes.post('/',checkAuth,uplaod.single('avatar'),productController.postProduct)



// ======= THIS IS FOR GETTING THE SPECIFIC DATA ========


    routes.get('/:id',productController.getSingleProduct);




// ====== ROUTES FOR UPDATING THE PRODUCTS =======

        routes.patch('/:id',checkAuth,productController.updateProduct);


// ======== ROUTES TO DELETES THE PRODUCTS ========

        routes.delete('/:id',checkAuth,productController.deleteProduct);





module.exports = routes;