# 다크모드 토글 버튼 수정 계획

## Context

테마 토글 버튼 클릭 시 아이콘과 localStorage는 변경되지만, 실제 페이지 색상이 바뀌지 않는 문제.

**근본 원인**: Tailwind CSS v3의 기본 `darkMode` 전략은 `media`(OS 환경설정 기반)이다.
코드는 `<html>` 요소에 `dark` 클래스를 추가/제거하는 `class` 전략을 사용하는데,
Tailwind CDN에 해당 설정이 없어 `dark:bg-gray-900` 등의 클래스들이 전혀 반응하지 않는다.

## 수정 방법

### 변경 파일
- `/Users/woody/dv/study/inflearn/claudecode/chap32/index.html`

### 변경 내용

`index.html`의 Tailwind CDN 스크립트 바로 뒤에 설정 스크립트 1개 추가:

```html
<!-- 기존 -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- 수정 후 -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        darkMode: 'class'
    }
</script>
```

추가 위치: `index.html` 7번째 줄 바로 다음 (8번째 줄로 삽입)

## 기존 코드 재사용

`js/main.js`의 테마 토글 로직(`classList.toggle('dark')`, localStorage 저장)은 올바르게 구현되어 있으므로 **변경 불필요**.

## 검증 방법

1. `uv run -m http.server 8000` 으로 서버 실행
2. `http://localhost:8000` 브라우저에서 접속
3. 🌙 버튼 클릭 → 페이지 전체 색상이 다크 테마로 전환되는지 확인
4. ☀️ 버튼 클릭 → 라이트 테마로 복원되는지 확인
5. 페이지 새로고침 후 마지막 선택 테마가 유지되는지 확인 (localStorage 영속화)
