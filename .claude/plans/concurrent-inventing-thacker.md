# 라이트모드 기본값 변경 계획

## Context

현재 포트폴리오 사이트는 OS의 시스템 테마(prefers-color-scheme)를 따라 다크모드/라이트모드를 자동으로 결정합니다. 사용자가 라이트모드를 기본값으로 변경하길 원합니다.

---

## 변경 범위

### 수정 파일
- `js/main.js` — `initializeTheme()` 함수의 isDark 판단 로직

---

## 구체적 변경 내용

### `js/main.js`

**변경 전** (현재 로직):
```js
const isDark = savedTheme === 'dark' ||
               (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
```

**변경 후** (라이트모드 기본값):
```js
const isDark = savedTheme === 'dark';
```

- `localStorage`에 `'dark'`가 명시적으로 저장된 경우에만 다크모드 적용
- `localStorage`에 값이 없으면(최초 방문) 라이트모드가 기본값
- OS 시스템 테마 자동 감지 제거

---

## 동작 변화

| 상황 | 변경 전 | 변경 후 |
|------|---------|---------|
| 최초 방문 (OS 다크모드) | 다크모드 | **라이트모드** |
| 최초 방문 (OS 라이트모드) | 라이트모드 | 라이트모드 |
| 사용자가 토글로 다크 전환 후 재방문 | 다크모드 | 다크모드 |
| 사용자가 토글로 라이트 전환 후 재방문 | 라이트모드 | 라이트모드 |

---

## 검증 방법

1. `uv run -m http.server 8000` 으로 서버 실행
2. `http://localhost:8000` 브라우저 접속
3. OS를 다크모드로 설정한 상태에서 페이지 로드 → 라이트모드로 표시되어야 함
4. 테마 토글 버튼(🌙) 클릭 → 다크모드 전환 확인
5. 페이지 새로고침 → 다크모드 유지 확인 (localStorage 저장 동작)
6. localStorage 초기화 후 새로고침 → 다시 라이트모드로 표시되어야 함
