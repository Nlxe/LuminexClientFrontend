import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Download, 
  CreditCard, 
  Calendar, 
  Building,
  Mail,
  MapPin,
  Receipt,
  History,
  Settings
} from "lucide-react";
import { Invoice } from "~/lib/types/invoices";
import { InvoiceStatus } from "./invoice-status";
import { PaymentMethodBadge } from "./payment-method-badge";
import { LineItemDisplay } from "./line-item-display";
import { PageHeader, Breadcrumb } from "~/components/ui/text/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Section } from "~/components/ui/sections/section";
import { cn } from "~/lib/utils";

interface InvoiceDetailPageProps {
  invoice: Invoice;
}

export function InvoiceDetailPage({ invoice }: InvoiceDetailPageProps) {
  const [activeTab, setActiveTab] = useState<"details" | "payments" | "history">("details");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: invoice.currency
    }).format(amount);
  };

  const getDaysOverdue = () => {
    if (invoice.status !== "overdue") return 0;
    const dueDate = new Date(invoice.dueAt);
    const today = new Date();
    const diffTime = today.getTime() - dueDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const canPay = invoice.status === "unpaid" || invoice.status === "overdue";
  const daysOverdue = getDaysOverdue();

  const tabs = [
    { id: "details", label: "Invoice Details", icon: Receipt },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "history", label: "Activity", icon: History }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title={invoice.invoiceNumber}
        description={`Invoice for ${invoice.customer.company || invoice.customer.name}`}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Invoices", href: "/invoices" },
              { label: invoice.invoiceNumber }
            ]}
          />
        }
        action={
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Invoices
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            {canPay && (
              <Button onClick={() => window.location.href = `/invoices/${invoice.id}/pay`}>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Now
              </Button>
            )}
          </div>
        }
      />

      {/* Invoice Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Invoice Info */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Invoice Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Invoice Number:</span>
                  <p className="font-medium">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <div className="mt-1">
                    <InvoiceStatus status={invoice.status} />
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Payment Terms:</span>
                  <p className="font-medium">{invoice.paymentTerms}</p>
                </div>
                {daysOverdue > 0 && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-500 font-medium">
                      {daysOverdue} day{daysOverdue !== 1 ? 's' : ''} overdue
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Important Dates</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Issued:</span>
                    <p className="font-medium">{formatDate(invoice.issuedAt)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">Due:</span>
                    <p className={cn(
                      "font-medium",
                      invoice.status === "overdue" && "text-red-500"
                    )}>
                      {formatDate(invoice.dueAt)}
                    </p>
                  </div>
                </div>
                {invoice.paidAt && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <div>
                      <span className="text-sm text-muted-foreground">Paid:</span>
                      <p className="font-medium text-green-500">{formatDate(invoice.paidAt)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Amount Summary */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Amount Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
                </div>
                {invoice.totalTax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tax:</span>
                    <span className="font-medium">{formatCurrency(invoice.totalTax)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold border-t border-border pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(invoice.total)}</span>
                </div>
                {invoice.amountPaid > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span className="text-sm">Amount Paid:</span>
                    <span className="font-medium">{formatCurrency(invoice.amountPaid)}</span>
                  </div>
                )}
                {invoice.amountDue > 0 && (
                  <div className="flex justify-between text-orange-500">
                    <span className="text-sm">Amount Due:</span>
                    <span className="font-medium">{formatCurrency(invoice.amountDue)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>Customer Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Contact Details</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {invoice.customer.company ? (
                      <>
                        <span className="font-medium">{invoice.customer.company}</span>
                        <br />
                        <span className="text-muted-foreground">{invoice.customer.name}</span>
                      </>
                    ) : (
                      <span className="font-medium">{invoice.customer.name}</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{invoice.customer.email}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">Billing Address</h4>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p>{invoice.customer.address.street}</p>
                  <p>
                    {invoice.customer.address.city}, {invoice.customer.address.state} {invoice.customer.address.zipCode}
                  </p>
                  <p>{invoice.customer.address.country}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "details" && (
          <div className="space-y-6">
            <LineItemDisplay 
              lineItems={invoice.lineItems} 
              currency={invoice.currency} 
            />
            
            {invoice.taxes.length > 0 && (
              <Section title="Tax Breakdown">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {invoice.taxes.map((tax) => (
                        <div key={tax.id} className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{tax.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">
                              ({tax.rate}% on {formatCurrency(tax.taxableAmount)})
                            </span>
                          </div>
                          <span className="font-medium">{formatCurrency(tax.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Section>
            )}

            {invoice.notes && (
              <Section title="Notes">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">{invoice.notes}</p>
                  </CardContent>
                </Card>
              </Section>
            )}
          </div>
        )}

        {activeTab === "payments" && (
          <Section title="Payment History">
            {invoice.paymentHistory.length > 0 ? (
              <div className="space-y-4">
                {invoice.paymentHistory.map((payment) => (
                  <Card key={payment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <PaymentMethodBadge method={payment.method} />
                          <div>
                            <p className="font-medium">{formatCurrency(payment.amount)}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(payment.processedAt)}
                            </p>
                            {payment.transactionId && (
                              <p className="text-xs text-muted-foreground">
                                Transaction ID: {payment.transactionId}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            payment.status === "completed" && "bg-green-500/10 text-green-500",
                            payment.status === "failed" && "bg-red-500/10 text-red-500",
                            payment.status === "pending" && "bg-yellow-500/10 text-yellow-500"
                          )}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                          {payment.failureReason && (
                            <p className="text-xs text-red-500 mt-1">{payment.failureReason}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No payments recorded for this invoice.</p>
                </CardContent>
              </Card>
            )}
          </Section>
        )}

        {activeTab === "history" && (
          <Section title="Invoice Activity">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  Activity history will be displayed here.
                </p>
              </CardContent>
            </Card>
          </Section>
        )}
      </motion.div>
    </div>
  );
}
