import { BellIcon, CogIcon, CreditCardIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Billing from '../pages/SettingsPages/Billing';
import Profile from '../pages/SettingsPages/Profile';
import Security from '../pages/SettingsPages/Security';

export const tiers = [
  {
    name: 'Freelancer',
    id: 'tier-freelancer',
    href: '#',
    priceMonthly: '70 RON',
    description: 'The essentials to provide your best work for clients.',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    mostPopular: false,
    type: 'freelancer',
  },
  {
    name: 'Startup',
    id: 'tier-startup',
    href: '#',
    priceMonthly: '100 RON',
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations',
    ],
    mostPopular: true,
    type: 'startup',
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: '150 RON',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
    ],
    mostPopular: false,
    type: 'enterprise',
  },
];

export const profilePath = '/settings?type=profile';
export const billingPath = '/settings?type=billing';
export const securityPath = '/settings?type=security';

export const mainNavigation = [
  { name: 'Homepage', href: '/homepage', current: true, restricted: false },
  { name: 'Projects', href: '#', current: false, restricted: false  },
  { name: 'Team', href: '#', current: false, restricted: false  },
  { name: 'Pricing', href: '/pricing', current: false, restricted: false  },
  { name: 'Settings', href: profilePath, current: false, restricted: true  },
];

export const subNavigation = [
  { name: 'Profile', href: profilePath, icon: UserCircleIcon, current: true },
  { name: 'Account', href: '#', icon: CogIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Billing', href: billingPath, icon: CreditCardIcon, current: false },
  { name: 'Security Settings', href: securityPath, icon: KeyIcon, current: false },
];

export const settingsPages = {
  profile: <Profile />,
  billing: <Billing />,
  security: <Security />
};

export const billingPeriods = {
  month: 'Monthly',
  year: 'Yearly',
}

export const cardTypes = {
  visa: 'Visa',
  mastercard: 'Mastercard',
}

export const cardData = { 
  name: '',
  cardNumber: '',
  expirationDate: '',
  cvc: '',
}

export const updateEmailData = {
  email: '',
  confirmEmail: '',
}

export const updatePasswordData = {
  password: '',
  passwordConfirmation: '',
}

export const refreshTokenMilliseconds = 300000; // 5 minutes interval