// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // fehcar e abrir menu mobile
    if (mobileMenu) mobileMenu.classList.add('hidden');

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    if (this.classList.contains('nav-link')) {
      this.classList.add('active');
    }
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Animação de scroll
const skillItems = document.querySelectorAll('.skill-item');

const animateSkills = () => {
  skillItems.forEach((item, index) => {
    const itemPosition = item.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (itemPosition < screenPosition) {
      setTimeout(() => {
        item.classList.add('animate');
      }, index * 100);
    }
  });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);
