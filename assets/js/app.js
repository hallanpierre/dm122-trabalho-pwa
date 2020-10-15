class App {
    constructor() {
        this.registerServiceWorker();
    }

    registerServiceWorker() {
        if (!'serviceWorker' in navigator) {
          console.info('Offline feature is not available on this browser');
          return;
        }
    
        const onsuccess = () => console.log('[Service Worker] Registered');
        const onfailure = () => console.log('[Service Worker] Failed');
    
        navigator.serviceWorker
          .register('sw.js')
          .then(onsuccess)
          .catch(onfailure)
    }
}
  
new App();