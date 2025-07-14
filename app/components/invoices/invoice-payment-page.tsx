import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  CreditCard, 
  Shield, 
  Lock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Invoice, PaymentMethod, PaymentFormData } from "~/lib/types/invoices";
import { paymentMethods } from "~/lib/data/invoices";
import { InvoiceStatus } from "./invoice-status";
import { PaymentMethodBadge } from "./payment-method-badge";
import { PageHeader, Breadcrumb } from "~/components/ui/text/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

interface InvoicePaymentPageProps {
  invoice: Invoice;
  onSubmitPayment?: (data: PaymentFormData) => Promise<void>;
}

export function InvoicePaymentPage({ invoice, onSubmitPayment }: InvoicePaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("credit-card");
  const [formData, setFormData] = useState<PaymentFormData>({
    paymentMethod: "credit-card",
    amount: invoice.amountDue
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: invoice.currency
    }).format(amount);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (formData.amount <= 0 || formData.amount > invoice.amountDue) {
      newErrors.amount = `Amount must be between $0.01 and ${formatCurrency(invoice.amountDue)}`;
    }

    if (selectedMethod === "credit-card") {
      if (!formData.cardDetails?.cardNumber) {
        newErrors.cardNumber = "Card number is required";
      }
      if (!formData.cardDetails?.expiryMonth || !formData.cardDetails?.expiryYear) {
        newErrors.expiry = "Expiry date is required";
      }
      if (!formData.cardDetails?.cvv) {
        newErrors.cvv = "CVV is required";
      }
      if (!formData.cardDetails?.cardholderName) {
        newErrors.cardholderName = "Cardholder name is required";
      }
    }

    if (selectedMethod === "paypal" && !formData.paypalEmail) {
      newErrors.paypalEmail = "PayPal email is required";
    }

    if (selectedMethod === "bank-transfer") {
      if (!formData.bankDetails?.accountNumber) {
        newErrors.accountNumber = "Account number is required";
      }
      if (!formData.bankDetails?.routingNumber) {
        newErrors.routingNumber = "Routing number is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const paymentData = {
        ...formData,
        paymentMethod: selectedMethod,
        amount: formData.amount
      };

      await onSubmitPayment?.(paymentData);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to invoice details with success message
      window.location.href = `/invoices/${invoice.id}?payment=success`;
    } catch (error) {
      console.error("Payment failed:", error);
      setErrors({ submit: "Payment processing failed. Please try again." });
    } finally {
      setIsProcessing(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateCardDetails = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      cardDetails: {
        ...prev.cardDetails,
        [field]: value
      } as any
    }));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Pay Invoice"
        description={`Payment for ${invoice.invoiceNumber}`}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Invoices", href: "/invoices" },
              { label: invoice.invoiceNumber, href: `/invoices/${invoice.id}` },
              { label: "Pay" }
            ]}
          />
        }
        action={
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Invoice
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="0.01"
                      max={invoice.amountDue}
                      value={formData.amount}
                      onChange={(e) => updateFormData("amount", Number(e.target.value))}
                      className={cn("pl-8", errors.amount && "border-red-500")}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.amount}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Maximum amount: {formatCurrency(invoice.amountDue)}
                  </p>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {paymentMethods.map((method) => (
                      <motion.button
                        key={method.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedMethod(method.id)}
                        className={cn(
                          "p-4 border-2 rounded-lg text-left transition-all duration-200",
                          selectedMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Payment Method Forms */}
                {selectedMethod === "credit-card" && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Credit Card Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardDetails?.cardNumber || ""}
                          onChange={(e) => updateCardDetails("cardNumber", e.target.value)}
                          className={cn(errors.cardNumber && "border-red-500")}
                        />
                        {errors.cardNumber && (
                          <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="expiryMonth">Expiry Month</Label>
                        <select
                          id="expiryMonth"
                          value={formData.cardDetails?.expiryMonth || ""}
                          onChange={(e) => updateCardDetails("expiryMonth", e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                        >
                          <option value="">Month</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="expiryYear">Expiry Year</Label>
                        <select
                          id="expiryYear"
                          value={formData.cardDetails?.expiryYear || ""}
                          onChange={(e) => updateCardDetails("expiryYear", e.target.value)}
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                        >
                          <option value="">Year</option>
                          {Array.from({ length: 10 }, (_, i) => {
                            const year = new Date().getFullYear() + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          maxLength={4}
                          value={formData.cardDetails?.cvv || ""}
                          onChange={(e) => updateCardDetails("cvv", e.target.value)}
                          className={cn(errors.cvv && "border-red-500")}
                        />
                        {errors.cvv && (
                          <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="cardholderName">Cardholder Name</Label>
                        <Input
                          id="cardholderName"
                          placeholder="John Doe"
                          value={formData.cardDetails?.cardholderName || ""}
                          onChange={(e) => updateCardDetails("cardholderName", e.target.value)}
                          className={cn(errors.cardholderName && "border-red-500")}
                        />
                        {errors.cardholderName && (
                          <p className="text-sm text-red-500 mt-1">{errors.cardholderName}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "paypal" && (
                  <div className="space-y-4">
                    <h3 className="font-medium">PayPal Details</h3>
                    <div>
                      <Label htmlFor="paypalEmail">PayPal Email</Label>
                      <Input
                        id="paypalEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.paypalEmail || ""}
                        onChange={(e) => updateFormData("paypalEmail", e.target.value)}
                        className={cn(errors.paypalEmail && "border-red-500")}
                      />
                      {errors.paypalEmail && (
                        <p className="text-sm text-red-500 mt-1">{errors.paypalEmail}</p>
                      )}
                    </div>
                  </div>
                )}

                {selectedMethod === "bank-transfer" && (
                  <div className="space-y-4">
                    <h3 className="font-medium">Bank Transfer Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          placeholder="123456789"
                          value={formData.bankDetails?.accountNumber || ""}
                          onChange={(e) => updateFormData("bankDetails", { 
                            ...formData.bankDetails, 
                            accountNumber: e.target.value 
                          })}
                          className={cn(errors.accountNumber && "border-red-500")}
                        />
                        {errors.accountNumber && (
                          <p className="text-sm text-red-500 mt-1">{errors.accountNumber}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="routingNumber">Routing Number</Label>
                        <Input
                          id="routingNumber"
                          placeholder="021000021"
                          value={formData.bankDetails?.routingNumber || ""}
                          onChange={(e) => updateFormData("bankDetails", { 
                            ...formData.bankDetails, 
                            routingNumber: e.target.value 
                          })}
                          className={cn(errors.routingNumber && "border-red-500")}
                        />
                        {errors.routingNumber && (
                          <p className="text-sm text-red-500 mt-1">{errors.routingNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "account-credit" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-green-500">Account Credit Available</p>
                        <p className="text-sm text-muted-foreground">
                          Your payment will be processed using available account credit.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {errors.submit}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="min-w-[140px]"
                  >
                    {isProcessing ? (
                      "Processing..."
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Pay {formatCurrency(formData.amount)}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">{invoice.invoiceNumber}</p>
                <p className="text-sm text-muted-foreground">
                  {invoice.customer.company || invoice.customer.name}
                </p>
                <InvoiceStatus status={invoice.status} size="sm" className="mt-2" />
              </div>
              
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">{formatCurrency(invoice.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Amount Paid:</span>
                  <span className="font-medium text-green-500">
                    {formatCurrency(invoice.amountPaid)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-border pt-2">
                  <span>Amount Due:</span>
                  <span className="text-orange-500">{formatCurrency(invoice.amountDue)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure. We never store your payment details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
