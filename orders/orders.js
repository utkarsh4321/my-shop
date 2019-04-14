const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check_auth');
const orderContoller = require('../controller/orders');
const username = require('../usert');
router.get('/',checkAuth,orderContoller.getAllOrders);
router.get('/addorders',checkAuth,(req,res,next)=>{
res.status(200).render('addorders',{username:username});


})
router.post('/:product',checkAuth,orderContoller.create_order);


router.get('/:orderId',checkAuth,orderContoller.getSingleOrders);
        router.delete('/:orderId',checkAuth,orderContoller.deleteOrders);

    module.exports = router;