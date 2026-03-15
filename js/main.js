// ========================================
// 테마 토글 기능 (다크모드)
// ========================================

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// localStorage에서 테마 설정 불러오기
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';

    if (isDark) {
        htmlElement.classList.add('dark');
        themeToggle.textContent = '☀️';
    } else {
        htmlElement.classList.remove('dark');
        themeToggle.textContent = '🌙';
    }
}

// 테마 토글 이벤트
themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// 페이지 로드 시 테마 초기화
initializeTheme();

// ========================================
// 모바일 메뉴 토글
// ========================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenuBtn.textContent = menuOpen ? '✕' : '☰';
    // TODO: 모바일 메뉴 구현
});

// ========================================
// 스크롤 네비게이션 (활성 섹션 하이라이트)
// ========================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNavigation() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'dark:text-blue-400');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('text-blue-600', 'dark:text-blue-400');
        }
    });
}

window.addEventListener('scroll', updateActiveNavigation);

// ========================================
// Smooth Scroll 링크 클릭 처리
// ========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            menuOpen = false;
            mobileMenuBtn.textContent = '☰';
        }
    });
});

// ========================================
// 스크롤 애니메이션 (Intersection Observer)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 섹션 요소들에 옵저버 적용
sections.forEach(section => {
    observer.observe(section);
});

// ========================================
// 페이지 로드 완료 시 초기화
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavigation();
    console.log('포트폴리오 페이지 로드 완료');
});

// ========================================
// Utility 함수들
// ========================================

/**
 * 요소를 뷰포트 내에 부드럽게 스크롤
 * @param {string} elementId - 요소의 ID
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * 요소에 클래스 추가 (애니메이션용)
 * @param {string} elementId - 요소의 ID
 * @param {string} className - 추가할 클래스명
 */
function addClassToElement(elementId, className) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add(className);
    }
}

// 전역 스코프에 유틸 함수 노출
window.scrollToElement = scrollToElement;
window.addClassToElement = addClassToElement;
