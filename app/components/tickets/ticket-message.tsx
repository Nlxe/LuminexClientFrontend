import { motion } from "framer-motion";
import { 
  User, 
  Shield, 
  Bot, 
  Download, 
  FileText,
  Image,
  Archive
} from "lucide-react";
import { TicketMessage as TicketMessageType, TicketAttachment } from "~/lib/types/tickets";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface TicketMessageProps {
  message: TicketMessageType;
  className?: string;
}

export function TicketMessage({ message, className }: TicketMessageProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getMessageIcon = () => {
    switch (message.type) {
      case "customer":
        return User;
      case "staff":
        return Shield;
      case "system":
        return Bot;
      default:
        return User;
    }
  };

  const getMessageStyle = () => {
    switch (message.type) {
      case "customer":
        return {
          bgColor: "bg-blue-500/5",
          borderColor: "border-blue-500/20",
          iconColor: "text-blue-500"
        };
      case "staff":
        return {
          bgColor: "bg-green-500/5",
          borderColor: "border-green-500/20",
          iconColor: "text-green-500"
        };
      case "system":
        return {
          bgColor: "bg-gray-500/5",
          borderColor: "border-gray-500/20",
          iconColor: "text-gray-500"
        };
      default:
        return {
          bgColor: "bg-muted/50",
          borderColor: "border-border",
          iconColor: "text-muted-foreground"
        };
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type.includes("pdf")) return FileText;
    if (type.includes("zip") || type.includes("archive")) return Archive;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const MessageIcon = getMessageIcon();
  const style = getMessageStyle();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("w-full", className)}
    >
      <Card className={cn(
        "border",
        style.bgColor,
        style.borderColor,
        message.isInternal && "border-dashed"
      )}>
        <CardContent className="p-4">
          {/* Message Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-2 rounded-full",
                style.bgColor,
                style.borderColor,
                "border"
              )}>
                <MessageIcon className={cn("w-4 h-4", style.iconColor)} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">
                    {message.author.name}
                  </span>
                  {message.author.role && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {message.author.role}
                    </span>
                  )}
                  {message.isInternal && (
                    <span className="text-xs text-orange-500 bg-orange-500/10 px-2 py-1 rounded">
                      Internal Note
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(message.createdAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="prose prose-sm max-w-none text-foreground">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-sm font-medium text-foreground mb-3">
                Attachments ({message.attachments.length})
              </h4>
              <div className="space-y-2">
                {message.attachments.map((attachment) => {
                  const FileIcon = getFileIcon(attachment.type);
                  return (
                    <motion.div
                      key={attachment.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center space-x-3">
                        <FileIcon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {attachment.filename}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatFileSize(attachment.size)} • {formatDate(attachment.uploadedAt)}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
