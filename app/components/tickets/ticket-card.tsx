import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Clock, 
  User, 
  Calendar,
  Paperclip,
  ExternalLink
} from "lucide-react";
import { Ticket } from "~/lib/types/tickets";
import { TicketStatus } from "./ticket-status";
import { TicketPriority } from "./ticket-priority";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface TicketCardProps {
  ticket: Ticket;
  onViewDetails?: (ticket: Ticket) => void;
  className?: string;
}

export function TicketCard({ 
  ticket, 
  onViewDetails, 
  className 
}: TicketCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getCategoryIcon = () => {
    switch (ticket.category) {
      case "technical-support":
        return "🔧";
      case "billing-support":
        return "💳";
      case "general-support":
        return "❓";
      case "sales-support":
        return "💼";
      default:
        return "📋";
    }
  };

  const hasAttachments = ticket.messages.some(msg => msg.attachments && msg.attachments.length > 0);
  const messageCount = ticket.messages.length;
  const lastMessage = ticket.messages[ticket.messages.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={className}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div className="text-2xl">{getCategoryIcon()}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {ticket.subject}
                </h3>
                <p className="text-sm text-muted-foreground">
                  #{ticket.id}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <TicketPriority priority={ticket.priority} size="sm" showLabel={false} />
              <TicketStatus status={ticket.status} size="sm" showLabel={false} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Ticket Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {ticket.description}
          </p>

          {/* Ticket Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Customer:</span>
              </div>
              <span className="text-foreground">{ticket.customer.name}</span>
            </div>

            {ticket.assignedTo && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Assigned:</span>
                </div>
                <span className="text-foreground">{ticket.assignedTo.name}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Created:</span>
              </div>
              <span className="text-foreground">{formatDate(ticket.createdAt)}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground">Updated:</span>
              </div>
              <span className="text-foreground">{getTimeAgo(ticket.updatedAt)}</span>
            </div>
          </div>

          {/* Status and Priority */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TicketStatus status={ticket.status} size="sm" />
              <TicketPriority priority={ticket.priority} size="sm" />
            </div>
          </div>

          {/* Message and Attachment Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-3 h-3" />
                <span>{messageCount} message{messageCount !== 1 ? 's' : ''}</span>
              </div>
              {hasAttachments && (
                <div className="flex items-center space-x-1">
                  <Paperclip className="w-3 h-3" />
                  <span>Attachments</span>
                </div>
              )}
            </div>
          </div>

          {/* Last Message Preview */}
          {lastMessage && (
            <div className="border-t border-border pt-3">
              <div className="flex items-start space-x-2">
                <div className="text-xs text-muted-foreground">
                  {lastMessage.author.name}:
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                  {lastMessage.content}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(ticket)}
              className="flex-1"
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
