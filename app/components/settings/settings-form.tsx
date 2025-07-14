import { useState } from "react";
import { motion } from "framer-motion";
import { Save, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface SettingsFormProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave?: (data: any) => Promise<void>;
  className?: string;
  showSaveButton?: boolean;
  saveButtonText?: string;
}

export function SettingsForm({ 
  title, 
  description, 
  children, 
  onSave,
  className,
  showSaveButton = true,
  saveButtonText = "Save Changes"
}: SettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSave) return;

    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      
      await onSave(data);
      setSaveStatus("success");
      
      // Reset success status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-6", className)}
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {children}

        {/* Save Button and Status */}
        {showSaveButton && (
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="flex items-center space-x-2">
              {saveStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-green-500"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Changes saved successfully</span>
                </motion.div>
              )}
              
              {saveStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-red-500"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errorMessage}</span>
                </motion.div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSaving}
              className="min-w-[120px]"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {saveButtonText}
                </>
              )}
            </Button>
          </div>
        )}
      </form>
    </motion.div>
  );
}
