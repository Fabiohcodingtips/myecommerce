const express = require('express');
const router = express.Router();
router.use(express.json());
const {createProduct} = require('../controller/ProductController');
const {getProduct,findProduct,updateProduct,deleteProduct} = require('../controller/ProductController');

// allow url encoding
router.use(express.urlencoded({extended:false}));

// create new user
router.post('/createproduct',createProduct)
router.get('/getproduct',getProduct)
router.get('/findproduct/:id',findProduct)
router.put('/updateproduct/:id',updateProduct)
router.delete('/deleteproduct/:id',deleteProduct)




module.exports = router;
