export type TicketStatus = 
  | "open" 
  | "in-progress" 
  | "resolved" 
  | "closed";

export type TicketPriority = 
  | "low" 
  | "medium" 
  | "high" 
  | "urgent";

export type TicketCategory = 
  | "technical-support" 
  | "billing-support" 
  | "general-support" 
  | "sales-support";

export type MessageType = 
  | "customer" 
  | "staff" 
  | "system";

export interface TicketAttachment {
  id: string;
  filename: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface TicketMessage {
  id: string;
  type: MessageType;
  author: {
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
  };
  content: string;
  attachments?: TicketAttachment[];
  createdAt: string;
  isInternal?: boolean;
}

export interface Ticket {
  id: string;
  subject: string;
  category: TicketCategory;
  status: TicketStatus;
  priority: TicketPriority;
  description: string;
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  assignedTo?: {
    name: string;
    email: string;
    avatar?: string;
  };
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  messages: TicketMessage[];
  tags?: string[];
  serviceId?: string;
  estimatedResolution?: string;
}

export interface TicketFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  category?: TicketCategory[];
  search?: string;
  assignedTo?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  averageResponseTime: number;
  averageResolutionTime: number;
}

export interface CreateTicketData {
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  description: string;
  serviceId?: string;
  attachments?: File[];
}

export interface TicketAction {
  id: string;
  type: "status_change" | "priority_change" | "assignment" | "note" | "escalation";
  description: string;
  performedBy: string;
  performedAt: string;
  details?: {
    from?: string;
    to?: string;
    reason?: string;
  };
}
