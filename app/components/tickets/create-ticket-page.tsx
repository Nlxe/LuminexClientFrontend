import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  X, 
  AlertCircle,
  CheckCircle,
  Upload
} from "lucide-react";
import { TicketCategory, TicketPriority, CreateTicketData } from "~/lib/types/tickets";
import { ticketCategories } from "~/lib/data/tickets";
import { userServices } from "~/lib/data/services";
import { PageHeader } from "~/components/ui/text/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

interface CreateTicketPageProps {
  onSubmit?: (data: CreateTicketData) => Promise<void>;
}

export function CreateTicketPage({ onSubmit }: CreateTicketPageProps) {
  const [formData, setFormData] = useState<CreateTicketData>({
    subject: "",
    category: "technical-support",
    priority: "medium",
    description: "",
    serviceId: "",
    attachments: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        attachments
      };

      await onSubmit?.(submitData);
      
      // Simulate successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to tickets page
      window.location.href = "/tickets";
    } catch (error) {
      console.error("Failed to create ticket:", error);
      setErrors({ submit: "Failed to create ticket. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'application/pdf', 'text/plain',
      'application/zip', 'application/x-zip-compressed'
    ];

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, files: `File ${file.name} is too large (max 10MB)` }));
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, files: `File ${file.name} has unsupported format` }));
        return false;
      }
      return true;
    });

    setAttachments(prev => [...prev, ...validFiles]);
    setErrors(prev => ({ ...prev, files: "" }));
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Create Support Ticket"
        description="Submit a new support request and get help from our team"
        action={
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tickets
          </Button>
        }
      />

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>New Support Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className={cn(errors.subject && "border-red-500")}
                />
                {errors.subject && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Category and Priority */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as TicketCategory }))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  >
                    {ticketCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority *</Label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as TicketPriority }))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                  >
                    <option value="low">🟢 Low - General questions</option>
                    <option value="medium">🟡 Medium - Standard issues</option>
                    <option value="high">🟠 High - Service affecting</option>
                    <option value="urgent">🔴 Urgent - Critical issues</option>
                  </select>
                </div>
              </div>

              {/* Related Service */}
              <div className="space-y-2">
                <Label htmlFor="service">Related Service (Optional)</Label>
                <select
                  id="service"
                  value={formData.serviceId}
                  onChange={(e) => setFormData(prev => ({ ...prev, serviceId: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
                >
                  <option value="">Select a service (optional)</option>
                  {userServices.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} ({service.plan.name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and what you've already tried..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className={cn("resize-none", errors.description && "border-red-500")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Minimum 10 characters. Be as detailed as possible to help us resolve your issue quickly.
                </p>
              </div>

              {/* File Attachments */}
              <div className="space-y-4">
                <Label>Attachments (Optional)</Label>
                
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.pdf,.txt,.zip"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload files or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supported: JPG, PNG, GIF, PDF, TXT, ZIP (max 10MB each)
                    </p>
                  </label>
                </div>

                {errors.files && (
                  <p className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.files}
                  </p>
                )}

                {/* Attachment List */}
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label>Attached Files ({attachments.length})</Label>
                    {attachments.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3">
                          <Paperclip className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

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
                  disabled={isSubmitting}
                  className="min-w-[120px]"
                >
                  {isSubmitting ? (
                    "Creating..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Create Ticket
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
