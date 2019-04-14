const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/check_auth');
const userController = require('../controller/users');

router.get('/signup',(req,res,next)=>{

res.status(200).render('signup');



})

router.post('/signup',userController.usersSignup);



router.get('/login',(req,res,next)=>{
const token1 = req.cookies.jwtToken,
token2 = req.cookies.loginUSer;

if(token1 !== undefined || token2 !== undefined){
res.clearCookie('jwtToken');
res.clearCookie('loginUser');


}
res.status(200).render('login',{mess:'hihi'});



})
router.post('/login',userController.userLogin);


router.delete("/:userId",checkAuth,userController.deleteAccount);







module.exports = router;