const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Thêm middleware logging
router.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
    try {
        console.log('Đang lấy sản phẩm...');
        const products = await Product.find();
        console.log('Số sản phẩm tìm thấy:', products.length);
        const groupedProducts = {
            sedan: products.filter(p => p.category === 'sedan'),
            suv: products.filter(p => p.category === 'suv'),
            '7cho': products.filter(p => p.category === '7cho'),
            thethao: products.filter(p => p.category === 'thethao')
        };
        res.json(groupedProducts);
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        res.status(500).json({ message: error.message });
    }
});

// Lấy sản phẩm theo category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Thêm sản phẩm mới
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cập nhật sản phẩm
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true }
        );
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Xóa sản phẩm
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Đã xóa sản phẩm' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 