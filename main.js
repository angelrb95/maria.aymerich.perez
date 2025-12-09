

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        document.getElementById('scroll-progress').style.width = progress + '%';
    });

    // Intersection Observer for fade-in animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Handle Progress Bars
                if (entry.target.classList.contains('progress-bar')) {
                    const progress = entry.target.querySelector('.progress');
                    if (progress && progress.dataset.width) {
                        progress.style.width = progress.dataset.width;
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .hero, .timeline-item, .skill-card, .edu-card, .progress-bar, .languages-list, .skills-grid, .education-grid').forEach(el => {
        el.classList.add('fade-in-section'); // Add fade-in base class
        observer.observe(el);
    });
});

// Function to handle CV download (Print to PDF)
// Function to handle CV download (Print to PDF)
const downloadBtn = document.getElementById('download-cv');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Select content to print
        const element = document.body; // Full page
        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right
            filename: 'Maria_Aymerich_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Use html2pdf lib
        // @ts-ignore
        html2pdf().set(opt).from(element).save();
    });
}

// Typing Effect
const textElement = document.querySelector('.typing-text');
const titles = ['Auxiliar de Enfermería | Auxiliar de Clínica Dental | Integrador Social'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 50; // Faster typing for long text

function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        // No deleting for single title
        return;
    } else {
        textElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 75; // Randomize slightly? 75ms is good.
    }

    if (charIndex === currentTitle.length) {
        // Stop at end
        document.querySelector('.cursor').style.animation = 'blink 1s infinite';
        return;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (textElement) type();
});

// Medical/Sociosanitary Background Animation
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 40; // Fewer, larger icons
    const particleSpeed = 0.3;

    // Resize handling
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Symbol Class
    class SymbolItem {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * particleSpeed;
            this.vy = (Math.random() - 0.5) * particleSpeed;
            this.size = Math.random() * 10 + 8; // Larger size for icons
            this.type = Math.random() > 0.5 ? 'cross' : 'heart';
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.02;
            this.opacity = Math.random() * 0.15 + 0.05; // Soft opacity
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;

            // Wrap around screen
            if (this.x < -20) this.x = width + 20;
            if (this.x > width + 20) this.x = -20;
            if (this.y < -20) this.y = height + 20;
            if (this.y > height + 20) this.y = -20;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#008080'; // Teal color

            if (this.type === 'cross') {
                // Draw Medical Cross
                const w = this.size / 3;
                ctx.fillRect(-this.size / 2, -w / 2, this.size, w);
                ctx.fillRect(-w / 2, -this.size / 2, w, this.size);
            } else {
                // Draw Heart
                const size = this.size;
                ctx.beginPath();
                const topCurveHeight = size * 0.3;
                ctx.moveTo(0, topCurveHeight);
                ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
                ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
                ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
                ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // Init symbols
    for (let i = 0; i < particleCount; i++) {
        particles.push(new SymbolItem());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw symbols
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
}
