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

// 유틸리티 함수: 할 일 찾기
const findTodoById = (id) => {
  return todos.find(t => t.id === id);
};

// 유틸리티 함수: 새 ID 생성
const generateNewId = () => {
  return todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
};

// 라우트: 모든 할 일 가져오기
app.get('/api/todos', (req, res) => {
  // 정렬 기능 추가
  const sortBy = req.query.sortBy || 'id';
  const sortedTodos = [...todos].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'createdAt') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return a.id - b.id;
  });
  
  res.json(sortedTodos);
});

// 라우트: 특정 할 일 가져오기
app.get('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = findTodoById(todoId);
  
  if (!todo) {
    return res.status(404).json({ error: '할 일을 찾을 수 없습니다.' });
  }
  
  res.json(todo);
});

// 라우트: 새 할 일 추가하기
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: '제목은 필수입니다.' });
  }
  
  const newId = generateNewId();
  
  const newTodo = {
    id: newId,
    title: title.trim(),
    completed: false,
    createdAt: new Date()
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 라우트: 할 일 업데이트하기
app.put('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, completed } = req.body;
  
  // ID로 할 일 찾기
  const todoIndex = todos.findIndex(t => t.id === todoId);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: '할 일을 찾을 수 없습니다.' });
  }
  
  // 변경 사항 적용
  const updatedTodo = {
    ...todos[todoIndex],
    title: title !== undefined ? title.trim() : todos[todoIndex].title,
    completed: completed !== undefined ? completed : todos[todoIndex].completed,
    updatedAt: new Date()
  };
  
  // 배열 업데이트
  todos[todoIndex] = updatedTodo;
  
  res.json(updatedTodo);
});

// 라우트: 할 일 삭제하기
app.delete('/api/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === todoId);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: '할 일을 찾을 수 없습니다.' });
  }
  
  // 해당 인덱스의 항목 삭제
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  
  res.json({ message: '할 일이 삭제되었습니다.', deletedTodo });
});

// 라우트: 할 일 완료 토글하기
app.patch('/api/todos/:id/toggle', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === todoId);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: '할 일을 찾을 수 없습니다.' });
  }
  
  // 완료 상태 토글
  todos[todoIndex].completed = !todos[todoIndex].completed;
  todos[todoIndex].updatedAt = new Date();
  
  res.json(todos[todoIndex]);
});

// API 상태 체크 엔드포인트
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date(),
    version: '1.1.0'
  });
});

// 404 에러 핸들러
app.use((req, res, next) => {
  res.status(404).json({ error: '요청하신 리소스를 찾을 수 없습니다.' });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});