# 간단한 Todo API

이 프로젝트는 할 일 목록을 관리하는 간단한 REST API입니다.

## 기능

- 모든 할 일 조회 (정렬 옵션 지원)
- 특정 할 일 조회
- 새 할 일 추가
- 할 일 업데이트
- 할 일 삭제
- 할 일 완료 상태 토글

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## API 엔드포인트

### 할 일 관리
- `GET /api/todos` - 모든 할 일 목록 조회
  - 쿼리 파라미터: `sortBy` (id, title, createdAt)
- `GET /api/todos/:id` - 특정 할 일 조회
- `POST /api/todos` - 새 할 일 추가
- `PUT /api/todos/:id` - 할 일 업데이트
- `DELETE /api/todos/:id` - 할 일 삭제
- `PATCH /api/todos/:id/toggle` - 할 일 완료 상태 토글

### 시스템
- `GET /api/health` - API 상태 확인