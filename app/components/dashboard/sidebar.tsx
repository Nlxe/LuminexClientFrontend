import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "@remix-run/react";
import {
  LayoutDashboard,
  Server,
  Plus,
  ShoppingCart,
  MessageSquare,
  FileText,
  CreditCard,
  Receipt,
  ChevronRight,
  Settings
} from "lucide-react";
import { cn } from "~/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: MenuItem[];
  isActive?: boolean;
}

interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

export function Sidebar({ isOpen, onClose, className }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["dashboard"]);
  const [isDesktop, setIsDesktop] = useState(false);
  const location = useLocation();

  // Check if we're on desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Determine active item based on current location
  const activeItem = (() => {
    const path = location.pathname;
    if (path === "/dashboard") return "dashboard";
    if (path.startsWith("/services")) return "my-services";
    if (path.startsWith("/order")) return "order-service";
    if (path.startsWith("/tickets")) return "all-tickets";
    if (path.startsWith("/invoices")) return "all-invoices";
    if (path.startsWith("/settings")) return "settings";
    return "dashboard";
  })();

  const menuCategories: MenuCategory[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/dashboard",
          isActive: activeItem === "dashboard",
        },
        {
          id: "services",
          label: "Add Services",
          icon: Plus,
          children: [
            {
              id: "my-services",
              label: "My Services",
              icon: Server,
              href: "/services",
            },
            {
              id: "order-service",
              label: "Order Service",
              icon: ShoppingCart,
              href: "/order",
            },
          ],
        },
      ],
    },
    {
      id: "support",
      label: "Support",
      items: [
        {
          id: "tickets",
          label: "Tickets",
          icon: MessageSquare,
          children: [
            {
              id: "all-tickets",
              label: "All Tickets",
              icon: FileText,
              href: "/tickets",
            },
            {
              id: "create-ticket",
              label: "Create Ticket",
              icon: Plus,
              href: "/tickets/create",
            },
          ],
        },
      ],
    },
    {
      id: "billing",
      label: "Billing",
      items: [
        {
          id: "invoices",
          label: "Invoices",
          icon: CreditCard,
          children: [
            {
              id: "all-invoices",
              label: "All Invoices",
              icon: Receipt,
              href: "/invoices",
            },
          ],
        },
      ],
    },
    {
      id: "account",
      label: "Account",
      items: [
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          href: "/settings",
          isActive: activeItem === "settings",
        },
      ],
    },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else {
      // Close mobile sidebar when item is clicked
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        {item.href && !hasChildren ? (
          <motion.div
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to={item.href}
              onClick={() => handleItemClick(item)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200",
                level === 0 ? "font-medium" : "font-normal",
                level > 0 && "ml-4",
                item.isActive || activeItem === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
            </Link>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleItemClick(item)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200",
              level === 0 ? "font-medium" : "font-normal",
              level > 0 && "ml-4",
              item.isActive || activeItem === item.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <div className="flex items-center space-x-3">
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </div>

            {hasChildren && (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            )}
          </motion.button>
        )}

        {/* Submenu */}
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-1 space-y-1">
                {item.children?.map(child => renderMenuItem(child, level + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: isDesktop ? 0 : -280 }}
        animate={{
          x: isDesktop ? 0 : (isOpen ? 0 : -280)
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-r border-border bg-background lg:sticky lg:translate-x-0 lg:z-auto",
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-6">
              {menuCategories.map((category) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {category.label}
                  </h3>
                  
                  {/* Category Items */}
                  <div className="space-y-1">
                    {category.items.map(item => renderMenuItem(item))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-border p-4">
            <div className="text-xs text-muted-foreground">
              <p>LuminexClient v2.0</p>
              <p>Open Source WHMCS Alternative</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
