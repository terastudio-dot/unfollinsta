  window.addEventListener('load', () => {
    setTimeout(() => {
      const splash = document.getElementById('splashScreen');
      if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 500);
      }
    }, 500); // show splash screen on 1.5 seconds
  });