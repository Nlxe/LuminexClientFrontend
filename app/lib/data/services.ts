import { ServicePlan, Service, ServiceCategory } from "~/lib/types/services";

// Service Plans Data
export const servicePlans: ServicePlan[] = [
  // Web Hosting Plans
  {
    id: "web-basic",
    name: "Basic Hosting",
    category: "web-hosting",
    description: "Perfect for personal websites and small projects",
    features: [
      "10 GB SSD Storage",
      "100 GB Bandwidth",
      "1 Website",
      "Free SSL Certificate",
      "24/7 Support",
      "99.9% Uptime Guarantee"
    ],
    specifications: {
      storage: "10 GB SSD",
      bandwidth: "100 GB",
      websites: 1,
      databases: 1,
      emailAccounts: 5
    },
    pricing: {
      monthly: 4.99,
      yearly: 49.99,
      setup: 0
    }
  },
  {
    id: "web-pro",
    name: "Pro Hosting",
    category: "web-hosting",
    description: "Ideal for growing businesses and multiple websites",
    features: [
      "50 GB SSD Storage",
      "500 GB Bandwidth",
      "5 Websites",
      "Free SSL Certificate",
      "Daily Backups",
      "24/7 Priority Support",
      "99.9% Uptime Guarantee"
    ],
    specifications: {
      storage: "50 GB SSD",
      bandwidth: "500 GB",
      websites: 5,
      databases: 10,
      emailAccounts: 25
    },
    pricing: {
      monthly: 9.99,
      yearly: 99.99,
      setup: 0
    },
    popular: true
  },
  {
    id: "web-enterprise",
    name: "Enterprise Hosting",
    category: "web-hosting",
    description: "Maximum performance for high-traffic websites",
    features: [
      "200 GB SSD Storage",
      "Unlimited Bandwidth",
      "Unlimited Websites",
      "Free SSL Certificate",
      "Daily Backups",
      "CDN Integration",
      "24/7 Priority Support",
      "99.99% Uptime Guarantee"
    ],
    specifications: {
      storage: "200 GB SSD",
      bandwidth: "Unlimited",
      websites: "Unlimited",
      databases: "Unlimited",
      emailAccounts: "Unlimited"
    },
    pricing: {
      monthly: 19.99,
      yearly: 199.99,
      setup: 0
    }
  },
  // Minecraft Hosting Plans
  {
    id: "minecraft-basic",
    name: "Minecraft Basic",
    category: "minecraft-hosting",
    description: "Perfect for small servers with friends",
    features: [
      "2 GB RAM",
      "10 Player Slots",
      "Unlimited Storage",
      "DDoS Protection",
      "Instant Setup",
      "24/7 Support"
    ],
    specifications: {
      ram: "2 GB",
      players: 10,
      storage: "Unlimited",
      cpu: "2 vCPU",
      locations: 5
    },
    pricing: {
      monthly: 8.99,
      yearly: 89.99
    }
  },
  {
    id: "minecraft-pro",
    name: "Minecraft Pro",
    category: "minecraft-hosting",
    description: "Great for medium-sized communities",
    features: [
      "4 GB RAM",
      "25 Player Slots",
      "Unlimited Storage",
      "DDoS Protection",
      "Plugin Support",
      "Daily Backups",
      "24/7 Priority Support"
    ],
    specifications: {
      ram: "4 GB",
      players: 25,
      storage: "Unlimited",
      cpu: "4 vCPU",
      locations: 8
    },
    pricing: {
      monthly: 16.99,
      yearly: 169.99
    },
    popular: true
  },
  {
    id: "minecraft-enterprise",
    name: "Minecraft Enterprise",
    category: "minecraft-hosting",
    description: "For large communities and networks",
    features: [
      "8 GB RAM",
      "100 Player Slots",
      "Unlimited Storage",
      "DDoS Protection",
      "Full Plugin Support",
      "Hourly Backups",
      "Dedicated IP",
      "24/7 Priority Support"
    ],
    specifications: {
      ram: "8 GB",
      players: 100,
      storage: "Unlimited",
      cpu: "8 vCPU",
      locations: 12
    },
    pricing: {
      monthly: 32.99,
      yearly: 329.99
    }
  },
  // Discord Bot Hosting Plans
  {
    id: "discord-basic",
    name: "Bot Basic",
    category: "discord-bot-hosting",
    description: "Perfect for simple Discord bots",
    features: [
      "512 MB RAM",
      "99.5% Uptime",
      "Basic Support",
      "Auto Restart",
      "File Manager",
      "Log Viewer"
    ],
    specifications: {
      ram: "512 MB",
      cpu: "1 vCPU",
      storage: "5 GB",
      uptime: "99.5%",
      support: "Basic"
    },
    pricing: {
      monthly: 2.99,
      yearly: 29.99
    }
  },
  {
    id: "discord-pro",
    name: "Bot Pro",
    category: "discord-bot-hosting",
    description: "For advanced bots with more features",
    features: [
      "1 GB RAM",
      "99.9% Uptime",
      "Priority Support",
      "Auto Restart",
      "Database Access",
      "Custom Domains",
      "Advanced Monitoring"
    ],
    specifications: {
      ram: "1 GB",
      cpu: "2 vCPU",
      storage: "10 GB",
      uptime: "99.9%",
      support: "Priority"
    },
    pricing: {
      monthly: 5.99,
      yearly: 59.99
    },
    popular: true
  },
  {
    id: "discord-enterprise",
    name: "Bot Enterprise",
    category: "discord-bot-hosting",
    description: "Maximum performance for large Discord bots",
    features: [
      "2 GB RAM",
      "99.99% Uptime",
      "24/7 Priority Support",
      "Auto Restart",
      "Database Access",
      "Custom Domains",
      "Advanced Monitoring",
      "Load Balancing"
    ],
    specifications: {
      ram: "2 GB",
      cpu: "4 vCPU",
      storage: "25 GB",
      uptime: "99.99%",
      support: "24/7 Priority"
    },
    pricing: {
      monthly: 11.99,
      yearly: 119.99
    }
  }
];

// Mock User Services
export const userServices: Service[] = [
  {
    id: "srv-001",
    name: "My Business Website",
    category: "web-hosting",
    plan: servicePlans.find(p => p.id === "web-pro")!,
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    expiresAt: "2025-01-15T10:30:00Z",
    domain: "mybusiness.com",
    ipAddress: "192.168.1.100",
    metrics: {
      uptime: 99.9,
      cpuUsage: 45,
      memoryUsage: 62,
      diskUsage: 38,
      bandwidth: {
        used: 125,
        total: 500
      }
    },
    configuration: {
      phpVersion: "8.2",
      mysqlVersion: "8.0",
      sslEnabled: true,
      backupsEnabled: true,
      cdnEnabled: false
    },
    availableActions: ["restart", "configure", "backup", "upgrade"]
  },
  {
    id: "srv-002",
    name: "Gaming Community Server",
    category: "minecraft-hosting",
    plan: servicePlans.find(p => p.id === "minecraft-pro")!,
    status: "active",
    createdAt: "2024-02-20T14:15:00Z",
    expiresAt: "2025-02-20T14:15:00Z",
    ipAddress: "mc.gameserver.net:25565",
    metrics: {
      uptime: 98.7,
      cpuUsage: 72,
      memoryUsage: 85,
      diskUsage: 45,
      bandwidth: {
        used: 89,
        total: 1000
      }
    },
    configuration: {
      serverType: "paper",
      minecraftVersion: "1.20.4",
      maxPlayers: 25,
      autoRestart: true
    },
    availableActions: ["start", "stop", "restart", "configure", "backup"]
  },
  {
    id: "srv-003",
    name: "Discord Moderation Bot",
    category: "discord-bot-hosting",
    plan: servicePlans.find(p => p.id === "discord-basic")!,
    status: "active",
    createdAt: "2024-03-10T09:45:00Z",
    expiresAt: "2025-03-10T09:45:00Z",
    metrics: {
      uptime: 99.2,
      cpuUsage: 15,
      memoryUsage: 35,
      diskUsage: 12,
      bandwidth: {
        used: 2.5,
        total: 50
      }
    },
    configuration: {
      autoRestart: true,
      permissions: ["MANAGE_MESSAGES", "KICK_MEMBERS", "BAN_MEMBERS"]
    },
    availableActions: ["restart", "configure", "upgrade"]
  },
  {
    id: "srv-004",
    name: "Portfolio Website",
    category: "web-hosting",
    plan: servicePlans.find(p => p.id === "web-basic")!,
    status: "pending",
    createdAt: "2024-12-01T16:20:00Z",
    expiresAt: "2025-12-01T16:20:00Z",
    domain: "portfolio.dev",
    metrics: {
      uptime: 0,
      cpuUsage: 0,
      memoryUsage: 0,
      diskUsage: 0,
      bandwidth: {
        used: 0,
        total: 100
      }
    },
    configuration: {
      phpVersion: "8.2",
      sslEnabled: true,
      backupsEnabled: false
    },
    availableActions: []
  }
];

// Helper functions
export function getServicesByCategory(category: ServiceCategory): Service[] {
  return userServices.filter(service => service.category === category);
}

export function getServiceById(id: string): Service | undefined {
  return userServices.find(service => service.id === id);
}

export function getPlansByCategory(category: ServiceCategory): ServicePlan[] {
  return servicePlans.filter(plan => plan.category === category);
}

export const serviceCategories = [
  {
    id: "web-hosting" as ServiceCategory,
    name: "Web Hosting",
    description: "Shared hosting, VPS, and dedicated servers",
    icon: "🌐"
  },
  {
    id: "minecraft-hosting" as ServiceCategory,
    name: "Minecraft Hosting",
    description: "Game servers for Minecraft communities",
    icon: "🎮"
  },
  {
    id: "discord-bot-hosting" as ServiceCategory,
    name: "Discord Bot Hosting",
    description: "Reliable hosting for Discord bots",
    icon: "🤖"
  }
];
