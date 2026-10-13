(() => {
  const loginView = document.querySelector('#login-view');
  const portfolioView = document.querySelector('#portfolio-view');
  const loginForm = document.querySelector('#login-form');
  const snackbar = document.querySelector('#snackbar');
  const snackbarText = snackbar.querySelector('span');
  const password = document.querySelector('#password');
  const passwordToggle = document.querySelector('.password-toggle');
  const logoutButton = document.querySelector('#logout-button');
  const slides = [...document.querySelectorAll('.achievement-slide')];
  const activities = [...document.querySelectorAll('.activity-item')];
  const indicator = document.querySelector('#slide-indicator');
  const progressFill = document.querySelector('#progress-fill');
  const mediaButton = document.querySelector('#media-button');
  let snackTimer;
  let currentSlide = 0;
  let slideshowTimer;

  function showSnack(message) {
    snackbarText.textContent = message;
    snackbar.classList.add('is-visible');
    window.clearTimeout(snackTimer);
    snackTimer = window.setTimeout(() => snackbar.classList.remove('is-visible'), 3600);
  }

  function setSlide(next) {
    currentSlide = (next + slides.length) % slides.length;
    slides.forEach((slide, index) => slide.classList.toggle('is-visible', index === currentSlide));
    activities.forEach((activity, index) => {
      activity.classList.toggle('is-active', index === currentSlide);
      activity.setAttribute('aria-current', index === currentSlide ? 'true' : 'false');
    });
    indicator.textContent = String(currentSlide + 1).padStart(2, '0');
    progressFill.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
  }

  function restartSlideshow() {
    window.clearInterval(slideshowTimer);
    slideshowTimer = window.setInterval(() => setSlide(currentSlide + 1), 5200);
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const rollNo = document.querySelector('#roll-no').value.trim();
    const pass = password.value.trim();
    if (!rollNo || !pass) {
      showSnack(!rollNo && !pass ? 'Please enter your roll number and password.' : !rollNo ? 'Please enter your roll number.' : 'Please enter your password.');
      (!rollNo ? document.querySelector('#roll-no') : password).focus();
      return;
    }
    loginView.classList.add('is-hidden');
    portfolioView.classList.remove('is-hidden');
    window.scrollTo({ top: 0, behavior: 'instant' });
    showSnack('Welcome in — explore Sathvika’s portfolio.');
    restartSlideshow();
  });

  passwordToggle.addEventListener('click', () => {
    const isPassword = password.type === 'password';
    password.type = isPassword ? 'text' : 'password';
    passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    passwordToggle.innerHTML = `<i class="ri-eye${isPassword ? '-off' : ''}-line"></i>`;
  });

  logoutButton.addEventListener('click', () => {
    portfolioView.classList.add('is-hidden');
    loginView.classList.remove('is-hidden');
    loginForm.reset();
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.clearInterval(slideshowTimer);
    showSnack('You have exited the portfolio.');
  });

  document.querySelector('#carousel-prev').addEventListener('click', () => { setSlide(currentSlide - 1); restartSlideshow(); });
  document.querySelector('#carousel-next').addEventListener('click', () => { setSlide(currentSlide + 1); restartSlideshow(); });
  activities.forEach((activity) => activity.addEventListener('click', () => { setSlide(Number(activity.dataset.slide)); restartSlideshow(); }));

  mediaButton.addEventListener('click', () => {
    const active = mediaButton.classList.toggle('is-playing');
    mediaButton.querySelector('i').className = active ? 'ri-pause-circle-line' : 'ri-play-circle-line';
    mediaButton.querySelector('span').textContent = active ? 'Pause visual moodboard' : 'Play visual moodboard';
    if (active) restartSlideshow(); else window.clearInterval(slideshowTimer);
    showSnack(active ? 'Visual moodboard playing — abstract portfolio visuals only.' : 'Visual moodboard paused.');
  });

  // Certificate buttons are verified external links from the supplied resume source.
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', () => { if (portfolioView.classList.contains('is-hidden')) return; }));
  setSlide(0);
})();
