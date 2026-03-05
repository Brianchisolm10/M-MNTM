// Smooth scroll to app section
document.querySelectorAll('a[href="#app"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real setup, this would navigate to the app
    // For now, show an alert
    alert('The Momentum app is running at localhost:3000\n\nIn production, this would launch the full app experience.');
  });
});

// Add scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and steps
document.querySelectorAll('.feature-card, .research-card, .audience-card, .step').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#app') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Add hover effects to cards
document.querySelectorAll('.feature-card, .research-card, .audience-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

console.log('Momentum website loaded');
