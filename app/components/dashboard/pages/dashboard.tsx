import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  MessageSquare, 
  CreditCard, 
  Shield, 
  Settings,
  Plus,
  TrendingUp,
  Clock,
  AlertCircle
} from "lucide-react";
import { StatsCard } from "~/components/ui/stats/stats-card";
import { Section } from "~/components/ui/sections/section";
import { ActionButton } from "~/components/ui/buttons/action-button";
import { PageHeader } from "~/components/ui/text/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

interface DashboardStats {
  services: {
    total: number;
    active: number;
    trend: number;
  };
  tickets: {
    total: number;
    open: number;
    trend: number;
  };
  invoices: {
    total: number;
    unpaid: number;
    trend: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    trend: number;
  };
}

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [securityCode] = useState("ABC123"); // Mock security code

  // Mock data loading with optimized performance
  useEffect(() => {
    const loadStats = async () => {
      try {
        // Simulate realistic API response time (200-300ms)
        await new Promise(resolve => setTimeout(resolve, 250));

        setStats({
          services: {
            total: 12,
            active: 10,
            trend: 8.2,
          },
          tickets: {
            total: 45,
            open: 3,
            trend: -12.5,
          },
          invoices: {
            total: 156,
            unpaid: 8,
            trend: 15.3,
          },
          revenue: {
            total: 24500,
            thisMonth: 3200,
            trend: 22.1,
          },
        });

        setLoading(false);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
        setError("Failed to load dashboard data. Please try refreshing the page.");
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const quickActions = [
    {
      title: "Order New Service",
      description: "Add hosting, domains, or other services",
      icon: Plus,
      href: "/order",
    },
    {
      title: "Create Support Ticket",
      description: "Get help from our support team",
      icon: MessageSquare,
      href: "/tickets/create",
    },
    {
      title: "View Invoices",
      description: "Check your billing and payment history",
      icon: CreditCard,
      href: "/invoices",
    },
    {
      title: "Manage Services",
      description: "Configure and monitor your services",
      icon: Settings,
      href: "/services",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "service",
      title: "Web Hosting Pro activated",
      time: "2 hours ago",
      icon: Server,
    },
    {
      id: 2,
      type: "ticket",
      title: "Support ticket #1234 resolved",
      time: "5 hours ago",
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "invoice",
      title: "Invoice #INV-2024-001 paid",
      time: "1 day ago",
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your hosting services and account activity."
      />

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Statistics Cards */}
      <Section title="Overview">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {[
            {
              title: "Total Services",
              value: stats?.services.total || 0,
              description: `${stats?.services.active || 0} active`,
              icon: Server,
              trend: {
                value: stats?.services.trend || 0,
                isPositive: (stats?.services.trend || 0) > 0,
              },
            },
            {
              title: "Support Tickets",
              value: stats?.tickets.total || 0,
              description: `${stats?.tickets.open || 0} open`,
              icon: MessageSquare,
              trend: {
                value: stats?.tickets.trend || 0,
                isPositive: (stats?.tickets.trend || 0) > 0,
              },
            },
            {
              title: "Invoices",
              value: stats?.invoices.total || 0,
              description: `${stats?.invoices.unpaid || 0} unpaid`,
              icon: CreditCard,
              trend: {
                value: stats?.invoices.trend || 0,
                isPositive: (stats?.invoices.trend || 0) > 0,
              },
            },
            {
              title: "Revenue",
              value: `$${stats?.revenue.total?.toLocaleString() || 0}`,
              description: `$${stats?.revenue.thisMonth?.toLocaleString() || 0} this month`,
              icon: TrendingUp,
              trend: {
                value: stats?.revenue.trend || 0,
                isPositive: (stats?.revenue.trend || 0) > 0,
              },
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <StatsCard
                title={card.title}
                value={card.value}
                description={card.description}
                icon={card.icon}
                trend={card.trend}
                loading={loading}
              />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Security Section */}
        <div className="lg:col-span-1">
          <Section title="Security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Your Security Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-primary bg-primary/10 rounded-lg py-4">
                    {securityCode}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Use this code for login verification
                  </p>
                </div>
                
                <Button variant="outline" className="w-full">
                  Generate New Code
                </Button>
              </CardContent>
            </Card>
          </Section>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Section title="Quick Actions">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ActionButton
                    title={action.title}
                    description={action.description}
                    icon={action.icon}
                    href={action.href}
                    variant="outline"
                  />
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Recent Activity */}
      <Section title="Recent Activity">
        <Card>
          <CardContent className="p-0">
            {recentActivity.length > 0 ? (
              <div className="divide-y divide-border">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <activity.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}
