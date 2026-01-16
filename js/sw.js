if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered ✅'))
      .catch(err => console.error('Service Worker registration failed ❌', err));
    }
  fetch('manifest.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('appVersion').textContent = `version: ${data.version}`;
    });