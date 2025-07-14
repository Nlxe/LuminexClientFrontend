import { useState, useEffect } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { TicketsPage } from "~/components/tickets/tickets-page";
import { mockTickets } from "~/lib/data/tickets";

export const meta: MetaFunction = () => {
  return [
    { title: "Support Tickets - LuminexClient" },
    {
      name: "description",
      content: "Support ticket management system with status tracking, priority levels, and communication features."
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Simulate realistic API response time (optimized)
  await new Promise(resolve => setTimeout(resolve, 50));
  
  try {
    // In a real app, you'd fetch tickets from your database
    // based on the authenticated user
    return json({
      tickets: mockTickets,
      success: true
    });
  } catch (error) {
    return json({
      tickets: [],
      success: false,
      error: "Failed to load tickets"
    }, { status: 500 });
  }
}

export default function Tickets() {
  const data = useLoaderData<typeof loader>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optimized client-side loading state
    const timer = setTimeout(() => {
      setLoading(false);
    }, 25);

    return () => clearTimeout(timer);
  }, []);

  if (!data.success) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Failed to Load Tickets
            </h2>
            <p className="text-muted-foreground mb-4">
              {"error" in data ? data.error : "Unable to load support tickets"}
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
      <TicketsPage 
        initialTickets={data.tickets} 
        loading={loading}
      />
    </DashboardLayout>
  );
}
