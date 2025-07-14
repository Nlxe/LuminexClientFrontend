import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { InvoiceDetailPage } from "~/components/invoices/invoice-detail-page";
import { getInvoiceById } from "~/lib/data/invoices";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.invoice) {
    return [
      { title: "Invoice Not Found - LuminexClient" },
      { name: "description", content: "The requested invoice could not be found." }
    ];
  }

  return [
    { title: `${data.invoice.invoiceNumber} - LuminexClient | Invoice Details` },
    { 
      name: "description", 
      content: `Invoice ${data.invoice.invoiceNumber} for ${data.invoice.customer.company || data.invoice.customer.name}. View details, payment history, and process payments.` 
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  
  if (!id) {
    throw new Response("Invoice ID is required", { status: 400 });
  }

  // Simulate realistic API response time (optimized)
  await new Promise(resolve => setTimeout(resolve, 50));
  
  try {
    const invoice = getInvoiceById(id);
    
    if (!invoice) {
      throw new Response("Invoice not found", { status: 404 });
    }

    return json({
      invoice,
      success: true
    });
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    
    return json({
      invoice: null,
      success: false,
      error: "Failed to load invoice details"
    }, { status: 500 });
  }
}

export default function InvoiceDetail() {
  const data = useLoaderData<typeof loader>();

  if (!data.success || !data.invoice) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Invoice Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              {"error" in data ? data.error : "The requested invoice could not be found."}
            </p>
            <div className="space-x-2">
              <button 
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={() => window.location.href = "/invoices"}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View All Invoices
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <InvoiceDetailPage invoice={data.invoice} />
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
            We encountered an error while loading the invoice details.
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
