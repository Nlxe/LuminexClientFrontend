import { motion } from "framer-motion";
import { 
  Calendar, 
  DollarSign, 
  ExternalLink,
  Download,
  CreditCard,
  AlertTriangle,
  Building
} from "lucide-react";
import { Invoice } from "~/lib/types/invoices";
import { InvoiceStatus } from "./invoice-status";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface InvoiceCardProps {
  invoice: Invoice;
  onViewDetails?: (invoice: Invoice) => void;
  onPayNow?: (invoice: Invoice) => void;
  className?: string;
}

export function InvoiceCard({ 
  invoice, 
  onViewDetails, 
  onPayNow,
  className 
}: InvoiceCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
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

  const getCompanyIcon = () => {
    if (invoice.customer.company) return Building;
    return null;
  };

  const CompanyIcon = getCompanyIcon();
  const daysOverdue = getDaysOverdue();
  const canPay = invoice.status === "unpaid" || invoice.status === "overdue";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={className}
    >
      <Card className={cn(
        "h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20",
        invoice.status === "overdue" && "border-red-500/30 bg-red-500/5"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">
                  {invoice.invoiceNumber}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  {CompanyIcon && <CompanyIcon className="w-3 h-3 text-muted-foreground" />}
                  <p className="text-sm text-muted-foreground truncate">
                    {invoice.customer.company || invoice.customer.name}
                  </p>
                </div>
              </div>
            </div>
            
            <InvoiceStatus status={invoice.status} size="sm" showLabel={false} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Amount Information */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Amount:</span>
              <span className="font-semibold text-foreground">
                {formatCurrency(invoice.total)}
              </span>
            </div>
            
            {invoice.amountDue > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount Due:</span>
                <span className={cn(
                  "font-semibold",
                  invoice.status === "overdue" ? "text-red-500" : "text-orange-500"
                )}>
                  {formatCurrency(invoice.amountDue)}
                </span>
              </div>
            )}

            {invoice.amountPaid > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount Paid:</span>
                <span className="font-semibold text-green-500">
                  {formatCurrency(invoice.amountPaid)}
                </span>
              </div>
            )}
          </div>

          {/* Date Information */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Issued:</span>
              </div>
              <span className="text-foreground">{formatDate(invoice.issuedAt)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Due:</span>
              </div>
              <span className={cn(
                "text-foreground",
                invoice.status === "overdue" && "text-red-500 font-medium"
              )}>
                {formatDate(invoice.dueAt)}
              </span>
            </div>

            {invoice.paidAt && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Paid:</span>
                </div>
                <span className="text-green-500 font-medium">
                  {formatDate(invoice.paidAt)}
                </span>
              </div>
            )}
          </div>

          {/* Overdue Warning */}
          {invoice.status === "overdue" && (
            <div className="flex items-center space-x-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-500 font-medium">
                {daysOverdue} day{daysOverdue !== 1 ? 's' : ''} overdue
              </span>
            </div>
          )}

          {/* Status and Line Items */}
          <div className="space-y-2">
            <InvoiceStatus status={invoice.status} size="sm" />
            <div className="text-xs text-muted-foreground">
              {invoice.lineItems.length} item{invoice.lineItems.length !== 1 ? 's' : ''}
              {invoice.paymentHistory.length > 0 && (
                <span> • {invoice.paymentHistory.length} payment{invoice.paymentHistory.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(invoice)}
              className="flex-1"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              View Details
            </Button>
            
            {canPay && (
              <Button
                size="sm"
                onClick={() => onPayNow?.(invoice)}
                className="flex-1"
              >
                <CreditCard className="w-3 h-3 mr-2" />
                Pay Now
              </Button>
            )}
            
            {invoice.status !== "draft" && (
              <Button
                variant="ghost"
                size="sm"
                className="px-3"
              >
                <Download className="w-3 h-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
