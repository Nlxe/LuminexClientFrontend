import { useState, useEffect } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { TicketDetailPage } from "~/components/tickets/ticket-detail-page";
import { getTicketById } from "~/lib/data/tickets";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.ticket) {
    return [
      { title: "Ticket Not Found - LuminexClient" },
      { name: "description", content: "The requested support ticket could not be found." }
    ];
  }

  return [
    { title: `${data.ticket.subject} - LuminexClient | Support Ticket` },
    { 
      name: "description", 
      content: `Support ticket #${data.ticket.id}: ${data.ticket.subject}. Track progress and communicate with our support team.` 
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  
  if (!id) {
    throw new Response("Ticket ID is required", { status: 400 });
  }

  // Simulate realistic API response time (optimized)
  await new Promise(resolve => setTimeout(resolve, 50));
  
  try {
    const ticket = getTicketById(id);
    
    if (!ticket) {
      throw new Response("Ticket not found", { status: 404 });
    }

    return json({
      ticket,
      success: true
    });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    
    return json({
      ticket: null,
      success: false,
      error: "Failed to load ticket details"
    }, { status: 500 });
  }
}

export default function TicketDetail() {
  const data = useLoaderData<typeof loader>();

  if (!data.success || !data.ticket) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Ticket Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              {"error" in data ? data.error : "The requested ticket could not be found."}
            </p>
            <div className="space-x-2">
              <button 
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={() => window.location.href = "/tickets"}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View All Tickets
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <TicketDetailPage ticket={data.ticket} />
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
            We encountered an error while loading the ticket details.
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
