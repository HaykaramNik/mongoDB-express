import { Router } from 'express';
import Todo from '../models/Todo.js';

const router = Router();

router.get('/', (req, res) => {
  // const todos = await Todo.find({});

  res.render('index', {
    title: 'Todos list',
    isIndex: true,

  })
});

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true
  })
});

export default router;