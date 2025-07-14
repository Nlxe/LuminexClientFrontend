import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  MapPin, 
  Receipt, 
  Settings as SettingsIcon,
  CheckCircle,
  Star
} from "lucide-react";
import { BillingSettings, PaymentMethodInfo } from "~/lib/types/settings";
import { SettingsForm } from "../settings-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";

interface BillingSettingsTabProps {
  billing: BillingSettings;
  onUpdate: (data: Partial<BillingSettings>) => Promise<void>;
}

export function BillingSettingsTab({ billing, onUpdate }: BillingSettingsTabProps) {
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const getPaymentMethodIcon = (type: PaymentMethodInfo["type"]) => {
    switch (type) {
      case "credit-card":
        return "💳";
      case "paypal":
        return "🅿️";
      case "bank-account":
        return "🏦";
      default:
        return "💰";
    }
  };

  const getPaymentMethodDisplay = (method: PaymentMethodInfo) => {
    switch (method.type) {
      case "credit-card":
        return `${method.details.brand} •••• ${method.details.last4}`;
      case "paypal":
        return method.details.email;
      case "bank-account":
        return `${method.details.bankName} •••• ${method.details.last4}`;
      default:
        return "Unknown payment method";
    }
  };

  const handleSetDefaultPaymentMethod = async (methodId: string) => {
    const updatedMethods = billing.paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === methodId
    }));

    await onUpdate({
      defaultPaymentMethod: methodId,
      paymentMethods: updatedMethods
    });
  };

  const handleRemovePaymentMethod = async (methodId: string) => {
    const updatedMethods = billing.paymentMethods.filter(method => method.id !== methodId);
    
    await onUpdate({
      paymentMethods: updatedMethods,
      ...(billing.defaultPaymentMethod === methodId && {
        defaultPaymentMethod: updatedMethods.find(m => m.isDefault)?.id || updatedMethods[0]?.id
      })
    });
  };

  const handleSaveBillingAddress = async (data: any) => {
    await onUpdate({
      billingAddress: {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country
      }
    });
  };

  const handleSaveTaxInfo = async (data: any) => {
    await onUpdate({
      taxInformation: {
        taxId: data.taxId,
        vatNumber: data.vatNumber,
        taxExempt: data.taxExempt === "true",
        taxExemptReason: data.taxExemptReason
      }
    });
  };

  const handleSaveInvoicePreferences = async (data: any) => {
    await onUpdate({
      invoicePreferences: {
        emailInvoices: data.emailInvoices === "true",
        paperInvoices: data.paperInvoices === "true",
        invoiceEmail: data.invoiceEmail,
        autoPayEnabled: data.autoPayEnabled === "true",
        paymentTerms: parseInt(data.paymentTerms)
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Payment Methods</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddPaymentMethod(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Method
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billing.paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "p-4 border rounded-lg",
                  method.isDefault ? "border-primary bg-primary/5" : "border-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getPaymentMethodIcon(method.type)}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{getPaymentMethodDisplay(method)}</p>
                        {method.isDefault && (
                          <div className="flex items-center space-x-1 text-primary">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs">Default</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Added {formatDate(method.createdAt)}
                      </p>
                      {method.type === "credit-card" && method.details.expiryMonth && method.details.expiryYear && (
                        <p className="text-xs text-muted-foreground">
                          Expires {method.details.expiryMonth}/{method.details.expiryYear}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetDefaultPaymentMethod(method.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePaymentMethod(method.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {billing.paymentMethods.length === 0 && (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No payment methods added</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowAddPaymentMethod(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Payment Method
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Billing Address</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm
            title=""
            onSave={handleSaveBillingAddress}
            showSaveButton={true}
            saveButtonText="Update Address"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2 lg:col-span-3 space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  defaultValue={billing.billingAddress.street}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  defaultValue={billing.billingAddress.city}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  name="state"
                  defaultValue={billing.billingAddress.state}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  defaultValue={billing.billingAddress.zipCode}
                  required
                />
              </div>
              <div className="md:col-span-2 lg:col-span-1 space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={billing.billingAddress.country}
                  required
                />
              </div>
            </div>
          </SettingsForm>
        </CardContent>
      </Card>

      {/* Tax Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Receipt className="w-5 h-5" />
            <span>Tax Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm
            title=""
            onSave={handleSaveTaxInfo}
            showSaveButton={true}
            saveButtonText="Update Tax Info"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / EIN</Label>
                  <Input
                    id="taxId"
                    name="taxId"
                    defaultValue={billing.taxInformation.taxId}
                    placeholder="12-3456789"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vatNumber">VAT Number</Label>
                  <Input
                    id="vatNumber"
                    name="vatNumber"
                    defaultValue={billing.taxInformation.vatNumber}
                    placeholder="GB123456789"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="taxExempt"
                    name="taxExempt"
                    value="true"
                    defaultChecked={billing.taxInformation.taxExempt}
                    className="rounded border-border"
                  />
                  <Label htmlFor="taxExempt">Tax Exempt Organization</Label>
                </div>
                
                {billing.taxInformation.taxExempt && (
                  <div className="space-y-2">
                    <Label htmlFor="taxExemptReason">Tax Exempt Reason</Label>
                    <Input
                      id="taxExemptReason"
                      name="taxExemptReason"
                      defaultValue={billing.taxInformation.taxExemptReason}
                      placeholder="Non-profit organization, Government entity, etc."
                    />
                  </div>
                )}
              </div>
            </div>
          </SettingsForm>
        </CardContent>
      </Card>

      {/* Invoice Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5" />
            <span>Invoice & Subscription Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm
            title=""
            onSave={handleSaveInvoicePreferences}
            showSaveButton={true}
            saveButtonText="Update Preferences"
          >
            <div className="space-y-6">
              {/* Invoice Delivery */}
              <div className="space-y-4">
                <h4 className="font-medium">Invoice Delivery</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="emailInvoices"
                      name="emailInvoices"
                      value="true"
                      defaultChecked={billing.invoicePreferences.emailInvoices}
                      className="rounded border-border"
                    />
                    <Label htmlFor="emailInvoices">Email Invoices</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="paperInvoices"
                      name="paperInvoices"
                      value="true"
                      defaultChecked={billing.invoicePreferences.paperInvoices}
                      className="rounded border-border"
                    />
                    <Label htmlFor="paperInvoices">Paper Invoices (Additional fees may apply)</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="invoiceEmail">Invoice Email Address</Label>
                    <Input
                      id="invoiceEmail"
                      name="invoiceEmail"
                      type="email"
                      defaultValue={billing.invoicePreferences.invoiceEmail}
                      placeholder="billing@company.com"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Settings */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="font-medium">Payment Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="autoPayEnabled"
                      name="autoPayEnabled"
                      value="true"
                      defaultChecked={billing.invoicePreferences.autoPayEnabled}
                      className="rounded border-border"
                    />
                    <Label htmlFor="autoPayEnabled">Enable Auto-Pay</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paymentTerms">Payment Terms (Days)</Label>
                    <select
                      id="paymentTerms"
                      name="paymentTerms"
                      defaultValue={billing.invoicePreferences.paymentTerms}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                    >
                      <option value={7}>7 days</option>
                      <option value={15}>15 days</option>
                      <option value={30}>30 days</option>
                      <option value={60}>60 days</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Subscription Settings */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="font-medium">Subscription Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Auto-Renewal</p>
                      <p className="text-xs text-muted-foreground">
                        Automatically renew services before expiration
                      </p>
                    </div>
                    <Switch
                      checked={billing.subscriptionPreferences.autoRenew}
                      onCheckedChange={(checked) => 
                        onUpdate({
                          subscriptionPreferences: {
                            ...billing.subscriptionPreferences,
                            autoRenew: checked
                          }
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Renewal Reminders</p>
                      <p className="text-xs text-muted-foreground">
                        Get notified before services expire
                      </p>
                    </div>
                    <Switch
                      checked={billing.subscriptionPreferences.renewalReminders}
                      onCheckedChange={(checked) => 
                        onUpdate({
                          subscriptionPreferences: {
                            ...billing.subscriptionPreferences,
                            renewalReminders: checked
                          }
                        })
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Upgrade Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Get notified about service upgrades and new features
                      </p>
                    </div>
                    <Switch
                      checked={billing.subscriptionPreferences.upgradeNotifications}
                      onCheckedChange={(checked) => 
                        onUpdate({
                          subscriptionPreferences: {
                            ...billing.subscriptionPreferences,
                            upgradeNotifications: checked
                          }
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </SettingsForm>
        </CardContent>
      </Card>
    </div>
  );
}
