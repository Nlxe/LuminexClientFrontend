import { useState, useEffect } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { ServicesPage } from "~/components/services/services-page";
import { userServices } from "~/lib/data/services";

export const meta: MetaFunction = () => {
  return [
    { title: "Services - LuminexClient" },
    {
      name: "description",
      content: "Services management interface with filtering, status tracking, and detailed service information."
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Simulate realistic API response time (optimized)
  await new Promise(resolve => setTimeout(resolve, 50));
  
  try {
    // In a real app, you'd fetch services from your database
    // based on the authenticated user
    return json({
      services: userServices,
      success: true
    });
  } catch (error) {
    return json({
      services: [],
      success: false,
      error: "Failed to load services"
    }, { status: 500 });
  }
}

export default function Services() {
  const { services, success, error } = useLoaderData<typeof loader>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optimized client-side loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 25);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Failed to Load Services
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
      <ServicesPage 
        initialServices={success ? services : []} 
        loading={loading}
      />
    </DashboardLayout>
  );
}
