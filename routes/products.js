const express = require('express');
const router = express.Router();
const products = require('../data/products.json');

// Lấy tất cả sản phẩm
router.get('/', (req, res) => {
  res.json(products);
});

// Lấy sản phẩm theo danh mục (sedan/suv)
router.get('/category/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  if (products[category]) {
    res.json(products[category]);
  } else {
    res.status(404).json({ message: 'Không tìm thấy danh mục' });
  }
});

// Lấy chi tiết sản phẩm theo ID
router.get('/:id', (req, res) => {
  const id = req.params.id.toLowerCase();
  const allProducts = [...products.sedan, ...products.suv];
  const product = allProducts.find(p => p.id === id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  }
});

// Tìm kiếm sản phẩm
router.get('/search', (req, res) => {
  try {
    const { query, category, minPrice, maxPrice } = req.query;
    
    // Gộp tất cả sản phẩm từ các danh mục
    let allProducts = [];
    Object.keys(products).forEach(category => {
      allProducts = allProducts.concat(products[category]);
    });
    
    let filteredProducts = [...allProducts];

    // Lọc theo từ khóa
    if (query) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Lọc theo danh mục
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }

    // Lọc theo giá
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= parseInt(minPrice)
      );
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= parseInt(maxPrice)
      );
    }

    res.json(filteredProducts);
  } catch (error) {
    console.error('Lỗi khi tìm kiếm:', error);
    res.status(500).json({ message: 'Lỗi server khi tìm kiếm' });
  }
});

module.exports = router;
