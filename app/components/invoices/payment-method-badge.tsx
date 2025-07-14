import { motion } from "framer-motion";
import { 
  CreditCard, 
  Building, 
  Wallet,
  DollarSign
} from "lucide-react";
import { PaymentMethod } from "~/lib/types/invoices";
import { cn } from "~/lib/utils";

interface PaymentMethodBadgeProps {
  method: PaymentMethod;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function PaymentMethodBadge({ 
  method, 
  className, 
  showLabel = true, 
  size = "md" 
}: PaymentMethodBadgeProps) {
  const methodConfig = {
    "credit-card": {
      icon: CreditCard,
      label: "Credit Card",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    "paypal": {
      icon: Wallet,
      label: "PayPal",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    "bank-transfer": {
      icon: Building,
      label: "Bank Transfer",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    "account-credit": {
      icon: DollarSign,
      label: "Account Credit",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    }
  };

  const config = methodConfig[method];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  if (!showLabel) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full",
          config.bgColor,
          config.borderColor,
          "border",
          size === "sm" ? "w-6 h-6" : size === "md" ? "w-8 h-8" : "w-10 h-10",
          className
        )}
      >
        <Icon className={cn(config.color, iconSizes[size])} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center space-x-2 rounded-full border",
        config.bgColor,
        config.borderColor,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={cn(config.color, iconSizes[size])} />
      {showLabel && (
        <span className={cn("font-medium", config.color)}>
          {config.label}
        </span>
      )}
    </motion.div>
  );
}
