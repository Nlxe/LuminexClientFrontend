import { useState, useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { ServiceOrderPage } from "~/components/services/service-order-page";
import { servicePlans } from "~/lib/data/services";

export const meta: MetaFunction = () => {
  return [
    { title: "Order Services - LuminexClient | Hosting Solutions" },
    { 
      name: "description", 
      content: "Order web hosting, Minecraft servers, Discord bot hosting and more. Choose from our range of hosting solutions with competitive pricing." 
    },
    { name: "keywords", content: "web hosting, minecraft hosting, discord bot hosting, vps, dedicated servers, hosting plans" },
  ];
};

export async function loader() {
  // Simulate realistic API response time (optimized)
  await new Promise(resolve => setTimeout(resolve, 30));
  
  try {
    // In a real app, you might fetch current pricing, availability, etc.
    return json({
      plans: servicePlans,
      success: true
    });
  } catch (error) {
    return json({
      plans: [],
      success: false,
      error: "Failed to load service plans"
    }, { status: 500 });
  }
}

export default function Order() {
  const { plans, success, error } = useLoaderData<typeof loader>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optimized client-side loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 20);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Failed to Load Service Plans
            </h2>
            <p className="text-muted-foreground mb-4">
              {error}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ServiceOrderPage loading={loading} />
    </DashboardLayout>
  );
}
