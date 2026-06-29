// firebase-messaging-sw.js
// ⚠️ Ye file ROOT me honi chahiye (same level as index.html)
// Netlify me: drag-drop ke saath index.html ke saath upload karo

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// ===== APNI VALUES YAHAN DALO =====
firebase.initializeApp({
  apiKey: "AIzaSyBdXSpkO1yCt_jPk8Dh4GYfPUTCMdgaRy8",
  authDomain: "teria-game-app.firebaseapp.com",
  projectId: "teria-game-app",
  messagingSenderId: "953000475466",
  appId: "1:953000475466:web:daf89bb21f6c590dc9dfb3"
});
// ==================================

const messaging = firebase.messaging();

// Background notification handler
messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Background message received:', payload);
  
  const title = payload.notification?.title || 'Teria';
  const options = {
    body: payload.notification?.body || 'You have a new notification',
    icon: '/icon-192.png',  // optional — add a 192x192 icon if you have one
    badge: '/icon-72.png',
    data: payload.data || {},
    actions: [
      { action: 'open', title: '🎴 Open Teria' },
      { action: 'dismiss', title: 'Dismiss' }
    ],
    vibrate: [200, 100, 200],
    requireInteraction: false
  };

  return self.registration.showNotification(title, options);
});

// Click handler — opens the app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'dismiss') return;
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Agar app already open hai toh focus karo
      for (const client of clientList) {
        if (client.url.includes('netlify.app') && 'focus' in client) {
          return client.focus();
        }
      }
      // Nahi toh naya tab kholo
      if (clients.openWindow) {
        return clients.openWindow('https://lustrous-halva-070fd3.netlify.app');
      }
    })
  );
});
