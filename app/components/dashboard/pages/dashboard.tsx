import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  Server,
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { PageHeader } from "~/components/ui/text/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { StatsCard } from "~/components/ui/stats/stats-card";

export function DashboardPage() {
  const [stats, setStats] = useState({
    totalServices: 5,
    activeServices: 4,
    pendingTickets: 2,
    unpaidInvoices: 1,
    monthlyRevenue: 127.45,
    uptime: 99.9
  });

  const quickActions = [
    {
      title: "Create New Item",
      description: "Add new items to your account",
      icon: Plus,
      href: "/create",
    },
    {
      title: "Support Center",
      description: "Get help and submit tickets",
      icon: MessageSquare,
      href: "/tickets/create",
    },
    {
      title: "View Invoices",
      description: "Check your billing information",
      icon: CreditCard,
      href: "/invoices",
    },
    {
      title: "Account Settings",
      description: "Manage your account preferences",
      icon: Settings,
      href: "/settings",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "service",
      title: "Pro Hosting Plan renewed",
      description: "Your hosting service has been renewed for another month",
      time: "2 hours ago",
      icon: Server,
      color: "text-green-500"
    },
    {
      id: 2,
      type: "ticket",
      title: "Support ticket #TKT-001 updated",
      description: "Response received for your website performance issue",
      time: "5 hours ago",
      icon: MessageSquare,
      color: "text-blue-500"
    },
    {
      id: 3,
      type: "invoice",
      title: "Invoice INV-2024-001 generated",
      description: "New invoice for $27.05 is now available",
      time: "1 day ago",
      icon: CreditCard,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your account and recent activity."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Items"
          value={stats.totalServices.toString()}
          description="Active items in account"
          icon={Server}
          trend={{
            value: 1,
            isPositive: true
          }}
        />

        <StatsCard
          title="System Status"
          value={`${stats.uptime}%`}
          description="Last 30 days"
          icon={TrendingUp}
          trend={{
            value: 0.1,
            isPositive: true
          }}
        />

        <StatsCard
          title="Open Tickets"
          value={stats.pendingTickets.toString()}
          description="Pending requests"
          icon={MessageSquare}
          trend={{
            value: -1,
            isPositive: true
          }}
        />

        <StatsCard
          title="Account Balance"
          value={`$${stats.monthlyRevenue.toFixed(2)}`}
          description="Current balance"
          icon={DollarSign}
          trend={{
            value: 15.2,
            isPositive: false
          }}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div 
                    className="flex flex-col items-center text-center space-y-4"
                    onClick={() => window.location.href = action.href}
                  >
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                      <action.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-500">All Systems Operational</p>
                    <p className="text-xs text-muted-foreground">Last checked: 2 minutes ago</p>
                  </div>
                </div>
              </div>

              {stats.unpaidInvoices > 0 && (
                <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-orange-500">
                        {stats.unpaidInvoices} Unpaid Invoice{stats.unpaidInvoices !== 1 ? 's' : ''}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Please review your billing section
                      </p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.location.href = "/invoices"}
                  >
                    View
                  </Button>
                </div>
              )}

              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Service Health</span>
                  <span className="text-sm text-green-500">Excellent</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stats.uptime}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.uptime}% uptime this month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
