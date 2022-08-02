const express = require('express');
const router = express.Router();
const {getAllProduct,createProduct, getOneProduct,deleteProduct,updateProduct} =  require('../controller/productRoute');

router.route('/').get(getAllProduct).post(createProduct); 
router.route('/:id').get(getOneProduct).delete(deleteProduct).patch(updateProduct)  

module.exports = router;