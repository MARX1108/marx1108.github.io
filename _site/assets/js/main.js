// Theme toggle
(function() {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', function() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

// Reveal on scroll
(function() {
  var nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(function(n) { n.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

  nodes.forEach(function(n, i) {
    n.style.transitionDelay = (i * 40) + 'ms';
    observer.observe(n);
  });
})();
