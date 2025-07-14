import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { InvoicePaymentPage } from "~/components/invoices/invoice-payment-page";
import { getInvoiceById } from "~/lib/data/invoices";
import { PaymentFormData } from "~/lib/types/invoices";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.invoice) {
    return [
      { title: "Invoice Not Found - LuminexClient" },
      { name: "description", content: "The requested invoice could not be found." }
    ];
  }

  return [
    { title: `Pay ${data.invoice.invoiceNumber} - LuminexClient | Invoice Payment` },
    { 
      name: "description", 
      content: `Secure payment for invoice ${data.invoice.invoiceNumber}. Multiple payment methods available including credit card, PayPal, and bank transfer.` 
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

    // Check if invoice can be paid
    if (invoice.status === "paid" || invoice.status === "cancelled" || invoice.status === "draft") {
      throw new Response("Invoice cannot be paid", { status: 400 });
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

export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;
  const formData = await request.formData();
  
  try {
    // Extract payment data
    const paymentData: PaymentFormData = {
      paymentMethod: formData.get("paymentMethod") as any,
      amount: Number(formData.get("amount")),
    };

    // Add method-specific data
    if (paymentData.paymentMethod === "credit-card") {
      paymentData.cardDetails = {
        cardNumber: formData.get("cardNumber") as string,
        expiryMonth: formData.get("expiryMonth") as string,
        expiryYear: formData.get("expiryYear") as string,
        cvv: formData.get("cvv") as string,
        cardholderName: formData.get("cardholderName") as string,
      };
    }

    if (paymentData.paymentMethod === "paypal") {
      paymentData.paypalEmail = formData.get("paypalEmail") as string;
    }

    if (paymentData.paymentMethod === "bank-transfer") {
      paymentData.bankDetails = {
        accountNumber: formData.get("accountNumber") as string,
        routingNumber: formData.get("routingNumber") as string,
        accountHolderName: formData.get("accountHolderName") as string,
      };
    }

    // Validate payment data
    if (!paymentData.paymentMethod || paymentData.amount <= 0) {
      return json({
        success: false,
        error: "Invalid payment data"
      }, { status: 400 });
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would:
    // 1. Process the payment with the payment gateway
    // 2. Update the invoice status in the database
    // 3. Send confirmation emails
    // 4. Log the transaction
    
    console.log("Processing payment:", paymentData);
    
    // Simulate payment success (90% success rate for demo)
    const paymentSuccess = Math.random() > 0.1;
    
    if (!paymentSuccess) {
      return json({
        success: false,
        error: "Payment processing failed. Please check your payment details and try again."
      }, { status: 400 });
    }
    
    // Redirect to invoice details with success message
    return redirect(`/invoices/${id}?payment=success`);
    
  } catch (error) {
    console.error("Payment processing error:", error);
    return json({
      success: false,
      error: "Payment processing failed. Please try again."
    }, { status: 500 });
  }
}

export default function InvoicePayment() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  if (!data.success || !data.invoice) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Invoice Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              {"error" in data ? data.error : "The requested invoice could not be found or cannot be paid."}
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

  const handleSubmitPayment = async (paymentData: PaymentFormData) => {
    // This will be handled by the action function
    const form = document.createElement("form");
    form.method = "POST";
    form.style.display = "none";
    
    // Add payment data to form
    Object.entries(paymentData).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        // Handle nested objects (cardDetails, bankDetails, etc.)
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          const input = document.createElement("input");
          input.name = nestedKey;
          input.value = String(nestedValue);
          form.appendChild(input);
        });
      } else {
        const input = document.createElement("input");
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      }
    });
    
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <DashboardLayout>
      <InvoicePaymentPage 
        invoice={data.invoice} 
        onSubmitPayment={handleSubmitPayment}
      />
      
      {/* Show error if payment failed */}
      {actionData && !actionData.success && (
        <div className="fixed bottom-4 right-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg max-w-md">
          <p className="text-sm text-red-500">
            {actionData.error}
          </p>
        </div>
      )}
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
            We encountered an error while processing your payment.
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
