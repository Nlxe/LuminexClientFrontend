import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, ArrowRight, Globe, Server, Bot } from "lucide-react";
import { ServiceCategory, ServicePlan } from "~/lib/types/services";
import { servicePlans, serviceCategories } from "~/lib/data/services";
import { PageHeader } from "~/components/ui/text/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface ServiceOrderPageProps {
  loading?: boolean;
}

export function ServiceOrderPage({ loading = false }: ServiceOrderPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("web-hosting");
  const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const filteredPlans = servicePlans.filter(plan => plan.category === selectedCategory);

  const getCategoryIcon = (category: ServiceCategory) => {
    switch (category) {
      case "web-hosting":
        return Globe;
      case "minecraft-hosting":
        return Server;
      case "discord-bot-hosting":
        return Bot;
      default:
        return Server;
    }
  };

  const formatPrice = (plan: ServicePlan, cycle: "monthly" | "yearly") => {
    const price = cycle === "monthly" ? plan.pricing.monthly : plan.pricing.yearly;
    const monthlyPrice = cycle === "yearly" ? price / 12 : price;
    
    return {
      price: price,
      monthlyPrice: monthlyPrice,
      savings: cycle === "yearly" ? ((plan.pricing.monthly * 12 - price) / (plan.pricing.monthly * 12) * 100) : 0
    };
  };

  const handleOrderPlan = (plan: ServicePlan) => {
    setSelectedPlan(plan);
    console.log("Order plan:", plan.id, "Billing cycle:", billingCycle);
    // Handle order process
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Order Services"
          description="Choose the perfect hosting solution for your needs"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-8 bg-muted rounded w-1/2"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-3 bg-muted rounded"></div>
                    ))}
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
        title="Order Services"
        description="Choose the perfect hosting solution for your needs"
      />

      {/* Category Selection */}
      <div className="flex flex-wrap gap-4 justify-center">
        {serviceCategories.map((category) => {
          const Icon = getCategoryIcon(category.id);
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 min-w-[200px]",
                selectedCategory === category.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50"
              )}
            >
              <Icon className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">{category.name}</div>
                <div className="text-xs opacity-75">{category.description}</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              billingCycle === "monthly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative",
              billingCycle === "yearly"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Yearly
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded">
              Save
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPlans.map((plan, index) => {
            const pricing = formatPrice(plan, billingCycle);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                
                <Card className={cn(
                  "h-full transition-all duration-300 hover:shadow-lg",
                  plan.popular && "border-primary shadow-md"
                )}>
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                    
                    <div className="pt-4">
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-3xl font-bold text-foreground">
                          ${pricing.price.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      
                      {billingCycle === "yearly" && pricing.savings > 0 && (
                        <div className="text-sm text-green-500 font-medium">
                          Save {pricing.savings.toFixed(0)}% annually
                        </div>
                      )}
                      
                      {billingCycle === "yearly" && (
                        <div className="text-xs text-muted-foreground">
                          ${pricing.monthlyPrice.toFixed(2)}/month when paid yearly
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Specifications */}
                    <div className="border-t border-border pt-4">
                      <h4 className="font-medium text-sm mb-3">Specifications</h4>
                      <div className="space-y-2">
                        {Object.entries(plan.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Button */}
                    <Button
                      onClick={() => handleOrderPlan(plan)}
                      className={cn(
                        "w-full group",
                        plan.popular && "bg-primary hover:bg-primary/90"
                      )}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <span>Order Now</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center pt-8 border-t border-border"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">24/7</div>
            <div className="text-sm text-muted-foreground">Expert Support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">30-Day</div>
            <div className="text-sm text-muted-foreground">Money Back</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
