const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/
  )
);

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(() => console.log("SW registered"))
    .catch(err => console.log("SW error:", err));
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then(response => {
      if (response.status === 404) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => window.location.reload());
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => console.log("No internet"));
}

export function unregister() {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}