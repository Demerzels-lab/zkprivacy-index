import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface WelcomeNotificationProps {
  onDismiss?: () => void;
}

const WelcomeNotification: React.FC<WelcomeNotificationProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the notification before
    const dismissed = localStorage.getItem('welcome-notification-dismissed');
    if (!dismissed) {
      // Show notification after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setHasBeenDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasBeenDismissed(true);
    localStorage.setItem('welcome-notification-dismissed', 'true');
    onDismiss?.();
  };

  const handleContinue = () => {
    handleDismiss();
  };

  if (hasBeenDismissed) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <div className="welcome-notification" id="welcome-notification">
          <div className="notification-content">
            <div className="notification-dot"></div>
            <span className="notification-text">
              Welcome to ZKPrivacy Index - Your privacy-focused crypto analytics platform
            </span>
          </div>
          <button className="get-started-btn" onClick={handleContinue}>
            Continue
          </button>
          <button className="close-btn" onClick={handleDismiss}>
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
};

export default WelcomeNotification;