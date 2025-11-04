// Type definitions for ZKPrivacy Index

export interface CryptoCurrency {
  id: string;
  name: string;
  ticker: string;
  description: string;
  launchDate: string;
  privacyScore: number;
  status: 'verified' | 'pending' | 'upcoming';
  logoUrl?: string;
  officialTwitter?: string;
  githubRepository?: string;
  devForum?: string;
}

export interface MetricCard {
  number: string;
  label: string;
}

export interface HeroMetrics {
  privacyScore: string;
  realTimeUpdates: string;
  zeroTracking: string;
}

export interface NotificationData {
  id: string;
  title: string;
  content: string;
  isVisible: boolean;
}

export interface WelcomeNotificationState {
  isVisible: boolean;
  hasBeenDismissed: boolean;
}