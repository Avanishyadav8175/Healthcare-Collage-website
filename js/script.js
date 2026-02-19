// ===================================
// MOBILE NAVIGATION TOGGLE
// ===================================
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// ===================================
// ANIMATED COUNTERS
// ===================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Trigger counters when in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => counterObserver.observe(stat));

// ===================================
// TESTIMONIALS SLIDER
// ===================================
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;

    if (testimonials.length === 0) return;

    function showSlide(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    showSlide(0);
}

initTestimonialSlider();

// ===================================
// SCROLL ANIMATIONS
// ===================================
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===================================
// BACK TO TOP BUTTON
// ===================================
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// THEME TOGGLE
// ===================================
const themeToggle = document.querySelector('.theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);

if (themeToggle) {
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
const leadForm = document.getElementById('leadForm');

if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            program: document.getElementById('program').value,
            message: document.getElementById('message')?.value || ''
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.program) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        console.log('Form submitted:', formData);
        alert('Thank you! Our counselor will contact you soon.');
        leadForm.reset();
    });
}

// ===================================
// ACCORDION FUNCTIONALITY
// ===================================
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all accordions
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Open clicked accordion if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===================================
// WHATSAPP BUTTON
// ===================================
const whatsappBtn = document.querySelector('.whatsapp-btn');

if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        const phoneNumber = '919999999999'; // Replace with actual number
        const message = 'Hello! I would like to know more about your healthcare programs.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
}

// ===================================
// STICKY HEADER ON SCROLL
// ===================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// PROGRAM DETAIL PAGE - URL PARAMS
// ===================================
function loadProgramDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');
    
    if (!courseId) return;
    
    const programs = {
        'dmlt': {
            title: 'Diploma in Medical Laboratory Technology',
            duration: '2 Years',
            eligibility: '10+2 (Science with Biology)',
            description: 'Master diagnostic techniques and laboratory procedures with comprehensive hands-on training in modern medical laboratories.',
            curriculum: [
                'Human Anatomy & Physiology',
                'Clinical Biochemistry',
                'Microbiology & Immunology',
                'Hematology & Blood Banking',
                'Clinical Pathology',
                'Laboratory Management'
            ],
            careers: [
                'Medical Laboratory Technician',
                'Lab Supervisor',
                'Quality Control Analyst',
                'Research Assistant',
                'Hospital Lab Manager'
            ],
            feeRange: '₹50,000 - ₹1,50,000 per year'
        },
        'dpharm': {
            title: 'Diploma in Pharmacy',
            duration: '2 Years',
            eligibility: '10+2 (Science with Chemistry)',
            description: 'Learn pharmaceutical sciences and become a certified pharmacy professional with expertise in drug dispensing and patient care.',
            curriculum: [
                'Pharmaceutics',
                'Pharmaceutical Chemistry',
                'Pharmacology',
                'Pharmacognosy',
                'Biochemistry & Clinical Pathology',
                'Hospital & Community Pharmacy'
            ],
            careers: [
                'Registered Pharmacist',
                'Hospital Pharmacist',
                'Community Pharmacist',
                'Pharmaceutical Sales Representative',
                'Drug Inspector'
            ],
            feeRange: '₹40,000 - ₹1,20,000 per year'
        }
    };
    
    const program = programs[courseId];
    if (program && document.getElementById('programTitle')) {
        document.getElementById('programTitle').textContent = program.title;
    }
}

loadProgramDetails();

// ===================================
// POPUP APPLY FORM
// ===================================
function openApplyForm() {
    document.getElementById('applyModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeApplyForm() {
    document.getElementById('applyModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('applyModal');
    if (e.target === modal) {
        closeApplyForm();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeApplyForm();
    }
});

// ===================================
// GOOGLE SHEETS INTEGRATION
// ===================================
// Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwc_ZQKNF-tPveP-IZEvOaPRUQTuQbZPkPovADgSmstuP2DAjw9blNENrFXfd8iaEIO/exec';

const applyForm = document.getElementById('applyForm');

if (applyForm) {
    applyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(applyForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            program: formData.get('program'),
            message: formData.get('message') || '',
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.program) {
            alert('Please fill in all required fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Phone validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        // Show loading state
        const submitBtn = applyForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        try {
            // Send to Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Show success message
            applyForm.style.display = 'none';
            document.getElementById('formSuccess').classList.add('active');
            
            // Reset form
            applyForm.reset();
            
            // Close modal after 3 seconds
            setTimeout(() => {
                closeApplyForm();
                applyForm.style.display = 'block';
                document.getElementById('formSuccess').classList.remove('active');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);

        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your application. Please try again or contact us directly.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
