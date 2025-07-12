import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { ServiceDetailPage } from "~/components/services/service-detail-page";
import { getServiceById } from "~/lib/data/services";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.service) {
    return [
      { title: "Service Not Found - LuminexClient" },
      { name: "description", content: "The requested service could not be found." }
    ];
  }

  return [
    { title: `${data.service.name} - LuminexClient | Service Details` },
    { 
      name: "description", 
      content: `Manage ${data.service.name} - ${data.service.plan.name}. View status, metrics, and configuration options.` 
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  
  if (!id) {
    throw new Response("Service ID is required", { status: 400 });
  }

  // Simulate realistic API response time (optimized for performance)
  await new Promise(resolve => setTimeout(resolve, 50));
  
  try {
    const service = getServiceById(id);
    
    if (!service) {
      throw new Response("Service not found", { status: 404 });
    }

    return json({
      service,
      success: true
    });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    
    return json({
      service: null,
      success: false,
      error: "Failed to load service details"
    }, { status: 500 });
  }
}

export default function ServiceDetail() {
  const data = useLoaderData<typeof loader>();
  // Remove unnecessary client-side loading state for better performance

  if (!data.success || !data.service) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Service Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              {"error" in data ? data.error : "The requested service could not be found."}
            </p>
            <div className="space-x-2">
              <button 
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={() => window.location.href = "/services"}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View All Services
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ServiceDetailPage
        service={data.service}
      />
    </DashboardLayout>
  );
}

export function ErrorBoundary() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-4">
            We encountered an error while loading the service details.
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
