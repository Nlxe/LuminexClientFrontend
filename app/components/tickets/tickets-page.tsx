import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Filter, Search, Grid, List, SortDesc } from "lucide-react";
import { TicketStatus, TicketPriority, TicketCategory, Ticket } from "~/lib/types/tickets";
import { ticketCategories, getTicketStats } from "~/lib/data/tickets";
import { TicketCard } from "./ticket-card";
import { TicketStatus as TicketStatusComponent } from "./ticket-status";
import { TicketPriority as TicketPriorityComponent } from "./ticket-priority";
import { PageHeader } from "~/components/ui/text/page-header";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";

interface TicketsPageProps {
  initialTickets?: Ticket[];
  loading?: boolean;
}

export function TicketsPage({ initialTickets = [], loading = false }: TicketsPageProps) {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | "all">("all");
  const [selectedPriority, setSelectedPriority] = useState<TicketPriority | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<TicketCategory | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"created" | "updated" | "priority">("updated");

  useEffect(() => {
    if (!loading) {
      setTickets(initialTickets);
    }
  }, [initialTickets, loading]);

  // Memoized filtered and sorted tickets
  const filteredTickets = useMemo(() => {
    let filtered = tickets.filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus;
      const matchesPriority = selectedPriority === "all" || ticket.priority === selectedPriority;
      const matchesCategory = selectedCategory === "all" || ticket.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    // Sort tickets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "created":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "updated":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

    return filtered;
  }, [tickets, searchQuery, selectedStatus, selectedPriority, selectedCategory, sortBy]);

  const handleTicketDetails = (ticket: Ticket) => {
    window.location.href = `/tickets/${ticket.id}`;
  };

  const stats = useMemo(() => getTicketStats(), []);

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Support Tickets"
          description="Manage your support requests and track their progress"
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
        title="Support Tickets"
        description="Manage your support requests and track their progress"
        action={
          <Button onClick={() => window.location.href = "/tickets/create"}>
            <Plus className="w-4 h-4 mr-2" />
            Create Ticket
          </Button>
        }
      />

      {/* Ticket Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: stats.total, status: "all" as const },
          { label: "Open", value: stats.open, status: "open" as const },
          { label: "In Progress", value: stats.inProgress, status: "in-progress" as const },
          { label: "Resolved", value: stats.resolved, status: "resolved" as const },
          { label: "Closed", value: stats.closed, status: "closed" as const }
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
                <div className="flex items-center justify-center space-x-2">
                  {stat.status !== "all" && (
                    <TicketStatusComponent 
                      status={stat.status} 
                      showLabel={false} 
                      size="sm" 
                    />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
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
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as TicketCategory | "all")}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
          >
            <option value="all">All Categories</option>
            {ticketCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value as TicketPriority | "all")}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "created" | "updated" | "priority")}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm"
          >
            <option value="updated">Sort by Updated</option>
            <option value="created">Sort by Created</option>
            <option value="priority">Sort by Priority</option>
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
        Showing {filteredTickets.length} of {tickets.length} tickets
      </div>

      {/* Tickets Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedStatus}-${selectedPriority}-${selectedCategory}-${searchQuery}`}
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
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TicketCard
                  ticket={ticket}
                  onViewDetails={handleTicketDetails}
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
                {searchQuery || selectedStatus !== "all" || selectedPriority !== "all" || selectedCategory !== "all" ? (
                  <p>No tickets found matching your filters.</p>
                ) : (
                  <p>No support tickets yet.</p>
                )}
              </div>
              <Button 
                className="mt-4" 
                onClick={() => window.location.href = "/tickets/create"}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Ticket
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
