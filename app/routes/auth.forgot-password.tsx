import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { AuthLayout } from "~/components/auth/auth-layout";
import { FormField } from "~/components/auth/form-field";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Reset Password - LuminexClient | Open Source WHMCS Alternative" },
    { 
      name: "description", 
      content: "Reset your LuminexClient password. Secure password recovery for hosting providers and service businesses." 
    },
  ];
};

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

export default function ForgotPassword() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful password reset request
      setEmailSent(true);
      console.log("Password reset email sent to:", formData.email);
      
    } catch (error) {
      setErrors({ general: "Failed to send reset email. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent password reset instructions"
        showBackButton
        backTo="/auth/login"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-8 h-8 text-green-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground">
              We've sent a password reset link to:
            </p>
            <p className="font-medium text-foreground">{formData.email}</p>
            <p className="text-sm text-muted-foreground">
              Click the link in the email to reset your password. The link will expire in 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <Button
              onClick={() => setEmailSent(false)}
              variant="outline"
              className="w-full"
            >
              Send Another Email
            </Button>

            <Link
              to="/auth/login"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-6 border-t border-border"
          >
            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or contact support if you continue having issues.
            </p>
          </motion.div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email to receive reset instructions"
      showBackButton
      backTo="/auth/login"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
          >
            <p className="text-sm text-destructive">{errors.general}</p>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-muted/30 border border-border rounded-lg"
        >
          <p className="text-sm text-muted-foreground">
            Enter the email address associated with your LuminexClient account and we'll send you a link to reset your password.
          </p>
        </motion.div>

        {/* Email Field */}
        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          icon={<Mail className="w-4 h-4" />}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending reset link...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>

        {/* Help Text */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            Need help accessing your account?
          </p>
          <p className="text-xs text-muted-foreground">
            Contact our support team at{" "}
            <a 
              href="mailto:support@luminexclient.com" 
              className="text-primary hover:text-primary/80"
            >
              support@luminexclient.com
            </a>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
