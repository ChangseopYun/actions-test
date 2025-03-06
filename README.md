# 간단한 Todo API

이 프로젝트는 할 일 목록을 관리하는 간단한 REST API입니다.

## 기능

- 모든 할 일 조회
- 특정 할 일 조회
- 새 할 일 추가

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## API 엔드포인트

- `GET /api/todos` - 모든 할 일 목록 조회
- `GET /api/todos/:id` - 특정 할 일 조회
- `POST /api/todos` - 새 할 일 추가