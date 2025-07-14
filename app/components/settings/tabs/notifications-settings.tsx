import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Monitor, 
  Clock,
  Volume2,
  VolumeX
} from "lucide-react";
import { NotificationPreferences } from "~/lib/types/settings";
import { SettingsForm } from "../settings-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";

interface NotificationsSettingsTabProps {
  notifications: NotificationPreferences;
  onUpdate: (data: Partial<NotificationPreferences>) => Promise<void>;
}

export function NotificationsSettingsTab({ notifications, onUpdate }: NotificationsSettingsTabProps) {
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  const handleEmailUpdate = async (key: string, value: boolean) => {
    await onUpdate({
      email: {
        ...notifications.email,
        [key]: value
      }
    });
  };

  const handleSmsUpdate = async (key: string, value: boolean | string) => {
    await onUpdate({
      sms: {
        ...notifications.sms,
        [key]: value
      }
    });
  };

  const handlePushUpdate = async (key: string, value: boolean) => {
    await onUpdate({
      push: {
        ...notifications.push,
        [key]: value
      }
    });
  };

  const handleFrequencyUpdate = async (updates: Partial<NotificationPreferences["frequency"]>) => {
    await onUpdate({
      frequency: {
        ...notifications.frequency,
        ...updates
      }
    });
  };

  const handleQuietHoursUpdate = async (updates: Partial<NotificationPreferences["frequency"]["quietHours"]>) => {
    await onUpdate({
      frequency: {
        ...notifications.frequency,
        quietHours: {
          ...notifications.frequency.quietHours,
          ...updates
        }
      }
    });
  };

  const sendTestNotification = async () => {
    // Simulate sending test notification
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  const emailNotificationOptions = [
    { key: "serviceUpdates", label: "Service Updates", description: "Updates about your hosting services" },
    { key: "maintenanceAlerts", label: "Maintenance Alerts", description: "Scheduled maintenance notifications" },
    { key: "billingReminders", label: "Billing Reminders", description: "Payment due and invoice notifications" },
    { key: "invoiceNotifications", label: "Invoice Notifications", description: "New invoices and payment confirmations" },
    { key: "ticketUpdates", label: "Support Ticket Updates", description: "Responses to your support tickets" },
    { key: "securityAlerts", label: "Security Alerts", description: "Account security and login notifications" },
    { key: "marketingEmails", label: "Marketing Emails", description: "Product updates and promotional content" },
    { key: "weeklyReports", label: "Weekly Reports", description: "Weekly summary of your account activity" }
  ];

  const smsNotificationOptions = [
    { key: "criticalAlerts", label: "Critical Alerts", description: "Urgent issues requiring immediate attention" },
    { key: "serviceDowntime", label: "Service Downtime", description: "When your services go offline" },
    { key: "billingIssues", label: "Billing Issues", description: "Payment failures and billing problems" },
    { key: "securityAlerts", label: "Security Alerts", description: "Suspicious account activity" }
  ];

  const pushNotificationOptions = [
    { key: "serviceUpdates", label: "Service Updates", description: "Push notifications for service changes" },
    { key: "ticketResponses", label: "Ticket Responses", description: "New responses to your support tickets" },
    { key: "billingReminders", label: "Billing Reminders", description: "Payment reminders and due dates" }
  ];

  return (
    <div className="space-y-8">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Email Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailNotificationOptions.map((option, index) => (
              <motion.div
                key={option.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
                <Switch
                  checked={notifications.email[option.key as keyof typeof notifications.email]}
                  onCheckedChange={(checked) => handleEmailUpdate(option.key, checked)}
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <span>SMS Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* SMS Enable/Disable */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Enable SMS Notifications</p>
                <p className="text-xs text-muted-foreground">
                  {notifications.sms.phoneNumber 
                    ? `Send SMS to ${notifications.sms.phoneNumber}` 
                    : "No phone number configured"
                  }
                </p>
              </div>
              <Switch
                checked={notifications.sms.enabled}
                onCheckedChange={(checked) => handleSmsUpdate("enabled", checked)}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 (555) 123-4567"
                defaultValue={notifications.sms.phoneNumber}
                onChange={(e) => handleSmsUpdate("phoneNumber", e.target.value)}
              />
            </div>

            {/* SMS Options */}
            {notifications.sms.enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                {smsNotificationOptions.map((option, index) => (
                  <div
                    key={option.key}
                    className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                    <Switch
                      checked={notifications.sms[option.key as keyof typeof notifications.sms] as boolean}
                      onCheckedChange={(checked) => handleSmsUpdate(option.key, checked)}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="w-5 h-5" />
            <span>Push Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Push Enable/Disable */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Enable Push Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Browser notifications for real-time updates
                </p>
              </div>
              <Switch
                checked={notifications.push.enabled}
                onCheckedChange={(checked) => handlePushUpdate("enabled", checked)}
              />
            </div>

            {/* Push Options */}
            {notifications.push.enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                {pushNotificationOptions.map((option, index) => (
                  <div
                    key={option.key}
                    className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{option.label}</p>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                    <Switch
                      checked={notifications.push[option.key as keyof typeof notifications.push] as boolean}
                      onCheckedChange={(checked) => handlePushUpdate(option.key, checked)}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notification Frequency & Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Frequency & Timing</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Digest Frequency */}
            <div className="space-y-2">
              <Label htmlFor="digestFrequency">Notification Digest</Label>
              <select
                id="digestFrequency"
                value={notifications.frequency.digest}
                onChange={(e) => handleFrequencyUpdate({ 
                  digest: e.target.value as "immediate" | "hourly" | "daily" | "weekly" 
                })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
              >
                <option value="immediate">Immediate</option>
                <option value="hourly">Hourly Digest</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Digest</option>
              </select>
              <p className="text-xs text-muted-foreground">
                How often to receive non-urgent notifications
              </p>
            </div>

            {/* Quiet Hours */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Quiet Hours</p>
                  <p className="text-xs text-muted-foreground">
                    Pause non-critical notifications during these hours
                  </p>
                </div>
                <Switch
                  checked={notifications.frequency.quietHours.enabled}
                  onCheckedChange={(checked) => handleQuietHoursUpdate({ enabled: checked })}
                />
              </div>

              {notifications.frequency.quietHours.enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="quietStart">Start Time</Label>
                    <Input
                      id="quietStart"
                      type="time"
                      value={notifications.frequency.quietHours.start}
                      onChange={(e) => handleQuietHoursUpdate({ start: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quietEnd">End Time</Label>
                    <Input
                      id="quietEnd"
                      type="time"
                      value={notifications.frequency.quietHours.end}
                      onChange={(e) => handleQuietHoursUpdate({ end: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Test Notifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Send Test Notification</p>
              <p className="text-xs text-muted-foreground">
                Test your notification settings with a sample message
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {testNotificationSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-500 text-sm"
                >
                  Test sent!
                </motion.div>
              )}
              <button
                onClick={sendTestNotification}
                disabled={testNotificationSent}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {testNotificationSent ? "Sent" : "Send Test"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
