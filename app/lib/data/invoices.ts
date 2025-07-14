import { Invoice, InvoiceStatus, PaymentMethod, InvoiceStats } from "~/lib/types/invoices";

// Mock invoice data with realistic hosting provider scenarios
export const mockInvoices: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "INV-2024-001",
    status: "unpaid",
    issuedAt: "2024-12-01T00:00:00Z",
    dueAt: "2024-12-15T23:59:59Z",
    customer: {
      name: "John Smith",
      email: "john@mybusiness.com",
      company: "My Business LLC",
      address: {
        street: "123 Business St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States"
      }
    },
    lineItems: [
      {
        id: "li-001",
        description: "Pro Hosting Plan - December 2024",
        quantity: 1,
        unitPrice: 9.99,
        total: 9.99,
        serviceId: "srv-001",
        servicePeriod: {
          start: "2024-12-01T00:00:00Z",
          end: "2024-12-31T23:59:59Z"
        },
        taxable: true
      },
      {
        id: "li-002",
        description: "SSL Certificate - mybusiness.com",
        quantity: 1,
        unitPrice: 15.00,
        total: 15.00,
        servicePeriod: {
          start: "2024-12-01T00:00:00Z",
          end: "2025-12-01T00:00:00Z"
        },
        taxable: true
      }
    ],
    subtotal: 24.99,
    taxes: [
      {
        id: "tax-001",
        name: "Sales Tax (NY)",
        rate: 8.25,
        amount: 2.06,
        taxableAmount: 24.99
      }
    ],
    totalTax: 2.06,
    total: 27.05,
    amountPaid: 0,
    amountDue: 27.05,
    currency: "USD",
    paymentTerms: "Net 15",
    notes: "Thank you for your business!",
    paymentHistory: [],
    remindersSent: 1,
    lastReminderAt: "2024-12-10T10:00:00Z"
  },
  {
    id: "inv-002",
    invoiceNumber: "INV-2024-002",
    status: "paid",
    issuedAt: "2024-11-01T00:00:00Z",
    dueAt: "2024-11-15T23:59:59Z",
    paidAt: "2024-11-12T14:30:00Z",
    customer: {
      name: "Emily Davis",
      email: "emily@techstartup.io",
      company: "Tech Startup Inc",
      address: {
        street: "456 Innovation Ave",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "United States"
      }
    },
    lineItems: [
      {
        id: "li-003",
        description: "Enterprise Hosting Plan - November 2024",
        quantity: 1,
        unitPrice: 19.99,
        total: 19.99,
        serviceId: "srv-003",
        servicePeriod: {
          start: "2024-11-01T00:00:00Z",
          end: "2024-11-30T23:59:59Z"
        },
        taxable: true
      },
      {
        id: "li-004",
        description: "Domain Registration - techstartup.io",
        quantity: 1,
        unitPrice: 12.99,
        total: 12.99,
        servicePeriod: {
          start: "2024-11-01T00:00:00Z",
          end: "2025-11-01T00:00:00Z"
        },
        taxable: true
      },
      {
        id: "li-005",
        description: "CDN Service - November 2024",
        quantity: 1,
        unitPrice: 5.00,
        total: 5.00,
        servicePeriod: {
          start: "2024-11-01T00:00:00Z",
          end: "2024-11-30T23:59:59Z"
        },
        taxable: true
      }
    ],
    subtotal: 37.98,
    taxes: [
      {
        id: "tax-002",
        name: "Sales Tax (CA)",
        rate: 7.25,
        amount: 2.75,
        taxableAmount: 37.98
      }
    ],
    totalTax: 2.75,
    total: 40.73,
    amountPaid: 40.73,
    amountDue: 0,
    currency: "USD",
    paymentTerms: "Net 15",
    paymentHistory: [
      {
        id: "pay-001",
        amount: 40.73,
        method: "credit-card",
        status: "completed",
        transactionId: "txn_1234567890",
        gateway: "Stripe",
        processedAt: "2024-11-12T14:30:00Z"
      }
    ],
    remindersSent: 0
  },
  {
    id: "inv-003",
    invoiceNumber: "INV-2024-003",
    status: "overdue",
    issuedAt: "2024-10-01T00:00:00Z",
    dueAt: "2024-10-15T23:59:59Z",
    customer: {
      name: "Alex Chen",
      email: "alex@gamingcommunity.net",
      company: "Gaming Community Network",
      address: {
        street: "789 Gaming Blvd",
        city: "Austin",
        state: "TX",
        zipCode: "73301",
        country: "United States"
      }
    },
    lineItems: [
      {
        id: "li-006",
        description: "Minecraft Pro Server - October 2024",
        quantity: 1,
        unitPrice: 16.99,
        total: 16.99,
        serviceId: "srv-002",
        servicePeriod: {
          start: "2024-10-01T00:00:00Z",
          end: "2024-10-31T23:59:59Z"
        },
        taxable: true
      },
      {
        id: "li-007",
        description: "DDoS Protection",
        quantity: 1,
        unitPrice: 8.00,
        total: 8.00,
        servicePeriod: {
          start: "2024-10-01T00:00:00Z",
          end: "2024-10-31T23:59:59Z"
        },
        taxable: true
      }
    ],
    subtotal: 24.99,
    taxes: [],
    totalTax: 0,
    total: 24.99,
    amountPaid: 0,
    amountDue: 24.99,
    currency: "USD",
    paymentTerms: "Net 15",
    notes: "Payment is now overdue. Please remit payment immediately to avoid service suspension.",
    paymentHistory: [
      {
        id: "pay-002",
        amount: 24.99,
        method: "credit-card",
        status: "failed",
        processedAt: "2024-10-16T10:00:00Z",
        failureReason: "Insufficient funds"
      }
    ],
    remindersSent: 3,
    lastReminderAt: "2024-11-01T09:00:00Z"
  },
  {
    id: "inv-004",
    invoiceNumber: "INV-2024-004",
    status: "paid",
    issuedAt: "2024-09-01T00:00:00Z",
    dueAt: "2024-09-15T23:59:59Z",
    paidAt: "2024-09-08T16:45:00Z",
    customer: {
      name: "Maria Garcia",
      email: "maria@localstore.com",
      company: "Local Store",
      address: {
        street: "321 Main Street",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85001",
        country: "United States"
      }
    },
    lineItems: [
      {
        id: "li-008",
        description: "Basic Hosting Plan - September 2024",
        quantity: 1,
        unitPrice: 4.99,
        total: 4.99,
        serviceId: "srv-004",
        servicePeriod: {
          start: "2024-09-01T00:00:00Z",
          end: "2024-09-30T23:59:59Z"
        },
        taxable: true
      },
      {
        id: "li-009",
        description: "Email Hosting - 5 accounts",
        quantity: 5,
        unitPrice: 2.00,
        total: 10.00,
        servicePeriod: {
          start: "2024-09-01T00:00:00Z",
          end: "2024-09-30T23:59:59Z"
        },
        taxable: true
      }
    ],
    subtotal: 14.99,
    taxes: [
      {
        id: "tax-003",
        name: "Sales Tax (AZ)",
        rate: 5.60,
        amount: 0.84,
        taxableAmount: 14.99
      }
    ],
    totalTax: 0.84,
    total: 15.83,
    amountPaid: 15.83,
    amountDue: 0,
    currency: "USD",
    paymentTerms: "Net 15",
    paymentHistory: [
      {
        id: "pay-003",
        amount: 15.83,
        method: "paypal",
        status: "completed",
        transactionId: "PAY-9876543210",
        gateway: "PayPal",
        processedAt: "2024-09-08T16:45:00Z"
      }
    ],
    remindersSent: 0
  },
  {
    id: "inv-005",
    invoiceNumber: "INV-2024-005",
    status: "draft",
    issuedAt: "2024-12-15T00:00:00Z",
    dueAt: "2024-12-30T23:59:59Z",
    customer: {
      name: "Robert Wilson",
      email: "robert@growingbiz.com",
      company: "Growing Business Corp",
      address: {
        street: "555 Corporate Dr",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "United States"
      }
    },
    lineItems: [
      {
        id: "li-010",
        description: "Enterprise Hosting Plan - January 2025",
        quantity: 1,
        unitPrice: 19.99,
        total: 19.99,
        servicePeriod: {
          start: "2025-01-01T00:00:00Z",
          end: "2025-01-31T23:59:59Z"
        },
        taxable: true
      },
      {
        id: "li-011",
        description: "Backup Service - January 2025",
        quantity: 1,
        unitPrice: 7.99,
        total: 7.99,
        servicePeriod: {
          start: "2025-01-01T00:00:00Z",
          end: "2025-01-31T23:59:59Z"
        },
        taxable: true
      }
    ],
    subtotal: 27.98,
    taxes: [
      {
        id: "tax-004",
        name: "Sales Tax (IL)",
        rate: 6.25,
        amount: 1.75,
        taxableAmount: 27.98
      }
    ],
    totalTax: 1.75,
    total: 29.73,
    amountPaid: 0,
    amountDue: 29.73,
    currency: "USD",
    paymentTerms: "Net 15",
    notes: "Draft invoice - will be sent on December 20th",
    paymentHistory: [],
    remindersSent: 0
  }
];

// Helper functions
export function getInvoicesByStatus(status: InvoiceStatus): Invoice[] {
  return mockInvoices.filter(invoice => invoice.status === status);
}

export function getInvoiceById(id: string): Invoice | undefined {
  return mockInvoices.find(invoice => invoice.id === id);
}

export function getInvoiceStats(): InvoiceStats {
  const total = mockInvoices.length;
  const paid = getInvoicesByStatus("paid").length;
  const unpaid = getInvoicesByStatus("unpaid").length;
  const overdue = getInvoicesByStatus("overdue").length;
  const draft = getInvoicesByStatus("draft").length;

  const totalRevenue = mockInvoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  const outstandingAmount = mockInvoices
    .filter(inv => inv.status === "unpaid" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amountDue, 0);

  const averageInvoiceValue = mockInvoices.length > 0 
    ? mockInvoices.reduce((sum, inv) => sum + inv.total, 0) / mockInvoices.length 
    : 0;

  return {
    total,
    paid,
    unpaid,
    overdue,
    draft,
    totalRevenue,
    outstandingAmount,
    averageInvoiceValue
  };
}

export const paymentMethods = [
  {
    id: "credit-card" as PaymentMethod,
    name: "Credit Card",
    description: "Visa, MasterCard, American Express",
    icon: "💳"
  },
  {
    id: "paypal" as PaymentMethod,
    name: "PayPal",
    description: "Pay with your PayPal account",
    icon: "🅿️"
  },
  {
    id: "bank-transfer" as PaymentMethod,
    name: "Bank Transfer",
    description: "Direct bank transfer (ACH)",
    icon: "🏦"
  },
  {
    id: "account-credit" as PaymentMethod,
    name: "Account Credit",
    description: "Use available account credit",
    icon: "💰"
  }
];
