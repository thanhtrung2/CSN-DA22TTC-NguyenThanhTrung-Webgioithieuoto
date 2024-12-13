require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối database
connectDB();

// Routes
app.use('/api/products', productRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên port ${PORT}`);
}); 

const Product = require('./models/Product');

async function createSampleData() {
    try {
        // Xóa dữ liệu cũ
        await Product.deleteMany({});

        // Thêm dữ liệu mẫu
        await Product.create([
            {
                name: "Honda Civic",
                category: "sedan",
                price: "Từ 730.000.000 VNĐ",
                engine: "Động cơ 1.5L VTEC Turbo",
                feature: "Honda SENSING",
                image: "/img/civic-honda.webp",
                link: "/xe/sedan/civic.html"
            },
            {
                name: "Honda CR-V",
                category: "suv",
                price: "Từ 998.000.000 VNĐ",
                engine: "Động cơ 1.5L VTEC Turbo",
                feature: "Honda SENSING",
                image: "/img/honda-crv.jpg",
                link: "/xe/suv/crv.html"
            }
        ]);
        console.log('Đã tạo dữ liệu mẫu thành công');
    } catch (error) {
        console.error('Lỗi khi tạo dữ liệu mẫu:', error);
    }
}

// Gọi hàm tạo dữ liệu mẫu
createSampleData(); 