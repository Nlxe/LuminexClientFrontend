import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

interface CheckboxFieldProps {
  id: string;
  name: string;
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function CheckboxField({
  id,
  name,
  label,
  checked = false,
  onChange,
  required = false,
  disabled = false,
  className,
}: CheckboxFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex items-start space-x-3", className)}
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <motion.label
          htmlFor={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex items-center justify-center w-5 h-5 border-2 rounded cursor-pointer transition-all duration-200",
            checked
              ? "bg-primary border-primary text-primary-foreground"
              : "border-border hover:border-primary",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <motion.div
            initial={false}
            animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-3 h-3" />
          </motion.div>
        </motion.label>
      </div>
      
      <label
        htmlFor={id}
        className={cn(
          "text-sm text-muted-foreground cursor-pointer leading-5",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
    </motion.div>
  );
}
