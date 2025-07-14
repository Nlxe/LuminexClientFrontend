import { useState, useEffect } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { InvoicesPage } from "~/components/invoices/invoices-page";
import { mockInvoices } from "~/lib/data/invoices";

export const meta: MetaFunction = () => {
  return [
    { title: "Invoices - LuminexClient" },
    {
      name: "description",
      content: "Invoice management interface with status tracking, payment processing, and detailed invoice views."
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Simulate realistic API response time (optimized)
  await new Promise(resolve => setTimeout(resolve, 50));
  
  try {
    // In a real app, you'd fetch invoices from your database
    // based on the authenticated user
    return json({
      invoices: mockInvoices,
      success: true
    });
  } catch (error) {
    return json({
      invoices: [],
      success: false,
      error: "Failed to load invoices"
    }, { status: 500 });
  }
}

export default function Invoices() {
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
              Failed to Load Invoices
            </h2>
            <p className="text-muted-foreground mb-4">
              {"error" in data ? data.error : "Unable to load invoices"}
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
      <InvoicesPage 
        initialInvoices={data.invoices} 
        loading={loading}
      />
    </DashboardLayout>
  );
}
