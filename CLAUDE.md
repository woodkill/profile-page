# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

개발자 웹 이력서(Portfolio) 프로젝트입니다. HTML5, CSS3, JavaScript, Tailwind CSS만으로 구성된 단순하고 반응형의 개인 포트폴리오 웹사이트입니다.

## 개발 환경 및 실행

### Python 버전 관리 (uv)
```bash
# 프로젝트의 Python 버전 확인
uv python list

# 특정 Python 버전 설정 (필요시)
uv python pin 3.12
```

### 로컬 개발 서버 실행
```bash
# uv를 사용하여 Python HTTP 서버 실행 (포트 8000)
uv run -m http.server 8000

# 또는 VS Code Live Server 확장프로그램 사용
# 확장프로그램 설치 후 우클릭 > "Open with Live Server"
```

### 브라우저에서 확인
- uv를 사용한 Python 서버: `http://localhost:8000`
- Live Server 확장프로그램 사용: `http://localhost:5500`

## 프로젝트 구조

```
chap32/
├── index.html              # 메인 HTML 파일
├── css/
│   └── styles.css         # 커스텀 CSS (Tailwind CSS 보완)
├── js/
│   └── main.js            # 모든 JavaScript 로직
├── images/                # 이미지 리소스 폴더
├── .python-version        # uv로 관리되는 Python 버전 (자동 생성)
├── ROADMAP.md             # 프로젝트 개발 로드맵
└── CLAUDE.md              # 이 파일
```

**참고**: `.python-version` 파일은 `uv python pin` 명령으로 자동 생성되며, uv가 자동으로 해당 Python 버전을 사용합니다.

## 아키텍처 설명

### 기술 스택
- **마크업**: HTML5 (시맨틱 요소 활용)
- **스타일**: Tailwind CSS CDN + 커스텀 CSS
- **스크립트**: Vanilla JavaScript (프레임워크 없음)
- **배포**: 정적 파일 호스팅 (GitHub Pages, Vercel, Netlify 등)

### 주요 구조

#### HTML (index.html)
- **헤더**: 네비게이션, 테마 토글, 모바일 메뉴 버튼
- **섹션 구성**:
  - `#about`: 소개 섹션 (프로필, 자기소개)
  - `#skills`: 기술스택 (Frontend, Tools, Other)
  - `#experience`: 경력사항 (타임라인 형식)
  - `#projects`: 프로젝트 (카드 그리드)
  - `#contact`: 연락처 정보
- **푸터**: 저작권 정보

#### CSS (css/styles.css)
- Tailwind CSS 기본 클래스로 대부분 스타일링
- 커스텀 애니메이션: `fadeIn` (스크롤 시 페이드인)
- 호버 효과: 네비게이션 링크 언더라인, 카드 elevation
- 다크모드: Tailwind의 `dark:` 프리픽스 활용

#### JavaScript (js/main.js)
**모듈화된 기능 영역**:
1. **테마 토글**: localStorage에 다크모드 상태 저장
2. **모바일 메뉴**: 토글 버튼 상태 관리 (구현 필요)
3. **스크롤 네비게이션**: 활성 섹션 감지 후 네비게이션 하이라이트
4. **Intersection Observer**: 섹션 진입 시 페이드인 애니메이션
5. **유틸 함수**: `scrollToElement()`, `addClassToElement()`

## 개발 가이드라인

### 콘텐츠 수정
1. **개인정보 수정**: `index.html`에서 직접 수정
   - 이름, 직급, 자기소개
   - 이메일, 소셜 링크
2. **기술스택 추가**: `#skills` 섹션의 배지(span) 요소 추가
3. **경력 및 프로젝트**: HTML 카드 요소 구조 참고하여 추가

### 스타일 커스터마이징
- **색상**: Tailwind의 `text-[색상]`, `bg-[색상]` 클래스 사용
- **다크모드**: 모든 `dark:` 프리픽스 클래스 일관성 있게 적용
- **반응형**: `md:`, `lg:` 브레이크포인트 활용 (Tailwind 기본)
- **커스텀 애니메이션**: `css/styles.css`의 `@keyframes` 섹션 수정

### JavaScript 추가 기능
- **모바일 메뉴 구현**: `mobileMenuBtn` 클릭 시 메뉴 렌더링 필요
- **스크롤 애니메이션**: 추가 요소는 `.fade-in` 클래스 적용 후 Intersection Observer가 자동으로 감지
- **새로운 인터랙션**: `main.js`의 하단 "Utility 함수들" 섹션에 추가

## 배포 준비

### 배포 체크리스트
- [ ] 개인정보 확인 (이름, 이메일, SNS 링크)
- [ ] 프로필 이미지 `images/profile.jpg` 추가
- [ ] 메타 태그 수정 (`<title>`, `<meta name="description">`)
- [ ] 모바일 반응형 테스트 (Chrome DevTools)
- [ ] 다크모드 모든 섹션 확인
- [ ] SEO 최적화 (구조화된 데이터 추가 선택사항)

### 배포 방법
1. **GitHub Pages**: 저장소의 Settings > Pages > Deploy from branch 설정
2. **Vercel**: `vercel deploy` (CLI) 또는 웹에서 연동
3. **Netlify**: `netlify deploy` 또는 드래그 드롭

## 주요 점검사항

### 접근성
- 모든 링크에 적절한 텍스트 제공
- 이미지에 alt 텍스트 추가 필요
- 색상 대비 확보 (WCAG 2.1 AA 레벨)

### 성능
- Tailwind CSS CDN 사용으로 번들 최소화
- JavaScript 최소화 (프레임워크 없음)
- 이미지 최적화 (WebP 포맷, 적절한 크기)

### 브라우저 호환성
- 최신 브라우저 기준 (ES6 JavaScript)
- IE 11 지원 불필요 (모던 브라우저만)

## 자주 사용할 명령어

```bash
# Python 버전 관리 (uv)
uv python list                    # 설치된 Python 버전 확인
uv python pin 3.12                # Python 3.12로 버전 고정
uv python uninstall 3.11          # 특정 버전 제거

# 로컬 개발 서버 실행 (uv 사용)
uv run -m http.server 8000        # 포트 8000에서 서버 시작
uv run -m http.server 3000        # 포트 3000에서 서버 시작 (선택사항)

# VS Code Live Server 사용
# 확장프로그램 설치 후 index.html 우클릭 > "Open with Live Server"
```

## 참고 자료

- [Tailwind CSS 문서](https://tailwindcss.com)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/ko/docs/Web/JavaScript)
- [HTML5 시맨틱 요소](https://developer.mozilla.org/ko/docs/Glossary/Semantics)
