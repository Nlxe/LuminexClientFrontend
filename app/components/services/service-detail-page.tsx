import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Download, 
  Settings, 
  BarChart3,
  Shield,
  Clock,
  Globe,
  Server,
  Bot
} from "lucide-react";
import { Service, ServiceAction } from "~/lib/types/services";
import { ServiceStatus } from "./service-status";
import { ServiceActions } from "./service-actions";
import { PageHeader, Breadcrumb } from "~/components/ui/text/page-header";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Section } from "~/components/ui/sections/section";
import { StatsCard } from "~/components/ui/stats/stats-card";
import { cn } from "~/lib/utils";

interface ServiceDetailPageProps {
  service: Service;
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "configuration" | "logs">("overview");

  const handleServiceAction = async (action: ServiceAction, service: Service) => {
    // Simulate API call with optimized timing
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Executed ${action} on service ${service.id}`);
  };

  // Memoize expensive calculations for better performance
  const CategoryIcon = useMemo(() => {
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
  }, [service.category]);

  const formatDate = useMemo(() => {
    return (dateString: string) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
  }, []);

  // Memoize tabs array to prevent unnecessary re-renders
  const tabs = useMemo(() => [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "metrics", label: "Metrics", icon: BarChart3 },
    { id: "configuration", label: "Configuration", icon: Settings },
    { id: "logs", label: "Logs", icon: Clock }
  ], []);

  // Removed loading skeleton for immediate rendering and better performance

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title={service.name}
        description={`${service.plan.name} - ${service.category.replace("-", " ")}`}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              { label: service.name }
            ]}
          />
        }
        action={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
            {service.domain && (
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Site
              </Button>
            )}
          </div>
        }
      />

      {/* Service Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CategoryIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{service.name}</h2>
                <p className="text-muted-foreground">{service.plan.name}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <ServiceStatus status={service.status} />
                  {service.domain && (
                    <span className="text-sm text-muted-foreground">
                      {service.domain}
                    </span>
                  )}
                  {service.ipAddress && (
                    <span className="text-sm font-mono text-muted-foreground">
                      {service.ipAddress}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <ServiceActions 
              service={service} 
              onAction={handleServiceAction}
            />
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Uptime"
          value={`${service.metrics.uptime}%`}
          description="Last 30 days"
          icon={Shield}
          trend={{
            value: 0.2,
            isPositive: true
          }}
        />
        
        <StatsCard
          title="CPU Usage"
          value={`${service.metrics.cpuUsage}%`}
          description="Current usage"
          icon={BarChart3}
          trend={{
            value: -5.3,
            isPositive: false
          }}
        />
        
        <StatsCard
          title="Memory Usage"
          value={`${service.metrics.memoryUsage}%`}
          description="Current usage"
          icon={BarChart3}
          trend={{
            value: 2.1,
            isPositive: true
          }}
        />
        
        <StatsCard
          title="Disk Usage"
          value={`${service.metrics.diskUsage}%`}
          description="Storage used"
          icon={BarChart3}
          trend={{
            value: 1.8,
            isPositive: true
          }}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section title="Service Information">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <p className="font-medium">{formatDate(service.createdAt)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expires:</span>
                      <p className="font-medium">{formatDate(service.expiresAt)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Plan:</span>
                      <p className="font-medium">{service.plan.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <ServiceStatus status={service.status} size="sm" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Section>

            <Section title="Quick Actions">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Backup
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Configuration
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Section>
          </div>
        )}

        {activeTab === "configuration" && (
          <Section title="Service Configuration">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(service.configuration).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-muted-foreground">
                        {typeof value === "boolean" ? (value ? "Enabled" : "Disabled") : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Section>
        )}

        {(activeTab === "metrics" || activeTab === "logs") && (
          <Section title={activeTab === "metrics" ? "Performance Metrics" : "Service Logs"}>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {activeTab === "metrics" 
                      ? "Detailed metrics and charts will be available here."
                      : "Service logs and activity history will be displayed here."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </Section>
        )}
      </motion.div>
    </div>
  );
}
