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
      title: "Modern UI Components",
      description: "Beautiful and accessible UI components built with Radix UI and styled with Tailwind CSS. Fully customizable and ready to use in your projects.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Server,
      title: "TypeScript Support",
      description: "Full TypeScript support with type safety throughout the application. Includes proper interfaces and type definitions for better development experience.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: MessageSquare,
      title: "Responsive Design",
      description: "Mobile-first responsive design that works perfectly on all devices. Built with modern CSS Grid and Flexbox for optimal layout flexibility.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Globe,
      title: "Dark Theme",
      description: "Beautiful dark theme implementation with proper contrast ratios and accessibility considerations. Easy to customize and extend.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: DollarSign,
      title: "Framer Motion",
      description: "Smooth animations and micro-interactions powered by Framer Motion. Enhances user experience with delightful motion design.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Smartphone,
      title: "Remix Framework",
      description: "Built on top of Remix for optimal performance with server-side rendering, progressive enhancement, and excellent developer experience.",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: Palette,
      title: "Customizable Styling",
      description: "Easy to customize with CSS variables and Tailwind CSS. Change colors, fonts, and layouts to match your brand and design requirements.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Built with performance in mind using modern web standards. Optimized bundle sizes, lazy loading, and efficient rendering for fast user experiences.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: BarChart3,
      title: "Component Library",
      description: "Comprehensive set of reusable components including forms, tables, modals, and more. Well-documented and easy to integrate into your projects.",
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
            <span className="gradient-text">Modern Frontend Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive set of features and components built with modern web technologies for creating beautiful user interfaces.
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
