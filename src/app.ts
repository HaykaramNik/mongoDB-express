import 'dotenv/config';
import * as express from 'express';
import mongoose from 'mongoose';
import User from './User.model';

const app = express();
const port = process.env.PORT;
const uri: string = process.env.DB_URI as string;

(async function connectMongoDB() {
  try {
    await mongoose.connect(uri);

    console.log('Успешное подключение к MongoDB Atlas!');

    const newUser = new User({
      name: 'John',
      age: 25,
      email: 'john@example.com',
    });

    await newUser.save();

    console.log('Докумен сохранен');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB Atlas:', error);
  } finally {
    mongoose.disconnect();
  }
})();

app.get('/', (req, res) => {
  res.send(`Привет, мир! ${port}`);
});

app.listen(port, () => {
  console.log('Сервер запущен');
});
