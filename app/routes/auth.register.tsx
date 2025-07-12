import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Building, Loader2 } from "lucide-react";
import { AuthLayout } from "~/components/auth/auth-layout";
import { FormField } from "~/components/auth/form-field";
import { CheckboxField } from "~/components/auth/checkbox-field";
import { SocialLogin } from "~/components/auth/social-login";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Create Account - LuminexClient | Open Source WHMCS Alternative" },
    { 
      name: "description", 
      content: "Start your free LuminexClient account. Join thousands of hosting providers using our open-source client management platform." 
    },
  ];
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  general?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptMarketing: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Clear error when user checks required checkbox
    if (name === "acceptTerms" && errors.acceptTerms) {
      setErrors(prev => ({ ...prev, acceptTerms: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
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
      
      // Handle successful registration here
      console.log("Registration successful:", formData);
      
    } catch (error) {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Register with ${provider}`);
    // Handle social registration here
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Start managing your hosting business with LuminexClient"
      showBackButton
      backTo="/"
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

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
            required
            icon={<User className="w-4 h-4" />}
          />
          
          <FormField
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
            required
            icon={<User className="w-4 h-4" />}
          />
        </div>

        {/* Email Field */}
        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@hostingcompany.com"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          icon={<Mail className="w-4 h-4" />}
        />

        {/* Company Field */}
        <FormField
          label="Company Name"
          name="company"
          placeholder="Your Hosting Company"
          value={formData.company}
          onChange={handleInputChange}
          error={errors.company}
          required
          icon={<Building className="w-4 h-4" />}
        />

        {/* Password Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            icon={<Lock className="w-4 h-4" />}
          />
          
          <FormField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={errors.confirmPassword}
            required
            icon={<Lock className="w-4 h-4" />}
          />
        </div>

        {/* Terms and Marketing */}
        <div className="space-y-4">
          <CheckboxField
            id="acceptTerms"
            name="acceptTerms"
            label={
              <>
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:text-primary/80">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </>
            }
            checked={formData.acceptTerms}
            onChange={handleCheckboxChange("acceptTerms")}
            required
          />
          
          {errors.acceptTerms && (
            <p className="text-sm text-destructive ml-8">{errors.acceptTerms}</p>
          )}
          
          <CheckboxField
            id="acceptMarketing"
            name="acceptMarketing"
            label="Send me updates about new features and hosting industry insights"
            checked={formData.acceptMarketing}
            onChange={handleCheckboxChange("acceptMarketing")}
          />
        </div>

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
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>

        {/* Social Login */}
        <SocialLogin
          onGoogleLogin={() => handleSocialLogin("Google")}
          onGithubLogin={() => handleSocialLogin("GitHub")}
          loading={loading}
        />

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
