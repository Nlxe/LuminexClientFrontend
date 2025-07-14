import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Key, 
  Smartphone, 
  Monitor, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2,
  Plus,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { SecuritySettings, ApiKey, LoginSession } from "~/lib/types/settings";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";

interface SecuritySettingsTabProps {
  security: SecuritySettings;
  onUpdate: (data: Partial<SecuritySettings>) => Promise<void>;
}

export function SecuritySettingsTab({ security, onUpdate }: SecuritySettingsTabProps) {
  const [showPasswords, setShowPasswords] = useState(false);
  const [newApiKeyName, setNewApiKeyName] = useState("");
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handlePasswordChange = async (data: any) => {
    // Simulate password change
    console.log("Changing password:", data);
    await onUpdate({
      passwordLastChanged: new Date().toISOString()
    });
  };

  const handleToggle2FA = async () => {
    await onUpdate({
      twoFactorEnabled: !security.twoFactorEnabled
    });
  };

  const handleCreateApiKey = async () => {
    if (!newApiKeyName.trim()) return;
    
    const newKey: ApiKey = {
      id: `api-${Date.now()}`,
      name: newApiKeyName,
      key: `lx_live_sk_${Math.random().toString(36).substr(2, 24)}`,
      permissions: ["read:services"],
      createdAt: new Date().toISOString(),
      isActive: true
    };

    await onUpdate({
      apiKeys: [...security.apiKeys, newKey]
    });
    
    setNewApiKeyName("");
  };

  const handleRevokeApiKey = async (keyId: string) => {
    await onUpdate({
      apiKeys: security.apiKeys.filter(key => key.id !== keyId)
    });
  };

  const handleRevokeSession = async (sessionId: string) => {
    await onUpdate({
      activeSessions: security.activeSessions.filter(session => session.id !== sessionId)
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Password Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Password & Authentication</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Password</h4>
                <p className="text-sm text-muted-foreground">
                  Last changed: {formatDate(security.passwordLastChanged)}
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  {security.twoFactorEnabled 
                    ? `Enabled via ${security.twoFactorMethod}` 
                    : "Add an extra layer of security to your account"
                  }
                </p>
              </div>
              <Switch
                checked={security.twoFactorEnabled}
                onCheckedChange={handleToggle2FA}
              />
            </div>

            {security.twoFactorEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 text-green-500">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Two-factor authentication is enabled</span>
                </div>

                {security.backupCodes && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Backup Codes</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowBackupCodes(!showBackupCodes)}
                      >
                        {showBackupCodes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {showBackupCodes && (
                      <div className="grid grid-cols-2 gap-2 p-3 bg-muted rounded-lg">
                        {security.backupCodes.map((code, index) => (
                          <div key={index} className="font-mono text-sm">
                            {code}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Security Notifications */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="font-medium">Security Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Login Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Get notified when someone logs into your account
                  </p>
                </div>
                <Switch
                  checked={security.loginNotifications}
                  onCheckedChange={(checked) => onUpdate({ loginNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Suspicious Activity Alerts</p>
                  <p className="text-xs text-muted-foreground">
                    Get alerted about unusual account activity
                  </p>
                </div>
                <Switch
                  checked={security.suspiciousActivityAlerts}
                  onCheckedChange={(checked) => onUpdate({ suspiciousActivityAlerts: checked })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>API Keys</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Create New API Key */}
          <div className="flex space-x-2">
            <Input
              placeholder="API key name"
              value={newApiKeyName}
              onChange={(e) => setNewApiKeyName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleCreateApiKey} disabled={!newApiKeyName.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
          </div>

          {/* API Keys List */}
          <div className="space-y-3">
            {security.apiKeys.map((apiKey) => (
              <motion.div
                key={apiKey.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-border rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{apiKey.name}</h4>
                      <span className={cn(
                        "px-2 py-1 rounded text-xs",
                        apiKey.isActive 
                          ? "bg-green-500/10 text-green-500" 
                          : "bg-gray-500/10 text-gray-500"
                      )}>
                        {apiKey.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {showPasswords ? apiKey.key : `${apiKey.key.substring(0, 12)}...`}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      <p>Created: {formatDate(apiKey.createdAt)}</p>
                      {apiKey.lastUsedAt && (
                        <p>Last used: {formatDate(apiKey.lastUsedAt)}</p>
                      )}
                      <p>Permissions: {apiKey.permissions.join(", ")}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevokeApiKey(apiKey.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">
              {security.apiKeys.length} API key{security.apiKeys.length !== 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPasswords(!showPasswords)}
            >
              {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPasswords ? "Hide" : "Show"} Keys
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Monitor className="w-5 h-5" />
            <span>Active Sessions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {security.activeSessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-4 border rounded-lg",
                  session.isCurrent 
                    ? "border-primary bg-primary/5" 
                    : "border-border"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{session.deviceName}</h4>
                      {session.isCurrent && (
                        <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <p>{session.browser} • {session.ipAddress}</p>
                      <p>{session.location}</p>
                      <p>
                        Signed in: {formatDate(session.loginAt)} • 
                        Last active: {formatDate(session.lastActiveAt)}
                      </p>
                    </div>
                  </div>
                  {!session.isCurrent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevokeSession(session.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Revoke
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
