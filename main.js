// Particle System for Hero Background
let particles = [];
let particleCount = 50;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('particle-bg');
    canvas.id('p5-canvas');
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: random(width),
            y: random(height),
            vx: random(-0.5, 0.5),
            vy: random(-0.5, 0.5),
            size: random(2, 6),
            opacity: random(0.3, 0.8)
        });
    }
}

function draw() {
    clear();
    
    // Update and draw particles
    for (let particle of particles) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        
        // Draw particle
        fill(0, 212, 255, particle.opacity * 255);
        noStroke();
        ellipse(particle.x, particle.y, particle.size);
        
        // Draw connections
        for (let other of particles) {
            let distance = dist(particle.x, particle.y, other.x, other.y);
            if (distance < 100) {
                stroke(0, 212, 255, (1 - distance / 100) * 50);
                strokeWeight(0.5);
                line(particle.x, particle.y, other.x, other.y);
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Skills Radar Chart
function initSkillsChart() {
    const chartDom = document.getElementById('skills-chart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    const option = {
        backgroundColor: 'transparent',
        radar: {
            indicator: [
                { name: 'Unity 3D', max: 100 },
                { name: 'C# Programming', max: 100 },
                { name: 'AI Systems', max: 100 },
                { name: 'Multiplayer', max: 100 },
                { name: 'UI/UX Design', max: 100 },
                { name: 'Backend', max: 100 },
                { name: '3D Modeling', max: 100 },
                { name: 'Optimization', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 5,
            axisName: {
                color: '#00d4ff',
                fontSize: 12,
                fontWeight: 'bold'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 212, 255, 0.2)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 212, 255, 0.3)'
                }
            }
        },
        series: [{
            name: 'Skills',
            type: 'radar',
            data: [{
                value: [95, 90, 88, 85, 82, 80, 75, 87],
                name: 'Technical Skills',
                areaStyle: {
                    color: 'rgba(0, 212, 255, 0.2)'
                },
                lineStyle: {
                    color: '#00d4ff',
                    width: 2
                },
                itemStyle: {
                    color: '#00d4ff',
                    borderColor: '#fff',
                    borderWidth: 2
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };
    
    myChart.setOption(option);
    
    // Responsive resize
    window.addEventListener('resize', () => {
        myChart.resize();
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');
    const skillItems = document.querySelectorAll('.skill-item');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutCubic',
                    delay: anime.stagger(100)
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Animate skill items separately
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: skillItems,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 600,
                    easing: 'easeOutCubic',
                    delay: anime.stagger(150)
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    if (skillItems.length > 0) {
        skillObserver.observe(skillItems[0]);
    }
}

// Smooth Scrolling for Navigation
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Create mobile menu if it doesn't exist
            let mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.id = 'mobile-menu';
                mobileMenu.className = 'md:hidden bg-black bg-opacity-90 backdrop-blur-md absolute top-full left-0 w-full py-4';
                mobileMenu.innerHTML = `
                    <div class="flex flex-col space-y-4 px-6">
                        <a href="#home" class="text-white hover:text-cyan-400 transition-colors">Home</a>
                        <a href="projects.html" class="text-white hover:text-cyan-400 transition-colors">Projects</a>
                        <a href="about.html" class="text-white hover:text-cyan-400 transition-colors">About</a>
                    </div>
                `;
                nav.appendChild(mobileMenu);
            }
            
            // Toggle visibility
            mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
        });
    }
}

// Project Card Hover Effects
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.02,
                rotateX: 5,
                translateY: -8,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                rotateX: 0,
                translateY: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
}

// Navigation Active State Management
function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Typing Animation for Hero Text
function initTypingAnimation() {
    const heroTitle = document.querySelector('.orbitron');
    if (heroTitle) {
        // Split text into characters
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            heroTitle.appendChild(span);
            
            // Animate each character
            anime({
                targets: span,
                opacity: [0, 1],
                duration: 50,
                delay: index * 50,
                easing: 'easeOutCubic'
            });
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components in order
    initSkillsChart();
    initScrollReveal();
    initSmoothScroll();
    initMobileMenu();
    initProjectCards();
    initNavigation();
    
    // Add loading animation
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutCubic'
    });
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        anime.running.forEach(animation => animation.pause());
    } else {
        // Resume animations when page is visible
        anime.running.forEach(animation => animation.play());
    }
});

// Export functions for use in other pages
window.PortfolioJS = {
    initScrollReveal,
    initSmoothScroll,
    initMobileMenu,
    initNavigation
};