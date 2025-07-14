export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  company?: {
    name: string;
    website?: string;
    industry?: string;
    size?: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  timezone: string;
  language: string;
  createdAt: string;
  lastLoginAt: string;
}

export interface SecuritySettings {
  passwordLastChanged: string;
  twoFactorEnabled: boolean;
  twoFactorMethod?: "sms" | "app" | "email";
  backupCodes?: string[];
  apiKeys: ApiKey[];
  activeSessions: LoginSession[];
  securityQuestions?: SecurityQuestion[];
  loginNotifications: boolean;
  suspiciousActivityAlerts: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface LoginSession {
  id: string;
  deviceName: string;
  browser: string;
  ipAddress: string;
  location: string;
  loginAt: string;
  lastActiveAt: string;
  isCurrent: boolean;
}

export interface SecurityQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface BillingSettings {
  defaultPaymentMethod?: string;
  paymentMethods: PaymentMethodInfo[];
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  taxInformation: {
    taxId?: string;
    vatNumber?: string;
    taxExempt: boolean;
    taxExemptReason?: string;
  };
  invoicePreferences: {
    emailInvoices: boolean;
    paperInvoices: boolean;
    invoiceEmail?: string;
    autoPayEnabled: boolean;
    paymentTerms: number;
  };
  subscriptionPreferences: {
    autoRenew: boolean;
    renewalReminders: boolean;
    upgradeNotifications: boolean;
  };
}

export interface PaymentMethodInfo {
  id: string;
  type: "credit-card" | "paypal" | "bank-account";
  isDefault: boolean;
  details: {
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
    email?: string;
    bankName?: string;
    accountType?: string;
  };
  createdAt: string;
}

export interface NotificationPreferences {
  email: {
    serviceUpdates: boolean;
    maintenanceAlerts: boolean;
    billingReminders: boolean;
    invoiceNotifications: boolean;
    ticketUpdates: boolean;
    securityAlerts: boolean;
    marketingEmails: boolean;
    weeklyReports: boolean;
  };
  sms: {
    enabled: boolean;
    phoneNumber?: string;
    criticalAlerts: boolean;
    serviceDowntime: boolean;
    billingIssues: boolean;
    securityAlerts: boolean;
  };
  push: {
    enabled: boolean;
    serviceUpdates: boolean;
    ticketResponses: boolean;
    billingReminders: boolean;
  };
  frequency: {
    digest: "immediate" | "hourly" | "daily" | "weekly";
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
}

export interface ActivityLog {
  id: string;
  type: "login" | "logout" | "password_change" | "profile_update" | "payment" | "service_action" | "api_access" | "security_event";
  description: string;
  details?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  location?: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
}

export interface DashboardPreferences {
  theme: "dark" | "light" | "auto";
  compactMode: boolean;
  showWelcomeMessage: boolean;
  defaultDashboardView: "overview" | "services" | "tickets" | "invoices";
  widgetPreferences: {
    showStats: boolean;
    showRecentActivity: boolean;
    showQuickActions: boolean;
    showSystemStatus: boolean;
  };
  tablePreferences: {
    itemsPerPage: number;
    defaultSort: string;
    compactTables: boolean;
  };
}

export interface UserSettings {
  profile: UserProfile;
  security: SecuritySettings;
  billing: BillingSettings;
  notifications: NotificationPreferences;
  preferences: DashboardPreferences;
  activityLogs: ActivityLog[];
}

export type SettingsTab = 
  | "account" 
  | "security" 
  | "billing" 
  | "notifications" 
  | "activity" 
  | "preferences";

export interface SettingsFormData {
  [key: string]: any;
}

export interface SettingsUpdateResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}
