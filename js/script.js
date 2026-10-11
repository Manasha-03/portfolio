// ---------- Mobile menu ----------
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobilePanel = document.getElementById('mobilePanel');
hamburgerBtn.addEventListener('click', () => {
  mobilePanel.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});
mobilePanel.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobilePanel.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

// ---------- Certificate / resume viewer ----------
const certModal = document.getElementById('certModal');
const modalFrame = document.getElementById('modalFrame');
const modalTitle = document.getElementById('modalTitle');
const modalSub = document.getElementById('modalSub');
const modalDownload = document.getElementById('modalDownload');
const modalNewTab = document.getElementById('modalNewTab');

function openCert(url, title, sub) {
  modalFrame.src = url;
  modalTitle.textContent = title;
  modalSub.textContent = sub;
  modalDownload.href = url;
  modalDownload.setAttribute('download', title.replace(/[^a-z0-9]+/gi, '_') + '.pdf');
  modalNewTab.href = url;
  certModal.classList.add('open');
  document.body.classList.add('menu-open');
}
function closeCert() {
  certModal.classList.remove('open');
  document.body.classList.remove('menu-open');
  modalFrame.src = 'about:blank';
}
document.getElementById('modalCloseBtn').addEventListener('click', closeCert);
certModal.addEventListener('click', e => { if (e.target === certModal) closeCert(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCert(); });

// Clicking a certificate thumbnail also opens it
document.querySelectorAll('.cert-card').forEach(card => {
  const btn = card.querySelector('.cert-actions button');
  const thumb = card.querySelector('.cert-thumb');
  if (btn && thumb) thumb.addEventListener('click', () => btn.click());
});

// ---------- Contact form -> opens email client ----------
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const message = document.getElementById('cf-message').value;
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
  window.location.href = `mailto:manashakuthalingam@gmail.com?subject=${subject}&body=${body}`;
  formNote.classList.add('show');
});

// ---------- Decorative star field ----------
(function () {
  const container = document.getElementById('starsHero');
  for (let i = 0; i < 26; i++) {
    const s = document.createElement('span');
    const size = Math.random() * 3 + 1.5;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.top = Math.random() * 100 + '%';
    s.style.left = Math.random() * 100 + '%';
    s.style.opacity = (Math.random() * 0.35 + 0.15).toFixed(2);
    container.appendChild(s);
  }
})();

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const r = sec.getBoundingClientRect();
    if (r.top <= 120 && r.bottom >= 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current && !a.classList.contains('nav-cta'));
  });
});
