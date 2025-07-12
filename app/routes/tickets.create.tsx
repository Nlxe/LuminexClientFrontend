import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { CreateTicketPage } from "~/components/tickets/create-ticket-page";
import { CreateTicketData } from "~/lib/types/tickets";

export const meta: MetaFunction = () => {
  return [
    { title: "Create Support Ticket - LuminexClient | Customer Support" },
    { 
      name: "description", 
      content: "Submit a new support ticket for technical, billing, or general assistance. Get help from our expert support team." 
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  try {
    // Extract form data
    const ticketData: CreateTicketData = {
      subject: formData.get("subject") as string,
      category: formData.get("category") as any,
      priority: formData.get("priority") as any,
      description: formData.get("description") as string,
      serviceId: formData.get("serviceId") as string || undefined,
    };

    // Validate required fields
    if (!ticketData.subject || !ticketData.description) {
      return json({
        success: false,
        error: "Subject and description are required"
      }, { status: 400 });
    }

    // Simulate API call to create ticket
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, you would:
    // 1. Save the ticket to your database
    // 2. Send notification emails
    // 3. Create initial message
    // 4. Handle file uploads
    
    console.log("Creating ticket:", ticketData);
    
    // Generate mock ticket ID
    const ticketId = `TKT-${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
    
    // Redirect to the new ticket
    return redirect(`/tickets/${ticketId}`);
    
  } catch (error) {
    console.error("Failed to create ticket:", error);
    return json({
      success: false,
      error: "Failed to create ticket. Please try again."
    }, { status: 500 });
  }
}

export default function CreateTicket() {
  const actionData = useActionData<typeof action>();

  const handleSubmit = async (data: CreateTicketData) => {
    // This will be handled by the action function
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("category", data.category);
    formData.append("priority", data.priority);
    formData.append("description", data.description);
    if (data.serviceId) {
      formData.append("serviceId", data.serviceId);
    }

    // In a real app, you'd also handle file uploads here
    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachment_${index}`, file);
      });
    }

    // Submit the form
    const form = document.createElement("form");
    form.method = "POST";
    form.style.display = "none";
    
    for (const [key, value] of formData.entries()) {
      const input = document.createElement("input");
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    }
    
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <DashboardLayout>
      <CreateTicketPage onSubmit={handleSubmit} />
      
      {/* Show error if submission failed */}
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
