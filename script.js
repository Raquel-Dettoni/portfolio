document.addEventListener('DOMContentLoaded', () => {
      // toggle menu
      const toggle = document.querySelector('.nav-toggle');
      const menu   = document.querySelector('.nav-menu');
      if (toggle && menu) {
        toggle.addEventListener('click', () => menu.classList.toggle('show'));
      }
      // scroll animations
      const els = document.querySelectorAll('[data-anime]');
      const animeScroll = () => {
        const threshold = window.pageYOffset + window.innerHeight * 0.85;
        els.forEach(el => {
          threshold > el.offsetTop
            ? el.classList.add('animate')
            : el.classList.remove('animate');
        });
      };
      animeScroll();
      window.addEventListener('scroll', animeScroll);
    });