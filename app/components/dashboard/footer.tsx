import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "~/lib/utils";

interface DashboardFooterProps {
  className?: string;
}

export function DashboardFooter({ className }: DashboardFooterProps) {
  return (
    <footer className={cn(
      "border-t border-border bg-background/50 backdrop-blur-sm",
      className
    )}>
      <div className="px-4 lg:px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0"
        >
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © 2025 LuminexClient. All rights reserved.
          </div>

          {/* Made with love */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for hosting providers</span>
          </div>

          {/* Version */}
          <div className="text-xs text-muted-foreground">
            v1.0.0
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
