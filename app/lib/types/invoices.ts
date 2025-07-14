export type InvoiceStatus = 
  | "paid" 
  | "unpaid" 
  | "overdue" 
  | "draft" 
  | "cancelled" 
  | "refunded";

export type PaymentMethod = 
  | "credit-card" 
  | "paypal" 
  | "bank-transfer" 
  | "account-credit";

export type PaymentStatus = 
  | "completed" 
  | "pending" 
  | "failed" 
  | "refunded" 
  | "partial";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  serviceId?: string;
  servicePeriod?: {
    start: string;
    end: string;
  };
  taxable: boolean;
}

export interface InvoiceTax {
  id: string;
  name: string;
  rate: number;
  amount: number;
  taxableAmount: number;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  gateway?: string;
  processedAt: string;
  failureReason?: string;
  refundedAmount?: number;
  refundedAt?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt: string;
  paidAt?: string;
  customer: {
    name: string;
    email: string;
    company?: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxes: InvoiceTax[];
  totalTax: number;
  total: number;
  amountPaid: number;
  amountDue: number;
  currency: string;
  paymentTerms: string;
  notes?: string;
  paymentHistory: PaymentTransaction[];
  downloadUrl?: string;
  remindersSent: number;
  lastReminderAt?: string;
}

export interface InvoiceFilters {
  status?: InvoiceStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  search?: string;
  paymentMethod?: PaymentMethod[];
}

export interface InvoiceStats {
  total: number;
  paid: number;
  unpaid: number;
  overdue: number;
  draft: number;
  totalRevenue: number;
  outstandingAmount: number;
  averageInvoiceValue: number;
}

export interface PaymentFormData {
  paymentMethod: PaymentMethod;
  amount: number;
  cardDetails?: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardholderName: string;
  };
  paypalEmail?: string;
  bankDetails?: {
    accountNumber: string;
    routingNumber: string;
    accountHolderName: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface InvoiceAction {
  id: string;
  type: "payment" | "reminder" | "status_change" | "refund" | "note";
  description: string;
  performedBy: string;
  performedAt: string;
  amount?: number;
  details?: {
    from?: string;
    to?: string;
    reason?: string;
  };
}
