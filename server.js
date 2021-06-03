const express = require('express');
const { dbConnect } = require('./src/db/dbConnect');
const { middleware } = require('./src/middleware/middleware');
require('dotenv').config();

// Импорт ручек
const indexRouter = require('./src/routes/indexRouter');
const userRouter = require('./src/routes/userRouter');
const feedbackRouter = require('./src/routes/feedbackRouter');

const app = express();
const PORT = process.env.PORT;

dbConnect();

middleware(app);

// Подключение ручек

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/review', feedbackRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
