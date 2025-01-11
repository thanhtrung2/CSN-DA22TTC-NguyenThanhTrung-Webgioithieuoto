const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Đã xảy ra lỗi!' });
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
