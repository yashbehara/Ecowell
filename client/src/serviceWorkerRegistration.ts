const register = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        navigator.serviceWorker.register(swUrl).then(registration => {
          console.log('Service Worker registered: ', registration);
        }).catch(error => {
          console.error('Service Worker registration failed: ', error);
        });
      });
    }
  };
  
  // Function to unregister the service worker
  const unregister = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.unregister();
      });
    }
  };
  
  export { register, unregister };
  