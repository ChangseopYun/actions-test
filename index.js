const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// 메모리 기반 할 일 목록 저장소
let todos = [
  { id: 1, title: '샘플 할 일', completed: false, createdAt: new Date() }
];

// 라우트: 모든 할 일 가져오기
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// 라우트: 특정 할 일 가져오기
app.get('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = todos.find(t => t.id === todoId);
  
  if (!todo) {
    return res.status(404).json({ error: '할 일을 찾을 수 없습니다.' });
  }
  
  res.json(todo);
});

// 라우트: 새 할 일 추가하기
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: '제목은 필수입니다.' });
  }
  
  const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  
  const newTodo = {
    id: newId,
    title,
    completed: false,
    createdAt: new Date()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});