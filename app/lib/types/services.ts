export type ServiceStatus = 
  | "active" 
  | "suspended" 
  | "pending" 
  | "terminated" 
  | "maintenance";

export type ServiceCategory = 
  | "web-hosting" 
  | "minecraft-hosting" 
  | "discord-bot-hosting";

export type ServiceAction = 
  | "start" 
  | "stop" 
  | "restart" 
  | "configure" 
  | "upgrade" 
  | "backup";

export interface ServicePlan {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  features: string[];
  specifications: {
    [key: string]: string | number;
  };
  pricing: {
    monthly: number;
    yearly: number;
    setup?: number;
  };
  popular?: boolean;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  plan: ServicePlan;
  status: ServiceStatus;
  createdAt: string;
  expiresAt: string;
  domain?: string;
  ipAddress?: string;
  metrics: {
    uptime: number;
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    bandwidth: {
      used: number;
      total: number;
    };
  };
  configuration: {
    [key: string]: any;
  };
  availableActions: ServiceAction[];
}

export interface ServiceOrder {
  planId: string;
  domain?: string;
  billingCycle: "monthly" | "yearly";
  addons?: string[];
  configuration?: {
    [key: string]: any;
  };
}

export interface ServiceMetrics {
  uptime: number;
  responseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  bandwidth: {
    used: number;
    total: number;
    unit: string;
  };
  visitors?: {
    today: number;
    thisMonth: number;
  };
}

export interface ServiceConfiguration {
  phpVersion?: string;
  mysqlVersion?: string;
  sslEnabled?: boolean;
  backupsEnabled?: boolean;
  cdnEnabled?: boolean;
  // Minecraft specific
  serverType?: "vanilla" | "modded" | "bukkit" | "spigot" | "paper";
  minecraftVersion?: string;
  maxPlayers?: number;
  // Discord bot specific
  botToken?: string;
  permissions?: string[];
  autoRestart?: boolean;
}
