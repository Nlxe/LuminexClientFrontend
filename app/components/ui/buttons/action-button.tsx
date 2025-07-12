import * as React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ActionButtonProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ActionButton({
  title,
  description,
  icon: Icon,
  onClick,
  href,
  variant = "default",
  size = "md",
  className,
}: ActionButtonProps) {
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center space-x-4 w-full text-left",
        sizeClasses[size]
      )}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="p-3 bg-primary/10 rounded-lg"
      >
        <Icon className="w-6 h-6 text-primary" />
      </motion.div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={cn("block", className)}>
        <Button
          variant={variant}
          className="w-full h-auto justify-start"
        >
          {content}
        </Button>
      </a>
    );
  }

  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={cn("w-full h-auto justify-start", className)}
    >
      {content}
    </Button>
  );
}
