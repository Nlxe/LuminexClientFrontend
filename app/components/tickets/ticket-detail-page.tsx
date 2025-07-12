import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Paperclip,
  User,
  Clock,
  Tag,
  CheckCircle,
  Settings
} from "lucide-react";
import { Ticket, TicketStatus } from "~/lib/types/tickets";
import { TicketStatus as TicketStatusComponent } from "./ticket-status";
import { TicketPriority as TicketPriorityComponent } from "./ticket-priority";
import { TicketMessage } from "./ticket-message";
import { PageHeader, Breadcrumb } from "~/components/ui/text/page-header";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Section } from "~/components/ui/sections/section";
import { cn } from "~/lib/utils";

interface TicketDetailPageProps {
  ticket: Ticket;
}

export function TicketDetailPage({ ticket }: TicketDetailPageProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"conversation" | "details">("conversation");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getCategoryInfo = () => {
    switch (ticket.category) {
      case "technical-support":
        return { name: "Technical Support", icon: "🔧" };
      case "billing-support":
        return { name: "Billing Support", icon: "💳" };
      case "general-support":
        return { name: "General Support", icon: "❓" };
      case "sales-support":
        return { name: "Sales Support", icon: "💼" };
      default:
        return { name: "Support", icon: "📋" };
    }
  };

  const handleSubmitMessage = async () => {
    if (!newMessage.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Submitting message:", newMessage);
    setNewMessage("");
    setIsSubmitting(false);
  };

  const handleStatusChange = async (newStatus: TicketStatus) => {
    console.log("Changing status to:", newStatus);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const categoryInfo = getCategoryInfo();
  
  // Memoize sorted messages
  const sortedMessages = useMemo(() => {
    return [...ticket.messages].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [ticket.messages]);

  const tabs = [
    { id: "conversation", label: "Conversation", icon: Send },
    { id: "details", label: "Details", icon: Settings }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title={ticket.subject}
        description={`${categoryInfo.name} • Ticket #${ticket.id}`}
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Support Tickets", href: "/tickets" },
              { label: `#${ticket.id}` }
            ]}
          />
        }
        action={
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tickets
          </Button>
        }
      />

      {/* Ticket Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="text-3xl">{categoryInfo.icon}</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{ticket.subject}</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <TicketStatusComponent status={ticket.status} />
                  <TicketPriorityComponent priority={ticket.priority} />
                  <span className="text-sm text-muted-foreground">#{ticket.id}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Customer:</span>
                    <p className="font-medium">{ticket.customer.name}</p>
                  </div>
                  {ticket.assignedTo && (
                    <div>
                      <span className="text-muted-foreground">Assigned to:</span>
                      <p className="font-medium">{ticket.assignedTo.name}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Created:</span>
                    <p className="font-medium">{formatDate(ticket.createdAt)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last updated:</span>
                    <p className="font-medium">{formatDate(ticket.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col space-y-2">
              {ticket.status === "open" && (
                <Button 
                  size="sm" 
                  onClick={() => handleStatusChange("in-progress")}
                  className="bg-yellow-500 hover:bg-yellow-600"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Mark In Progress
                </Button>
              )}
              {(ticket.status === "open" || ticket.status === "in-progress") && (
                <Button 
                  size="sm" 
                  onClick={() => handleStatusChange("resolved")}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Resolved
                </Button>
              )}
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
        {activeTab === "conversation" && (
          <div className="space-y-6">
            {/* Messages */}
            <Section title="Conversation">
              <div className="space-y-4">
                {sortedMessages.map((message) => (
                  <TicketMessage key={message.id} message={message} />
                ))}
              </div>
            </Section>

            {/* Reply Form */}
            {ticket.status !== "closed" && (
              <Section title="Reply to Ticket">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                      
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <Paperclip className="w-4 h-4 mr-2" />
                          Attach Files
                        </Button>
                        
                        <Button 
                          onClick={handleSubmitMessage}
                          disabled={!newMessage.trim() || isSubmitting}
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Reply
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Section>
            )}
          </div>
        )}

        {activeTab === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section title="Ticket Information">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Ticket ID:</span>
                      <p className="font-medium">{ticket.id}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <p className="font-medium">{categoryInfo.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <TicketStatusComponent status={ticket.status} size="sm" />
                    </div>
                    <div>
                      <span className="text-muted-foreground">Priority:</span>
                      <TicketPriorityComponent priority={ticket.priority} size="sm" />
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <p className="font-medium">{formatDate(ticket.createdAt)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Updated:</span>
                      <p className="font-medium">{formatDate(ticket.updatedAt)}</p>
                    </div>
                    {ticket.estimatedResolution && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Estimated Resolution:</span>
                        <p className="font-medium">{formatDate(ticket.estimatedResolution)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Section>

            <Section title="Participants">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{ticket.customer.name}</p>
                        <p className="text-sm text-muted-foreground">{ticket.customer.email}</p>
                        <p className="text-xs text-muted-foreground">Customer</p>
                      </div>
                    </div>
                    
                    {ticket.assignedTo && (
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{ticket.assignedTo.name}</p>
                          <p className="text-sm text-muted-foreground">{ticket.assignedTo.email}</p>
                          <p className="text-xs text-muted-foreground">Support Agent</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Section>

            {ticket.tags && ticket.tags.length > 0 && (
              <Section title="Tags" className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {ticket.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Section>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
