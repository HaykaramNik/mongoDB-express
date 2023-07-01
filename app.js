import 'dotenv/config';
import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import todoRouter from './routers/todos.js';
import exphbs from 'express-handlebars';
import path from 'path';

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});
const port = process.env.PORT || 3000;
const uri = process.env.DB_URI;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public')));

app.use(todoRouter);

(async function start() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log('Сервер запущен');
    });

    console.log('Успешное подключение к MongoDB Atlas!');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB Atlas:', error);
  }
})();
