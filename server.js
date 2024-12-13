const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Phục vụ files tĩnh từ thư mục img
app.use('/img', express.static(path.join(__dirname, 'img')));

// API để lấy tất cả categories và sản phẩm
app.get('/cars', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
    res.json(data.cars || []);
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Không thể đọc dữ liệu sản phẩm' });
  }
});

// API để lấy sản phẩm theo category
app.get('/api/categories/:categoryId', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
    const category = data.categories[req.params.categoryId];
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Không tìm thấy danh mục' });
    }
  } catch (error) {
    console.error('Lỗi:', error);
    res.status(500).json({ error: 'Không thể đọc dữ liệu danh mục' });
  }
});

// Thêm route tìm kiếm vào server.js
app.get('/api/cars/search', (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
        let filteredCars = data.cars;

        // Lọc theo tên
        if (name) {
            const searchTerm = name.toLowerCase();
            filteredCars = filteredCars.filter(car => 
                car.name.toLowerCase().includes(searchTerm) ||
                car.description.toLowerCase().includes(searchTerm)
            );
        }

        // Lọc theo danh mục
        if (category && category !== 'all') {
            filteredCars = filteredCars.filter(car => car.category === category);
        }

        // Lọc theo khoảng giá
        if (minPrice || maxPrice) {
            filteredCars = filteredCars.filter(car => {
                const price = car.price;
                const min = minPrice ? parseInt(minPrice) : 0;
                const max = maxPrice ? parseInt(maxPrice) : Infinity;
                return price >= min && price <= max;
            });
        }

        res.json(filteredCars);
    } catch (error) {
        console.error('Lỗi tìm kiếm:', error);
        res.status(500).json({ error: 'Lỗi khi tìm kiếm xe' });
    }
});

app.listen(3001, () => {
  console.log('Server đang chạy tại cổng 3001');
}); 