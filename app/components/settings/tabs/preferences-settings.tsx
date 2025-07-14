import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings as SettingsIcon, 
  Palette, 
  Layout, 
  Table, 
  Monitor,
  Sun,
  Moon,
  Smartphone
} from "lucide-react";
import { DashboardPreferences } from "~/lib/types/settings";
import { SettingsForm } from "../settings-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";

interface PreferencesSettingsTabProps {
  preferences: DashboardPreferences;
  onUpdate: (data: Partial<DashboardPreferences>) => Promise<void>;
}

export function PreferencesSettingsTab({ preferences, onUpdate }: PreferencesSettingsTabProps) {
  const [previewMode, setPreviewMode] = useState(false);

  const handleThemeChange = async (theme: "dark" | "light" | "auto") => {
    await onUpdate({ theme });
  };

  const handleWidgetUpdate = async (key: string, value: boolean) => {
    await onUpdate({
      widgetPreferences: {
        ...preferences.widgetPreferences,
        [key]: value
      }
    });
  };

  const handleTableUpdate = async (key: string, value: number | string | boolean) => {
    await onUpdate({
      tablePreferences: {
        ...preferences.tablePreferences,
        [key]: value
      }
    });
  };

  const themeOptions = [
    { 
      value: "dark", 
      label: "Dark", 
      description: "Dark theme for reduced eye strain",
      icon: Moon,
      preview: "bg-gray-900 text-white"
    },
    { 
      value: "light", 
      label: "Light", 
      description: "Light theme for bright environments",
      icon: Sun,
      preview: "bg-white text-gray-900 border"
    },
    { 
      value: "auto", 
      label: "Auto", 
      description: "Follow system preference",
      icon: Monitor,
      preview: "bg-gradient-to-r from-gray-900 to-white text-gray-500"
    }
  ];

  const dashboardViews = [
    { value: "overview", label: "Overview", description: "General dashboard with all widgets" },
    { value: "services", label: "Services", description: "Focus on service management" },
    { value: "tickets", label: "Support", description: "Support ticket focused view" },
    { value: "invoices", label: "Billing", description: "Billing and invoice focused view" }
  ];

  const itemsPerPageOptions = [10, 25, 50, 100];

  const sortOptions = [
    { value: "created_desc", label: "Newest First" },
    { value: "created_asc", label: "Oldest First" },
    { value: "name_asc", label: "Name A-Z" },
    { value: "name_desc", label: "Name Z-A" },
    { value: "status_asc", label: "Status" }
  ];

  const widgetOptions = [
    { 
      key: "showStats", 
      label: "Statistics Cards", 
      description: "Display service stats and metrics" 
    },
    { 
      key: "showRecentActivity", 
      label: "Recent Activity", 
      description: "Show recent account activity" 
    },
    { 
      key: "showQuickActions", 
      label: "Quick Actions", 
      description: "Display quick action buttons" 
    },
    { 
      key: "showSystemStatus", 
      label: "System Status", 
      description: "Show system health and alerts" 
    }
  ];

  return (
    <div className="space-y-8">
      {/* Theme & Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Theme & Appearance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Theme Selection */}
            <div className="space-y-4">
              <Label>Theme</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themeOptions.map((theme) => (
                  <motion.button
                    key={theme.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleThemeChange(theme.value as any)}
                    className={cn(
                      "p-4 rounded-lg border-2 text-left transition-all duration-200",
                      preferences.theme === theme.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        theme.preview
                      )}>
                        <theme.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">{theme.label}</p>
                        {preferences.theme === theme.value && (
                          <p className="text-xs text-primary">Current</p>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {theme.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Display Options */}
            <div className="space-y-4 pt-4 border-t border-border">
              <Label>Display Options</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Compact Mode</p>
                    <p className="text-xs text-muted-foreground">
                      Use smaller spacing and condensed layouts
                    </p>
                  </div>
                  <Switch
                    checked={preferences.compactMode}
                    onCheckedChange={(checked) => onUpdate({ compactMode: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Welcome Message</p>
                    <p className="text-xs text-muted-foreground">
                      Show welcome message on dashboard
                    </p>
                  </div>
                  <Switch
                    checked={preferences.showWelcomeMessage}
                    onCheckedChange={(checked) => onUpdate({ showWelcomeMessage: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Layout */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layout className="w-5 h-5" />
            <span>Dashboard Layout</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Default View */}
            <div className="space-y-2">
              <Label htmlFor="defaultView">Default Dashboard View</Label>
              <select
                id="defaultView"
                value={preferences.defaultDashboardView}
                onChange={(e) => onUpdate({ 
                  defaultDashboardView: e.target.value as any 
                })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
              >
                {dashboardViews.map((view) => (
                  <option key={view.value} value={view.value}>
                    {view.label} - {view.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Widget Preferences */}
            <div className="space-y-4 pt-4 border-t border-border">
              <Label>Dashboard Widgets</Label>
              <div className="space-y-3">
                {widgetOptions.map((widget, index) => (
                  <motion.div
                    key={widget.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="text-sm font-medium">{widget.label}</p>
                      <p className="text-xs text-muted-foreground">{widget.description}</p>
                    </div>
                    <Switch
                      checked={preferences.widgetPreferences[widget.key as keyof typeof preferences.widgetPreferences]}
                      onCheckedChange={(checked) => handleWidgetUpdate(widget.key, checked)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Table className="w-5 h-5" />
            <span>Table & List Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Items Per Page */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemsPerPage">Items Per Page</Label>
                <select
                  id="itemsPerPage"
                  value={preferences.tablePreferences.itemsPerPage}
                  onChange={(e) => handleTableUpdate("itemsPerPage", parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                >
                  {itemsPerPageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} items
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultSort">Default Sort Order</Label>
                <select
                  id="defaultSort"
                  value={preferences.tablePreferences.defaultSort}
                  onChange={(e) => handleTableUpdate("defaultSort", e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table Display Options */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Compact Tables</p>
                  <p className="text-xs text-muted-foreground">
                    Use smaller row heights and padding
                  </p>
                </div>
                <Switch
                  checked={preferences.tablePreferences.compactTables}
                  onCheckedChange={(checked) => handleTableUpdate("compactTables", checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5" />
            <span>Advanced Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Performance Settings */}
            <div className="space-y-4">
              <Label>Performance & Accessibility</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Reduced Motion</p>
                    <p className="text-xs text-muted-foreground">
                      Minimize animations and transitions
                    </p>
                  </div>
                  <Switch
                    checked={false}
                    onCheckedChange={(checked) => {
                      // This would be implemented to reduce animations
                      console.log("Reduced motion:", checked);
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">High Contrast</p>
                    <p className="text-xs text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch
                    checked={false}
                    onCheckedChange={(checked) => {
                      // This would be implemented for accessibility
                      console.log("High contrast:", checked);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="space-y-4 pt-4 border-t border-border">
              <Label>Data & Privacy</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Analytics</p>
                    <p className="text-xs text-muted-foreground">
                      Help improve LuminexClient with usage data
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    onCheckedChange={(checked) => {
                      console.log("Analytics:", checked);
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Crash Reports</p>
                    <p className="text-xs text-muted-foreground">
                      Automatically send crash reports to help fix issues
                    </p>
                  </div>
                  <Switch
                    checked={true}
                    onCheckedChange={(checked) => {
                      console.log("Crash reports:", checked);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Reset Settings */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Reset Preferences</p>
                  <p className="text-xs text-muted-foreground">
                    Reset all preferences to default values
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to reset all preferences to default?")) {
                      // Reset to default preferences
                      console.log("Resetting preferences");
                    }
                  }}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
