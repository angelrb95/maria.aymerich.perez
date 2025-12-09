

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
