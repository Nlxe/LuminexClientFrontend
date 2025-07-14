import { motion } from "framer-motion";
import { 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  Activity, 
  Settings as SettingsIcon 
} from "lucide-react";
import { SettingsTab } from "~/lib/types/settings";
import { cn } from "~/lib/utils";

interface SettingsTabsProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  className?: string;
}

export function SettingsTabs({ activeTab, onTabChange, className }: SettingsTabsProps) {
  const tabs = [
    {
      id: "account" as SettingsTab,
      label: "Account Details",
      description: "Personal and company information",
      icon: User
    },
    {
      id: "security" as SettingsTab,
      label: "Security",
      description: "Password, 2FA, and API keys",
      icon: Shield
    },
    {
      id: "billing" as SettingsTab,
      label: "Billing",
      description: "Payment methods and preferences",
      icon: CreditCard
    },
    {
      id: "notifications" as SettingsTab,
      label: "Notifications",
      description: "Email, SMS, and push preferences",
      icon: Bell
    },
    {
      id: "activity" as SettingsTab,
      label: "Activity Logs",
      description: "Account activity and security events",
      icon: Activity
    },
    {
      id: "preferences" as SettingsTab,
      label: "Preferences",
      description: "Dashboard and display settings",
      icon: SettingsIcon
    }
  ];

  return (
    <div className={cn("space-y-2", className)}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "w-full flex items-center space-x-3 p-4 rounded-lg text-left transition-all duration-200",
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <tab.icon className="w-5 h-5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-medium">{tab.label}</div>
            <div className={cn(
              "text-xs",
              activeTab === tab.id ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {tab.description}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
