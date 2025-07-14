import { motion } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Monitor, 
  Shield, 
  CreditCard, 
  Server, 
  Key, 
  AlertTriangle,
  User,
  LogOut
} from "lucide-react";
import { ActivityLog } from "~/lib/types/settings";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface ActivityLogDisplayProps {
  logs: ActivityLog[];
  className?: string;
  limit?: number;
}

export function ActivityLogDisplay({ logs, className, limit }: ActivityLogDisplayProps) {
  const displayLogs = limit ? logs.slice(0, limit) : logs;

  const getActivityIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "login":
        return User;
      case "logout":
        return LogOut;
      case "password_change":
        return Shield;
      case "profile_update":
        return User;
      case "payment":
        return CreditCard;
      case "service_action":
        return Server;
      case "api_access":
        return Key;
      case "security_event":
        return Shield;
      default:
        return Monitor;
    }
  };

  const getSeverityColor = (severity: ActivityLog["severity"]) => {
    switch (severity) {
      case "low":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "high":
        return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "critical":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatActivityType = (type: ActivityLog["type"]) => {
    return type.split("_").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  if (displayLogs.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <Monitor className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No activity logs found</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {displayLogs.map((log, index) => {
        const Icon = getActivityIcon(log.type);
        const severityColor = getSeverityColor(log.severity);
        
        return (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Icon and Severity */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={cn(
                      "p-2 rounded-lg border",
                      severityColor
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className={cn(
                      "px-2 py-1 rounded text-xs font-medium border",
                      severityColor
                    )}>
                      {log.severity}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">
                          {log.description}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(log.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Monitor className="w-3 h-3" />
                            <span>{log.ipAddress}</span>
                          </div>
                          {log.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{log.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        {formatActivityType(log.type)}
                      </div>
                    </div>

                    {/* Details */}
                    {log.details && Object.keys(log.details).length > 0 && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground space-y-1">
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              <span className="font-medium text-foreground">
                                {typeof value === "object" 
                                  ? JSON.stringify(value) 
                                  : String(value)
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* User Agent (truncated) */}
                    {log.userAgent && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="font-medium">User Agent: </span>
                        <span className="truncate block">
                          {log.userAgent.length > 80 
                            ? `${log.userAgent.substring(0, 80)}...` 
                            : log.userAgent
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
