import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Filter, Search, Grid, List } from "lucide-react";
import { ServiceCategory, Service } from "~/lib/types/services";
import { serviceCategories, getServicesByCategory } from "~/lib/data/services";
import { ServiceCard } from "./service-card";
import { ServiceStatus } from "./service-status";
import { PageHeader } from "~/components/ui/text/page-header";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface ServicesPageProps {
  initialServices?: Service[];
  loading?: boolean;
}

export function ServicesPage({ initialServices = [], loading = false }: ServicesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("web-hosting");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [services, setServices] = useState<Service[]>(initialServices);

  useEffect(() => {
    if (!loading) {
      // Optimized data loading with faster timing
      const timer = setTimeout(() => {
        setServices(getServicesByCategory(selectedCategory));
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [selectedCategory, loading]);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceManage = (service: Service) => {
    console.log("Manage service:", service.id);
    // Handle service management
  };

  const handleServiceDetails = (service: Service) => {
    console.log("View service details:", service.id);
    // Navigate to service details
    window.location.href = `/services/${service.id}`;
  };

  const getServiceCountByStatus = (status: string) => {
    return services.filter(service => service.status === status).length;
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="My Services"
          description="Manage your hosting services and configurations"
        />
        
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="My Services"
        description="Manage your hosting services and configurations"
        action={
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Order Service</span>
          </Button>
        }
      />

      {/* Service Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { status: "active", label: "Active", count: getServiceCountByStatus("active") },
          { status: "pending", label: "Pending", count: getServiceCountByStatus("pending") },
          { status: "suspended", label: "Suspended", count: getServiceCountByStatus("suspended") },
          { status: "maintenance", label: "Maintenance", count: getServiceCountByStatus("maintenance") }
        ].map((stat, index) => (
          <motion.div
            key={stat.status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.count}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <ServiceStatus 
                    status={stat.status as any} 
                    showLabel={false} 
                    size="sm" 
                  />
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {serviceCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50"
              )}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <div className="flex border border-border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "grid gap-6",
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          )}
        >
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ServiceCard
                  service={service}
                  onManage={handleServiceManage}
                  onViewDetails={handleServiceDetails}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="text-muted-foreground">
                {searchQuery ? (
                  <p>No services found matching "{searchQuery}"</p>
                ) : (
                  <p>No services in this category yet.</p>
                )}
              </div>
              <Button className="mt-4" onClick={() => window.location.href = "/order"}>
                <Plus className="w-4 h-4 mr-2" />
                Order Your First Service
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
