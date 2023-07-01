import { Router } from 'express';
import Todo from '../models/Todo.js';

const router = Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find({});

  res.render('index', {
    title: 'Todos list',
    isIndex: true,
    todos: todos.map((todo) => ({
      title: todo.title,
      completed: todo.completed,
      _id: todo._id,
    })),
  });
});

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true,
  });
});

router.post('/create', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  await todo.save();
  res.redirect('/');
});

router.post('/completed', async (req, res) => {
  const todo = await Todo.findById(req.body.id);

  todo.completed = !!req.body.completed;

  await todo.save();

  res.redirect('/');
});

export default router;
