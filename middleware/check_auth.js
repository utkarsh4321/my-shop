const jwt = require('jsonwebtoken');


module.exports = (req,res,next)=>{

try{
    const token = req.cookies.jwtToken;
const decoded = jwt.verify(token,process.env.JWT_KEY);
req.userData = decoded;
console.log('I am passed')
next();


}
catch (error){
    if(console.log(req.body.name) === 'deleteMe'){

return res.status(401).json(error);



    }
    if(req.body.updateOn === 'noUpdate'){


        return res.status(401).json(error);
    }
return res.status(401).render('login',{
    message:"Please login first"
})
}


}