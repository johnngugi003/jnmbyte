// =====================================================================
// Jnm Byte — script.js
// =====================================================================

// ----- Initialize Lucide icons -----
lucide.createIcons();

// =====================================================================
// Binary Rain Animation (Hero Section)
// =====================================================================
function createBinaryRain() {
    const container = document.getElementById('binary-rain-container');
    if (!container) return;

    const binaryChars = ['0', '1'];

    for (let i = 0; i < 25; i++) {
        const binary = document.createElement('div');
        binary.className = 'binary-rain';
        binary.textContent = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        binary.style.left = Math.random() * 100 + '%';
        binary.style.animationDelay = Math.random() * 8 + 's';
        binary.style.fontSize = (Math.random() * 12 + 10) + 'px';
        container.appendChild(binary);
    }
}

// =====================================================================
// Mobile Menu Toggle
// =====================================================================
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileMenuButton ? mobileMenuButton.querySelector('i') : null;

if (mobileMenuButton && mobileMenu && menuIcon) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const isOpen = mobileMenu.classList.contains('open');

        // Swap icon between menu and x
        menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons();
    });

    // Close mobile menu when any link inside it is clicked
    document.querySelectorAll('#mobile-menu a').forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// =====================================================================
// Services Horizontal Scroll
// =====================================================================
const servicesScroll = document.getElementById('servicesScroll');
const servicesScrollLeftBtn = document.getElementById('servicesScrollLeft');
const servicesScrollRightBtn = document.getElementById('servicesScrollRight');

if (servicesScroll && servicesScrollLeftBtn && servicesScrollRightBtn) {
    const servicesScrollAmount = 400;

    servicesScrollLeftBtn.addEventListener('click', () => {
        servicesScroll.scrollBy({
            left: -servicesScrollAmount,
            behavior: 'smooth'
        });
    });

    servicesScrollRightBtn.addEventListener('click', () => {
        servicesScroll.scrollBy({
            left: servicesScrollAmount,
            behavior: 'smooth'
        });
    });

    // Update button disabled state based on scroll position
    servicesScroll.addEventListener('scroll', () => {
        const isAtStart = servicesScroll.scrollLeft === 0;
        const isAtEnd =
            servicesScroll.scrollLeft + servicesScroll.clientWidth >=
            servicesScroll.scrollWidth - 1;

        servicesScrollLeftBtn.disabled = isAtStart;
        servicesScrollRightBtn.disabled = isAtEnd;
    });

    // Set initial disabled state on page load
    window.addEventListener('load', () => {
        servicesScrollLeftBtn.disabled = true;
    });
}

// =====================================================================
// Header Background on Scroll
// =====================================================================
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.remove('bg-transparent');
            header.classList.add('bg-gray-900/80', 'backdrop-blur-md', 'shadow-lg');
        } else {
            header.classList.add('bg-transparent');
            header.classList.remove('bg-gray-900/80', 'backdrop-blur-md', 'shadow-lg');
        }
    });
}

// =====================================================================
// Fade-in Elements on Scroll
// =====================================================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('load', () => {
    createBinaryRain();
    fadeInOnScroll();
});
window.addEventListener('scroll', fadeInOnScroll);

// =====================================================================
// Smooth Scrolling for Anchor Links
// =====================================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href.length < 2) return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});