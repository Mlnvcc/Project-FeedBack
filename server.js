const express = require('express');
const { dbConnect } = require('./src/db/dbConnect');
const { middleware } = require('./src/middleware/middleware');
require('dotenv').config();

// Импорт ручек

const app = express();
const PORT = process.env.PORT;

dbConnect();

middleware(app);

// Подключение ручек


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
