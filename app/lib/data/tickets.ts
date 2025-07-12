import { Ticket, TicketCategory, TicketStatus, TicketPriority, TicketStats } from "~/lib/types/tickets";

// Mock ticket data with realistic support scenarios
export const mockTickets: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Website loading extremely slow",
    category: "technical-support",
    status: "open",
    priority: "high",
    description: "My website has been loading very slowly for the past 2 days. Page load times are over 10 seconds. This is affecting my business significantly.",
    createdAt: "2024-12-10T14:30:00Z",
    updatedAt: "2024-12-10T16:45:00Z",
    customer: {
      name: "John Smith",
      email: "john@mybusiness.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    },
    assignedTo: {
      name: "Sarah Wilson",
      email: "sarah@luminexclient.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
    },
    messages: [
      {
        id: "msg-001",
        type: "customer",
        author: {
          name: "John Smith",
          email: "john@mybusiness.com"
        },
        content: "My website has been loading very slowly for the past 2 days. Page load times are over 10 seconds. This is affecting my business significantly. Can you please help?",
        createdAt: "2024-12-10T14:30:00Z"
      },
      {
        id: "msg-002",
        type: "staff",
        author: {
          name: "Sarah Wilson",
          email: "sarah@luminexclient.com",
          role: "Technical Support"
        },
        content: "Hi John, I'm sorry to hear about the slow loading times. I've assigned this ticket to our technical team and we'll investigate immediately. Can you please provide your domain name so we can run some diagnostics?",
        createdAt: "2024-12-10T15:15:00Z"
      },
      {
        id: "msg-003",
        type: "customer",
        author: {
          name: "John Smith",
          email: "john@mybusiness.com"
        },
        content: "The domain is mybusiness.com. Thank you for the quick response!",
        createdAt: "2024-12-10T16:45:00Z"
      }
    ],
    serviceId: "srv-001",
    estimatedResolution: "2024-12-11T12:00:00Z",
    tags: ["performance", "website", "urgent"]
  },
  {
    id: "TKT-002",
    subject: "Invoice payment failed",
    category: "billing-support",
    status: "resolved",
    priority: "medium",
    description: "My automatic payment failed and I received a notice. I need to update my payment method.",
    createdAt: "2024-12-08T09:20:00Z",
    updatedAt: "2024-12-09T11:30:00Z",
    closedAt: "2024-12-09T11:30:00Z",
    customer: {
      name: "Emily Davis",
      email: "emily@techstartup.io"
    },
    assignedTo: {
      name: "Mike Johnson",
      email: "mike@luminexclient.com"
    },
    messages: [
      {
        id: "msg-004",
        type: "customer",
        author: {
          name: "Emily Davis",
          email: "emily@techstartup.io"
        },
        content: "Hi, my automatic payment failed and I received a notice. I need to update my payment method. How can I do this?",
        createdAt: "2024-12-08T09:20:00Z"
      },
      {
        id: "msg-005",
        type: "staff",
        author: {
          name: "Mike Johnson",
          email: "mike@luminexclient.com",
          role: "Billing Support"
        },
        content: "Hello Emily, I can help you update your payment method. Please log into your client area and go to Billing > Payment Methods. You can add a new card there. I've also extended your grace period by 5 days.",
        createdAt: "2024-12-08T10:45:00Z"
      },
      {
        id: "msg-006",
        type: "customer",
        author: {
          name: "Emily Davis",
          email: "emily@techstartup.io"
        },
        content: "Perfect! I've updated my payment method and the payment went through. Thank you for the extension!",
        createdAt: "2024-12-09T11:30:00Z"
      },
      {
        id: "msg-007",
        type: "staff",
        author: {
          name: "Mike Johnson",
          email: "mike@luminexclient.com",
          role: "Billing Support"
        },
        content: "Great! I can confirm the payment was successful. Your account is now up to date. Is there anything else I can help you with?",
        createdAt: "2024-12-09T11:30:00Z"
      }
    ],
    tags: ["billing", "payment", "resolved"]
  },
  {
    id: "TKT-003",
    subject: "Minecraft server keeps crashing",
    category: "technical-support",
    status: "in-progress",
    priority: "urgent",
    description: "Our Minecraft server has been crashing every 2-3 hours since yesterday. Players are getting disconnected and we're losing progress.",
    createdAt: "2024-12-09T18:00:00Z",
    updatedAt: "2024-12-10T10:30:00Z",
    customer: {
      name: "Alex Chen",
      email: "alex@gamingcommunity.net"
    },
    assignedTo: {
      name: "David Rodriguez",
      email: "david@luminexclient.com"
    },
    messages: [
      {
        id: "msg-008",
        type: "customer",
        author: {
          name: "Alex Chen",
          email: "alex@gamingcommunity.net"
        },
        content: "Our Minecraft server has been crashing every 2-3 hours since yesterday. Players are getting disconnected and we're losing progress. This is really urgent as we have a tournament this weekend!",
        createdAt: "2024-12-09T18:00:00Z"
      },
      {
        id: "msg-009",
        type: "staff",
        author: {
          name: "David Rodriguez",
          email: "david@luminexclient.com",
          role: "Senior Technical Support"
        },
        content: "Hi Alex, I understand this is urgent. I'm looking at your server logs now. I can see memory spikes that are causing the crashes. It appears to be related to a plugin conflict. I'm investigating which plugin is causing the issue.",
        createdAt: "2024-12-09T20:15:00Z"
      },
      {
        id: "msg-010",
        type: "system",
        author: {
          name: "System",
          role: "Automated"
        },
        content: "Server restart initiated by support team for diagnostic purposes.",
        createdAt: "2024-12-09T20:30:00Z"
      },
      {
        id: "msg-011",
        type: "staff",
        author: {
          name: "David Rodriguez",
          email: "david@luminexclient.com",
          role: "Senior Technical Support"
        },
        content: "I've identified the problematic plugin and temporarily disabled it. Your server should be stable now. I'm working on a permanent fix and will update you within 2 hours.",
        createdAt: "2024-12-10T10:30:00Z"
      }
    ],
    serviceId: "srv-002",
    estimatedResolution: "2024-12-10T18:00:00Z",
    tags: ["minecraft", "crash", "urgent", "plugin-conflict"]
  },
  {
    id: "TKT-004",
    subject: "Request for SSL certificate installation",
    category: "general-support",
    status: "closed",
    priority: "low",
    description: "I need help installing an SSL certificate for my domain. I have the certificate files ready.",
    createdAt: "2024-12-05T11:15:00Z",
    updatedAt: "2024-12-06T14:20:00Z",
    closedAt: "2024-12-06T14:20:00Z",
    customer: {
      name: "Maria Garcia",
      email: "maria@localstore.com"
    },
    assignedTo: {
      name: "Lisa Thompson",
      email: "lisa@luminexclient.com"
    },
    messages: [
      {
        id: "msg-012",
        type: "customer",
        author: {
          name: "Maria Garcia",
          email: "maria@localstore.com"
        },
        content: "I need help installing an SSL certificate for my domain. I have the certificate files ready. Can someone guide me through the process?",
        createdAt: "2024-12-05T11:15:00Z"
      },
      {
        id: "msg-013",
        type: "staff",
        author: {
          name: "Lisa Thompson",
          email: "lisa@luminexclient.com",
          role: "Technical Support"
        },
        content: "Hi Maria, I'd be happy to help you install your SSL certificate. Please upload the certificate files (.crt, .key, and .ca-bundle if you have one) to your ticket and I'll install them for you.",
        createdAt: "2024-12-05T13:30:00Z"
      },
      {
        id: "msg-014",
        type: "customer",
        author: {
          name: "Maria Garcia",
          email: "maria@localstore.com"
        },
        content: "Thank you! I've uploaded the files. The domain is localstore.com.",
        attachments: [
          {
            id: "att-001",
            filename: "localstore.com.crt",
            size: 2048,
            type: "application/x-x509-ca-cert",
            url: "/attachments/att-001",
            uploadedAt: "2024-12-05T14:00:00Z"
          },
          {
            id: "att-002",
            filename: "localstore.com.key",
            size: 1024,
            type: "application/x-pem-file",
            url: "/attachments/att-002",
            uploadedAt: "2024-12-05T14:00:00Z"
          }
        ],
        createdAt: "2024-12-05T14:00:00Z"
      },
      {
        id: "msg-015",
        type: "staff",
        author: {
          name: "Lisa Thompson",
          email: "lisa@luminexclient.com",
          role: "Technical Support"
        },
        content: "Perfect! I've successfully installed your SSL certificate. Your website is now secured with HTTPS. You can verify this by visiting https://localstore.com. The certificate is valid until December 2025.",
        createdAt: "2024-12-06T14:20:00Z"
      }
    ],
    serviceId: "srv-001",
    tags: ["ssl", "certificate", "installation", "completed"]
  },
  {
    id: "TKT-005",
    subject: "Upgrade to Enterprise plan",
    category: "sales-support",
    status: "open",
    priority: "medium",
    description: "I'm interested in upgrading my current hosting plan to Enterprise. Can you provide pricing and migration details?",
    createdAt: "2024-12-10T08:45:00Z",
    updatedAt: "2024-12-10T08:45:00Z",
    customer: {
      name: "Robert Wilson",
      email: "robert@growingbiz.com"
    },
    messages: [
      {
        id: "msg-016",
        type: "customer",
        author: {
          name: "Robert Wilson",
          email: "robert@growingbiz.com"
        },
        content: "I'm interested in upgrading my current hosting plan to Enterprise. Can you provide pricing and migration details? My website traffic has grown significantly and I need more resources.",
        createdAt: "2024-12-10T08:45:00Z"
      }
    ],
    serviceId: "srv-001",
    tags: ["upgrade", "enterprise", "sales"]
  }
];

// Helper functions
export function getTicketsByStatus(status: TicketStatus): Ticket[] {
  return mockTickets.filter(ticket => ticket.status === status);
}

export function getTicketsByCategory(category: TicketCategory): Ticket[] {
  return mockTickets.filter(ticket => ticket.category === category);
}

export function getTicketsByPriority(priority: TicketPriority): Ticket[] {
  return mockTickets.filter(ticket => ticket.priority === priority);
}

export function getTicketById(id: string): Ticket | undefined {
  return mockTickets.find(ticket => ticket.id === id);
}

export function getTicketStats(): TicketStats {
  const total = mockTickets.length;
  const open = getTicketsByStatus("open").length;
  const inProgress = getTicketsByStatus("in-progress").length;
  const resolved = getTicketsByStatus("resolved").length;
  const closed = getTicketsByStatus("closed").length;

  return {
    total,
    open,
    inProgress,
    resolved,
    closed,
    averageResponseTime: 2.5, // hours
    averageResolutionTime: 18.5 // hours
  };
}

export const ticketCategories = [
  {
    id: "technical-support" as TicketCategory,
    name: "Technical Support",
    description: "Server issues, configuration problems, performance concerns",
    icon: "🔧"
  },
  {
    id: "billing-support" as TicketCategory,
    name: "Billing Support", 
    description: "Payment issues, invoice questions, account billing",
    icon: "💳"
  },
  {
    id: "general-support" as TicketCategory,
    name: "General Support",
    description: "Account questions, feature requests, general inquiries", 
    icon: "❓"
  },
  {
    id: "sales-support" as TicketCategory,
    name: "Sales Support",
    description: "Pre-sales questions, upgrade requests, service information",
    icon: "💼"
  }
];
