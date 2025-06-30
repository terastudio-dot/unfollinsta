self.addEventListener('install', function(event) {
  console.log('Service Worker installing...');
});

self.addEventListener('fetch', function(event) {
  // can added offline cache later
});
