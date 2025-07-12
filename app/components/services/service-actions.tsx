import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Square, 
  RotateCcw, 
  Settings, 
  TrendingUp, 
  Archive,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { ServiceAction, Service } from "~/lib/types/services";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ServiceActionsProps {
  service: Service;
  onAction?: (action: ServiceAction, service: Service) => Promise<void>;
  className?: string;
}

export function ServiceActions({ service, onAction, className }: ServiceActionsProps) {
  const [loadingAction, setLoadingAction] = useState<ServiceAction | null>(null);
  const [lastAction, setLastAction] = useState<{
    action: ServiceAction;
    success: boolean;
    timestamp: number;
  } | null>(null);

  const actionConfig = {
    start: {
      icon: Play,
      label: "Start",
      variant: "default" as const,
      color: "text-green-500"
    },
    stop: {
      icon: Square,
      label: "Stop",
      variant: "destructive" as const,
      color: "text-red-500"
    },
    restart: {
      icon: RotateCcw,
      label: "Restart",
      variant: "outline" as const,
      color: "text-blue-500"
    },
    configure: {
      icon: Settings,
      label: "Configure",
      variant: "outline" as const,
      color: "text-purple-500"
    },
    upgrade: {
      icon: TrendingUp,
      label: "Upgrade",
      variant: "outline" as const,
      color: "text-orange-500"
    },
    backup: {
      icon: Archive,
      label: "Backup",
      variant: "outline" as const,
      color: "text-cyan-500"
    }
  };

  const handleAction = async (action: ServiceAction) => {
    if (loadingAction) return;

    setLoadingAction(action);
    
    try {
      await onAction?.(action, service);
      setLastAction({
        action,
        success: true,
        timestamp: Date.now()
      });
    } catch (error) {
      setLastAction({
        action,
        success: false,
        timestamp: Date.now()
      });
    } finally {
      setLoadingAction(null);
      
      // Clear success/error state after 3 seconds
      setTimeout(() => {
        setLastAction(null);
      }, 3000);
    }
  };

  const getActionStatus = (action: ServiceAction) => {
    if (loadingAction === action) {
      return "loading";
    }
    
    if (lastAction?.action === action && Date.now() - lastAction.timestamp < 3000) {
      return lastAction.success ? "success" : "error";
    }
    
    return "idle";
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {service.availableActions.map((action) => {
        const config = actionConfig[action];
        const Icon = config.icon;
        const status = getActionStatus(action);

        return (
          <motion.div
            key={action}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant={config.variant}
              size="sm"
              onClick={() => handleAction(action)}
              disabled={loadingAction !== null}
              className={cn(
                "relative overflow-hidden",
                status === "success" && "border-green-500 bg-green-500/10",
                status === "error" && "border-red-500 bg-red-500/10"
              )}
            >
              <AnimatePresence mode="wait">
                {status === "loading" ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{config.label}...</span>
                  </motion.div>
                ) : status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Done</span>
                  </motion.div>
                ) : status === "error" ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span>Failed</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{config.label}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
