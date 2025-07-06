'use client';

import { useState, useEffect } from 'react';

export default function NotificationService() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) {
      alert('Push notifications are not supported in this browser');
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const subscribeToPush = async () => {
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return null;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      
      if (existingSubscription) {
        setSubscription(existingSubscription);
        return existingSubscription;
      }

      // Create new subscription
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BEl62iUYgUivxIkv69yViEuiBIa1HxMqJwUaRzMp4E4XK18N8K4hTZy8HmCvzVraQom3_9Qz6nUHCfioQ0YJZQ' // This is a sample VAPID key
        )
      });

      setSubscription(newSubscription);
      return newSubscription;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return null;
    }
  };

  const sendNotification = async (message: string = 'Hello from Simple PWA!') => {
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Send notification through service worker
      registration.active?.postMessage({
        type: 'SEND_NOTIFICATION',
        payload: {
          title: 'Simple PWA',
          body: message,
          icon: '/next.svg'
        }
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const sendTimedNotification = async (delay: number = 30000, message: string = 'Timed notification from Simple PWA!') => {
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return;
    }

    setTimeout(() => {
      sendNotification(message);
    }, delay);
  };

  // Convert VAPID key from base64 to Uint8Array
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return {
    isSupported,
    permission,
    subscription,
    requestPermission,
    subscribeToPush,
    sendNotification,
    sendTimedNotification
  };
} 