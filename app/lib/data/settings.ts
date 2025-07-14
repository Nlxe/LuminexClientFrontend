import { UserSettings, ActivityLog } from "~/lib/types/settings";

// Mock user settings data
export const mockUserSettings: UserSettings = {
  profile: {
    id: "user-001",
    firstName: "John",
    lastName: "Smith",
    email: "john@mybusiness.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
    company: {
      name: "My Business LLC",
      website: "https://mybusiness.com",
      industry: "Technology",
      size: "10-50 employees"
    },
    address: {
      street: "123 Business Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    timezone: "America/New_York",
    language: "en-US",
    createdAt: "2023-06-15T10:30:00Z",
    lastLoginAt: "2024-12-15T14:22:00Z"
  },
  
  security: {
    passwordLastChanged: "2024-10-15T09:15:00Z",
    twoFactorEnabled: true,
    twoFactorMethod: "app",
    backupCodes: [
      "ABC123DEF456",
      "GHI789JKL012",
      "MNO345PQR678",
      "STU901VWX234",
      "YZA567BCD890"
    ],
    apiKeys: [
      {
        id: "api-001",
        name: "Production API",
        key: "lx_live_sk_1234567890abcdef",
        permissions: ["read:services", "write:services", "read:invoices"],
        createdAt: "2024-11-01T10:00:00Z",
        lastUsedAt: "2024-12-14T16:30:00Z",
        isActive: true
      },
      {
        id: "api-002",
        name: "Development API",
        key: "lx_test_sk_abcdef1234567890",
        permissions: ["read:services", "read:tickets"],
        createdAt: "2024-09-15T14:20:00Z",
        lastUsedAt: "2024-12-10T11:45:00Z",
        isActive: true
      },
      {
        id: "api-003",
        name: "Legacy Integration",
        key: "lx_live_sk_fedcba0987654321",
        permissions: ["read:invoices"],
        createdAt: "2024-08-01T08:00:00Z",
        expiresAt: "2024-12-31T23:59:59Z",
        isActive: false
      }
    ],
    activeSessions: [
      {
        id: "session-001",
        deviceName: "MacBook Pro",
        browser: "Chrome 120.0",
        ipAddress: "192.168.1.100",
        location: "New York, NY, US",
        loginAt: "2024-12-15T14:22:00Z",
        lastActiveAt: "2024-12-15T16:45:00Z",
        isCurrent: true
      },
      {
        id: "session-002",
        deviceName: "iPhone 15 Pro",
        browser: "Safari Mobile",
        ipAddress: "10.0.0.50",
        location: "New York, NY, US",
        loginAt: "2024-12-14T09:30:00Z",
        lastActiveAt: "2024-12-14T18:20:00Z",
        isCurrent: false
      },
      {
        id: "session-003",
        deviceName: "Windows Desktop",
        browser: "Edge 119.0",
        ipAddress: "203.0.113.45",
        location: "Remote Office, NY, US",
        loginAt: "2024-12-13T13:15:00Z",
        lastActiveAt: "2024-12-13T17:30:00Z",
        isCurrent: false
      }
    ],
    securityQuestions: [
      {
        id: "sq-001",
        question: "What was the name of your first pet?",
        answer: "encrypted_answer_hash"
      },
      {
        id: "sq-002",
        question: "What city were you born in?",
        answer: "encrypted_answer_hash"
      }
    ],
    loginNotifications: true,
    suspiciousActivityAlerts: true
  },
  
  billing: {
    defaultPaymentMethod: "pm-001",
    paymentMethods: [
      {
        id: "pm-001",
        type: "credit-card",
        isDefault: true,
        details: {
          last4: "4242",
          brand: "Visa",
          expiryMonth: 12,
          expiryYear: 2027
        },
        createdAt: "2024-06-15T10:30:00Z"
      },
      {
        id: "pm-002",
        type: "paypal",
        isDefault: false,
        details: {
          email: "john@mybusiness.com"
        },
        createdAt: "2024-08-20T15:45:00Z"
      },
      {
        id: "pm-003",
        type: "bank-account",
        isDefault: false,
        details: {
          last4: "1234",
          bankName: "Chase Bank",
          accountType: "Checking"
        },
        createdAt: "2024-10-05T11:20:00Z"
      }
    ],
    billingAddress: {
      street: "123 Business Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    },
    taxInformation: {
      taxId: "12-3456789",
      taxExempt: false
    },
    invoicePreferences: {
      emailInvoices: true,
      paperInvoices: false,
      invoiceEmail: "billing@mybusiness.com",
      autoPayEnabled: true,
      paymentTerms: 15
    },
    subscriptionPreferences: {
      autoRenew: true,
      renewalReminders: true,
      upgradeNotifications: true
    }
  },
  
  notifications: {
    email: {
      serviceUpdates: true,
      maintenanceAlerts: true,
      billingReminders: true,
      invoiceNotifications: true,
      ticketUpdates: true,
      securityAlerts: true,
      marketingEmails: false,
      weeklyReports: true
    },
    sms: {
      enabled: true,
      phoneNumber: "+1 (555) 123-4567",
      criticalAlerts: true,
      serviceDowntime: true,
      billingIssues: true,
      securityAlerts: true
    },
    push: {
      enabled: true,
      serviceUpdates: true,
      ticketResponses: true,
      billingReminders: false
    },
    frequency: {
      digest: "daily",
      quietHours: {
        enabled: true,
        start: "22:00",
        end: "08:00"
      }
    }
  },
  
  preferences: {
    theme: "dark",
    compactMode: false,
    showWelcomeMessage: true,
    defaultDashboardView: "overview",
    widgetPreferences: {
      showStats: true,
      showRecentActivity: true,
      showQuickActions: true,
      showSystemStatus: true
    },
    tablePreferences: {
      itemsPerPage: 25,
      defaultSort: "created_desc",
      compactTables: false
    }
  },
  
  activityLogs: []
};

// Mock activity logs
export const mockActivityLogs: ActivityLog[] = [
  {
    id: "log-001",
    type: "login",
    description: "Successful login from MacBook Pro",
    details: {
      device: "MacBook Pro",
      browser: "Chrome 120.0",
      success: true
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    location: "New York, NY, US",
    timestamp: "2024-12-15T14:22:00Z",
    severity: "low"
  },
  {
    id: "log-002",
    type: "profile_update",
    description: "Updated company information",
    details: {
      fields: ["company.website", "company.industry"],
      previousValues: {
        "company.website": "https://oldsite.com",
        "company.industry": "Other"
      }
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    location: "New York, NY, US",
    timestamp: "2024-12-14T16:30:00Z",
    severity: "low"
  },
  {
    id: "log-003",
    type: "payment",
    description: "Payment processed for invoice INV-2024-001",
    details: {
      invoiceId: "inv-001",
      amount: 27.05,
      paymentMethod: "credit-card",
      last4: "4242"
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    location: "New York, NY, US",
    timestamp: "2024-12-12T10:15:00Z",
    severity: "medium"
  },
  {
    id: "log-004",
    type: "security_event",
    description: "Two-factor authentication enabled",
    details: {
      method: "app",
      backupCodesGenerated: 5
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    location: "New York, NY, US",
    timestamp: "2024-12-10T14:45:00Z",
    severity: "medium"
  },
  {
    id: "log-005",
    type: "api_access",
    description: "API key 'Production API' accessed services endpoint",
    details: {
      apiKeyId: "api-001",
      endpoint: "/api/v1/services",
      method: "GET",
      responseCode: 200
    },
    ipAddress: "203.0.113.10",
    userAgent: "LuminexClient-SDK/1.0.0",
    timestamp: "2024-12-14T16:30:00Z",
    severity: "low"
  },
  {
    id: "log-006",
    type: "service_action",
    description: "Restarted Minecraft server srv-002",
    details: {
      serviceId: "srv-002",
      action: "restart",
      reason: "Performance optimization"
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    location: "New York, NY, US",
    timestamp: "2024-12-09T11:20:00Z",
    severity: "medium"
  },
  {
    id: "log-007",
    type: "login",
    description: "Failed login attempt",
    details: {
      reason: "Invalid password",
      attempts: 1
    },
    ipAddress: "198.51.100.42",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    location: "Unknown Location",
    timestamp: "2024-12-08T03:15:00Z",
    severity: "high"
  },
  {
    id: "log-008",
    type: "password_change",
    description: "Password successfully changed",
    details: {
      method: "settings_page",
      previousPasswordAge: "90 days"
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    location: "New York, NY, US",
    timestamp: "2024-10-15T09:15:00Z",
    severity: "medium"
  }
];

// Add activity logs to user settings
mockUserSettings.activityLogs = mockActivityLogs;

// Helper functions
export function getUserSettings(): UserSettings {
  return mockUserSettings;
}

export function getActivityLogs(limit?: number): ActivityLog[] {
  const logs = [...mockActivityLogs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  return limit ? logs.slice(0, limit) : logs;
}

export function updateUserSettings(updates: Partial<UserSettings>): Promise<boolean> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      Object.assign(mockUserSettings, updates);
      resolve(true);
    }, 500);
  });
}
