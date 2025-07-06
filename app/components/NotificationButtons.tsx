'use client';

import { useState } from 'react';
import NotificationService from './NotificationService';

export default function NotificationButtons() {
  const [isLoading, setIsLoading] = useState(false);
  const [timedNotificationScheduled, setTimedNotificationScheduled] = useState(false);
  const notificationService = NotificationService();

  const handleSendNotification = async () => {
    setIsLoading(true);
    try {
      await notificationService.sendNotification('Hello! This is an immediate notification from your PWA!');
    } catch (error) {
      console.error('Error sending notification:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTimedNotification = async () => {
    setIsLoading(true);
    setTimedNotificationScheduled(true);
    try {
      await notificationService.sendTimedNotification(
        30000, // 30 seconds
        'This is a timed notification that was scheduled 30 seconds ago!'
      );
      
      // Reset the scheduled state after 30 seconds
      setTimeout(() => {
        setTimedNotificationScheduled(false);
      }, 30000);
    } catch (error) {
      console.error('Error scheduling timed notification:', error);
      setTimedNotificationScheduled(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!notificationService.isSupported) {
    return (
      <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          Push notifications are not supported in this browser
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" role="region" aria-labelledby="notifications-heading">
      <div className="text-center">
        <h3 id="notifications-heading" className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Push Notifications
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Test push notification functionality
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleSendNotification}
          disabled={isLoading || notificationService.permission === 'denied'}
          className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-sm sm:text-base"
          aria-label="Send immediate push notification"
          aria-describedby="notification-status"
        >
          {isLoading ? 'Sending...' : 'Send Notification'}
        </button>

        <button
          onClick={handleSendTimedNotification}
          disabled={isLoading || timedNotificationScheduled || notificationService.permission === 'denied'}
          className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed text-sm sm:text-base"
          aria-label="Schedule a push notification for 30 seconds from now"
          aria-describedby="notification-status"
        >
          {timedNotificationScheduled 
            ? 'Scheduled (30s)' 
            : isLoading 
              ? 'Scheduling...' 
              : 'Send Timed Notification'
          }
        </button>
      </div>

      {notificationService.permission === 'default' && (
        <div className="text-center">
          <button
            onClick={notificationService.requestPermission}
            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
            aria-label="Request permission to send push notifications"
          >
            Enable Notifications
          </button>
        </div>
      )}

      {notificationService.permission === 'denied' && (
        <div id="notification-status" className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800" role="alert">
          <p className="text-red-800 dark:text-red-200 text-sm">
            Notifications are blocked. Please enable them in your browser settings.
          </p>
        </div>
      )}

      {notificationService.permission === 'granted' && (
        <div id="notification-status" className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800" role="status">
          <p className="text-green-800 dark:text-green-200 text-sm">
            ✓ Notifications are enabled
          </p>
        </div>
      )}
    </div>
  );
} 