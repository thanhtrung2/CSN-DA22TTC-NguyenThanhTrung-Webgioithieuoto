const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Đã xảy ra lỗi!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
