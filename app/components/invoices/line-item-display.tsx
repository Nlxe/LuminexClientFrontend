import { motion } from "framer-motion";
import { Calendar, Package } from "lucide-react";
import { InvoiceLineItem } from "~/lib/types/invoices";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface LineItemDisplayProps {
  lineItems: InvoiceLineItem[];
  currency: string;
  className?: string;
}

export function LineItemDisplay({ lineItems, currency, className }: LineItemDisplayProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const formatServicePeriod = (servicePeriod?: { start: string; end: string }) => {
    if (!servicePeriod) return null;
    return `${formatDate(servicePeriod.start)} - ${formatDate(servicePeriod.end)}`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-foreground">Line Items</h3>
      
      <div className="space-y-3">
        {lineItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground mb-1">
                        {item.description}
                      </h4>
                      
                      {item.servicePeriod && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
                          <Calendar className="w-3 h-3" />
                          <span>{formatServicePeriod(item.servicePeriod)}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Quantity: </span>
                          <span className="text-foreground font-medium">{item.quantity}</span>
                        </div>
                        
                        <div>
                          <span className="text-muted-foreground">Unit Price: </span>
                          <span className="text-foreground font-medium">
                            {formatCurrency(item.unitPrice)}
                          </span>
                        </div>
                        
                        {item.taxable && (
                          <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            Taxable
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-foreground">
                      {formatCurrency(item.total)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-muted-foreground">
                        {item.quantity} × {formatCurrency(item.unitPrice)}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Summary */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items ({lineItems.length}):</span>
              <span className="text-foreground">
                {formatCurrency(lineItems.reduce((sum, item) => sum + item.total, 0))}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxable Items:</span>
              <span className="text-foreground">
                {lineItems.filter(item => item.taxable).length} of {lineItems.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
