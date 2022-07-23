const express = require('express');
const router = express.Router();
const {getAllProduct,createProduct} =  require('../controller/productRoute');

router.route('/').get(getAllProduct).post(createProduct);    

module.exports = router;