import { motion } from "framer-motion";
import {
  CreditCard,
  Server,
  MessageSquare,
  Globe,
  DollarSign,
  Smartphone,
  Palette,
  Zap,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "~/lib/utils";

interface FeaturesProps {
  className?: string;
}

export function Features({ className }: FeaturesProps) {
  const features = [
    {
      icon: CreditCard,
      title: "Automated Billing & Invoicing",
      description: "Streamline your revenue with automated recurring billing, invoice generation, and payment processing. Support for multiple payment gateways and currencies.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Server,
      title: "Service Provisioning",
      description: "Automatically provision hosting accounts, domains, SSL certificates, and other services. Integrate with popular control panels like cPanel, Plesk, and DirectAdmin.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: MessageSquare,
      title: "Support Ticket System",
      description: "Built-in helpdesk with ticket management, knowledge base, and customer communication tools. Keep your clients happy with efficient support workflows.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Globe,
      title: "Domain Management",
      description: "Complete domain lifecycle management including registration, transfers, renewals, and DNS management. Integrate with major domain registrars.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: DollarSign,
      title: "Multi-Currency Support",
      description: "Accept payments in multiple currencies with real-time exchange rates. Perfect for international hosting providers and global service businesses.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Smartphone,
      title: "Mobile-Responsive Portal",
      description: "Your clients can manage their services, view invoices, and submit tickets from any device. Fully responsive design for optimal mobile experience.",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "White-label solution with complete customization options. Use your own branding, colors, and domain to maintain your professional image.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      icon: Zap,
      title: "API Integrations",
      description: "Extensive REST API for custom integrations. Connect with your existing tools, automate workflows, and build custom solutions on top of LuminexClient.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics dashboard. Track revenue, monitor service usage, analyze customer behavior, and make data-driven decisions.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className={cn("py-24 bg-muted/30", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Complete Client Management</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything hosting providers and service businesses need to manage clients, automate billing, and grow their business efficiently.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className={cn(
                        "p-3 rounded-lg",
                        feature.bgColor
                      )}
                    >
                      <feature.icon className={cn("w-6 h-6", feature.color)} />
                    </motion.div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold glow-effect hover:opacity-90 transition-opacity duration-200"
          >
            Download Open Source
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
