import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  Shield,
  ChevronDown 
} from "lucide-react";
import { cn } from "~/lib/utils";

interface TopbarProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
  className?: string;
}

interface UserData {
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
}

export function Topbar({ onMenuToggle, isSidebarOpen, className }: TopbarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // Mock user data - replace with actual user data
  const user: UserData = {
    name: "John Doe",
    email: "john@hostingcompany.com",
    role: "admin",
  };

  const userMenuItems = [
    ...(user.role === "admin" ? [
      {
        icon: Shield,
        label: "Administration",
        href: "/admin",
      }
    ] : []),
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
    },
    {
      icon: LogOut,
      label: "Log Out",
      href: "/auth/login",
      className: "text-destructive hover:text-destructive",
    },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md",
      className
    )}>
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Side - Logo and Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMenuToggle}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold gradient-text">LuminexClient</span>
              <p className="text-xs text-muted-foreground">Hosting Dashboard</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - User Menu */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            {/* User Avatar */}
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-primary" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

            {/* Dropdown Arrow */}
            <motion.div
              animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </motion.button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {isUserMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                
                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-20"
                >
                  <div className="p-2">
                    {/* User Info in Mobile */}
                    <div className="md:hidden px-3 py-2 border-b border-border mb-2">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    {userMenuItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => setIsUserMenuOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200",
                          item.className
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
