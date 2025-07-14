import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar, DollarSign, Download, Grid, List } from "lucide-react";
import { InvoiceStatus, Invoice } from "~/lib/types/invoices";
import { getInvoiceStats } from "~/lib/data/invoices";
import { InvoiceCard } from "./invoice-card";
import { InvoiceStatus as InvoiceStatusComponent } from "./invoice-status";
import { PageHeader } from "~/components/ui/text/page-header";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface InvoicesPageProps {
  initialInvoices?: Invoice[];
  loading?: boolean;
}

export function InvoicesPage({ initialInvoices = [], loading = false }: InvoicesPageProps) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus | "all">("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null);
  const [amountRange, setAmountRange] = useState<{ min: number; max: number } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"issued" | "due" | "amount">("due");

  useEffect(() => {
    if (!loading) {
      setInvoices(initialInvoices);
    }
  }, [initialInvoices, loading]);

  // Memoized filtered and sorted invoices
  const filteredInvoices = useMemo(() => {
    let filtered = invoices.filter(invoice => {
      const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           invoice.customer.company?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || invoice.status === selectedStatus;
      
      const matchesDateRange = !dateRange || (
        new Date(invoice.issuedAt) >= new Date(dateRange.start) &&
        new Date(invoice.issuedAt) <= new Date(dateRange.end)
      );
      
      const matchesAmountRange = !amountRange || (
        invoice.total >= amountRange.min && invoice.total <= amountRange.max
      );

      return matchesSearch && matchesStatus && matchesDateRange && matchesAmountRange;
    });

    // Sort invoices
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "issued":
          return new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime();
        case "due":
          return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
        case "amount":
          return b.total - a.total;
        default:
          return 0;
      }
    });

    return filtered;
  }, [invoices, searchQuery, selectedStatus, dateRange, amountRange, sortBy]);

  const handleInvoiceDetails = (invoice: Invoice) => {
    window.location.href = `/invoices/${invoice.id}`;
  };

  const handlePayNow = (invoice: Invoice) => {
    window.location.href = `/invoices/${invoice.id}/pay`;
  };

  const stats = useMemo(() => getInvoiceStats(), []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Invoices"
          description="Manage your billing and payment history"
        />
        
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Invoices"
        description="Manage your billing and payment history"
        action={
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        }
      />

      {/* Invoice Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: stats.total, status: "all" as const, amount: null },
          { label: "Paid", value: stats.paid, status: "paid" as const, amount: stats.totalRevenue },
          { label: "Unpaid", value: stats.unpaid, status: "unpaid" as const, amount: null },
          { label: "Overdue", value: stats.overdue, status: "overdue" as const, amount: stats.outstandingAmount },
          { label: "Draft", value: stats.draft, status: "draft" as const, amount: null }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md",
                selectedStatus === stat.status && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedStatus(stat.status)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="flex items-center justify-center space-x-2 mb-1">
                  {stat.status !== "all" && (
                    <InvoiceStatusComponent 
                      status={stat.status} 
                      showLabel={false} 
                      size="sm" 
                    />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
                {stat.amount !== null && (
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(stat.amount)}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              placeholder="Start date"
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value } as any))}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
            />
            <input
              type="date"
              placeholder="End date"
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value } as any))}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
            />
          </div>

          {/* Amount Range Filter */}
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <input
              type="number"
              placeholder="Min amount"
              onChange={(e) => setAmountRange(prev => ({ ...prev, min: Number(e.target.value) } as any))}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm w-24"
            />
            <input
              type="number"
              placeholder="Max amount"
              onChange={(e) => setAmountRange(prev => ({ ...prev, max: Number(e.target.value) } as any))}
              className="px-3 py-2 bg-background border border-border rounded-lg text-sm w-24"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "issued" | "due" | "amount")}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
          >
            <option value="due">Sort by Due Date</option>
            <option value="issued">Sort by Issue Date</option>
            <option value="amount">Sort by Amount</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredInvoices.length} of {invoices.length} invoices
      </div>

      {/* Invoices Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedStatus}-${searchQuery}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "grid gap-6",
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          )}
        >
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <InvoiceCard
                  invoice={invoice}
                  onViewDetails={handleInvoiceDetails}
                  onPayNow={handlePayNow}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="text-muted-foreground">
                {searchQuery || selectedStatus !== "all" || dateRange || amountRange ? (
                  <p>No invoices found matching your filters.</p>
                ) : (
                  <p>No invoices yet.</p>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
