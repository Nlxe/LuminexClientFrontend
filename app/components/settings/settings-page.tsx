import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsTab, UserSettings } from "~/lib/types/settings";
import { SettingsTabs } from "./settings-tabs";
import { AccountDetailsTab } from "./tabs/account-details";
import { SecuritySettingsTab } from "./tabs/security-settings";
import { BillingSettingsTab } from "./tabs/billing-settings";
import { NotificationsSettingsTab } from "./tabs/notifications-settings";
import { PreferencesSettingsTab } from "./tabs/preferences-settings";
import { ActivityLogDisplay } from "./activity-log";
import { PageHeader } from "~/components/ui/text/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { 
  CreditCard, 
  Bell, 
  Settings as SettingsIcon,
  Search,
  Filter
} from "lucide-react";

interface SettingsPageProps {
  userSettings: UserSettings;
  onUpdateSettings: (updates: Partial<UserSettings>) => Promise<void>;
}

export function SettingsPage({ userSettings, onUpdateSettings }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [activityFilter, setActivityFilter] = useState("");

  // Memoized filtered activity logs
  const filteredActivityLogs = useMemo(() => {
    if (!activityFilter) return userSettings.activityLogs;
    
    return userSettings.activityLogs.filter(log =>
      log.description.toLowerCase().includes(activityFilter.toLowerCase()) ||
      log.type.toLowerCase().includes(activityFilter.toLowerCase())
    );
  }, [userSettings.activityLogs, activityFilter]);

  const handleUpdateProfile = async (updates: Partial<UserSettings["profile"]>) => {
    await onUpdateSettings({
      profile: { ...userSettings.profile, ...updates }
    });
  };

  const handleUpdateSecurity = async (updates: Partial<UserSettings["security"]>) => {
    await onUpdateSettings({
      security: { ...userSettings.security, ...updates }
    });
  };

  const handleUpdateBilling = async (updates: Partial<UserSettings["billing"]>) => {
    await onUpdateSettings({
      billing: { ...userSettings.billing, ...updates }
    });
  };

  const handleUpdateNotifications = async (updates: Partial<UserSettings["notifications"]>) => {
    await onUpdateSettings({
      notifications: { ...userSettings.notifications, ...updates }
    });
  };

  const handleUpdatePreferences = async (updates: Partial<UserSettings["preferences"]>) => {
    await onUpdateSettings({
      preferences: { ...userSettings.preferences, ...updates }
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <AccountDetailsTab
            profile={userSettings.profile}
            onUpdate={handleUpdateProfile}
          />
        );

      case "security":
        return (
          <SecuritySettingsTab
            security={userSettings.security}
            onUpdate={handleUpdateSecurity}
          />
        );

      case "billing":
        return (
          <BillingSettingsTab
            billing={userSettings.billing}
            onUpdate={handleUpdateBilling}
          />
        );

      case "notifications":
        return (
          <NotificationsSettingsTab
            notifications={userSettings.notifications}
            onUpdate={handleUpdateNotifications}
          />
        );

      case "activity":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Activity Logs</h2>
                <p className="text-muted-foreground">
                  View your account activity and security events
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Filter activity..."
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            <ActivityLogDisplay logs={filteredActivityLogs} />
          </div>
        );

      case "preferences":
        return (
          <PreferencesSettingsTab
            preferences={userSettings.preferences}
            onUpdate={handleUpdatePreferences}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Settings"
        description="Manage your account settings, security, and preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <SettingsTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
