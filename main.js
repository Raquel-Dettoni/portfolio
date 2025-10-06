// ===== Ano corrente =====
const yearEl = document.getElementById('y');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Tema claro/escuro =====
const modeBtn = document.getElementById('modeBtn');
const THEME_KEY = 'raquel:theme';
function setTheme(t){ document.documentElement.dataset.theme = t; localStorage.setItem(THEME_KEY, t) }
function getTheme(){ return localStorage.getItem(THEME_KEY) }
const savedTheme = getTheme(); if(savedTheme) setTheme(savedTheme);
if (modeBtn){
  modeBtn.addEventListener('click', () => {
    const now = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    setTheme(now);
    modeBtn.setAttribute('aria-pressed', String(now !== 'light'))
  });
}

// ===== Scroll reveal (respeita prefers-reduced-motion) =====
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReduced){
  const els = document.querySelectorAll('section .card, .hero-tile, .project, .skill-card, .svc, .q');
  els.forEach(el => { el.style.opacity = 0; el.style.transform = 'translateY(12px)'; });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.animate([
          {opacity:0, transform:'translateY(12px)'},
          {opacity:1, transform:'translateY(0)'}
        ], {duration:500, easing:'cubic-bezier(.2,.7,.2,1)', fill:'forwards'});
        io.unobserve(e.target);
      }
    })
  }, {threshold:.12});
  els.forEach(el => io.observe(el));
}

// ===== A11y: foco visível ao navegar por teclado =====
let useKeyboard = false;
function setOutline(v){ document.body.classList.toggle('kbd', v) }
window.addEventListener('keydown', e => { if(e.key === 'Tab'){ useKeyboard = true; setOutline(true) } });
window.addEventListener('mousedown', () => { if(useKeyboard){ useKeyboard = false; setOutline(false) } });

// ===== Back to top + nav shadow =====
const toTop = document.getElementById('toTop');
function onScroll(){
  const y = window.scrollY || document.documentElement.scrollTop;
  if (toTop){ toTop.classList.toggle('show', y > 600); }
}
window.addEventListener('scroll', onScroll, {passive:true});
if (toTop){ toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'})); }

// ===== Scroll spy simples =====
const links = Array.from(document.querySelectorAll('[data-spy]'));
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
function spy(){
  let idx = 0; const y = window.scrollY + 120; // compensar header
  sections.forEach((sec, i) => { if (sec.offsetTop <= y) idx = i; });
  links.forEach((a,i) => a.classList.toggle('active', i === idx));
}
window.addEventListener('scroll', spy, {passive:true});
window.addEventListener('load', spy);

// ===== Smooth anchor =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  })
});