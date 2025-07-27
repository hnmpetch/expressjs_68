const express = require('express');
const router = express.Router();
const products = require('../controller/productController.js')

router.get('/', products.getAllproduct);
router.get('/:code', products.getProduct);
router.post('/register', products.registerProduct);
router.delete('/:code', products.deleteProduct);
router.put('/:code', products.updateProduct);

module.exports = router