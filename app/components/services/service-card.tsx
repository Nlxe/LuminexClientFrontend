import { motion } from "framer-motion";
import { 
  Server, 
  Globe, 
  Bot, 
  MoreVertical, 
  ExternalLink,
  TrendingUp,
  HardDrive,
  Cpu,
  MemoryStick
} from "lucide-react";
import { Service } from "~/lib/types/services";
import { ServiceStatus } from "./service-status";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ServiceCardProps {
  service: Service;
  onManage?: (service: Service) => void;
  onViewDetails?: (service: Service) => void;
  className?: string;
}

export function ServiceCard({ 
  service, 
  onManage, 
  onViewDetails, 
  className 
}: ServiceCardProps) {
  const getCategoryIcon = () => {
    switch (service.category) {
      case "web-hosting":
        return Globe;
      case "minecraft-hosting":
        return Server;
      case "discord-bot-hosting":
        return Bot;
      default:
        return Server;
    }
  };

  const CategoryIcon = getCategoryIcon();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-500";
    if (percentage >= 70) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={className}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CategoryIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.plan.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <ServiceStatus status={service.status} size="sm" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onManage?.(service)}
                className="h-8 w-8 p-0"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Service Details */}
          <div className="space-y-2">
            {service.domain && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Domain:</span>
                <div className="flex items-center space-x-1">
                  <span className="text-foreground">{service.domain}</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </div>
              </div>
            )}
            
            {service.ipAddress && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">IP Address:</span>
                <span className="text-foreground font-mono text-xs">
                  {service.ipAddress}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Expires:</span>
              <span className="text-foreground">
                {formatDate(service.expiresAt)}
              </span>
            </div>
          </div>

          {/* Metrics */}
          {service.status === "active" && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">
                  {service.metrics.uptime}% Uptime
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Cpu className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className={cn("font-medium", getUsageColor(service.metrics.cpuUsage))}>
                    {service.metrics.cpuUsage}%
                  </div>
                  <div className="text-muted-foreground">CPU</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <MemoryStick className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className={cn("font-medium", getUsageColor(service.metrics.memoryUsage))}>
                    {service.metrics.memoryUsage}%
                  </div>
                  <div className="text-muted-foreground">RAM</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <HardDrive className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <div className={cn("font-medium", getUsageColor(service.metrics.diskUsage))}>
                    {service.metrics.diskUsage}%
                  </div>
                  <div className="text-muted-foreground">Disk</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(service)}
              className="flex-1"
            >
              View Details
            </Button>
            {service.availableActions.length > 0 && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onManage?.(service)}
                className="flex-1"
              >
                Manage
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
