import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";
import { AuthLayout } from "~/components/auth/auth-layout";
import { FormField } from "~/components/auth/form-field";
import { CheckboxField } from "~/components/auth/checkbox-field";
import { SocialLogin } from "~/components/auth/social-login";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Login - LuminexClient | Open Source WHMCS Alternative" },
    { 
      name: "description", 
      content: "Access your LuminexClient hosting management dashboard. Secure login for hosting providers and service businesses." 
    },
  ];
};

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
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

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      
      // Handle successful login here
      console.log("Login successful:", formData);
      
    } catch (error) {
      setErrors({ general: "Invalid email or password. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Handle social login here
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your hosting management dashboard"
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

        {/* Email Field */}
        <FormField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          icon={<Mail className="w-4 h-4" />}
        />

        {/* Password Field */}
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          icon={<Lock className="w-4 h-4" />}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <CheckboxField
            id="rememberMe"
            name="rememberMe"
            label="Remember me for 30 days"
            checked={formData.rememberMe}
            onChange={handleCheckboxChange}
          />
          
          <Link
            to="/auth/forgot-password"
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Forgot password?
          </Link>
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
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>

        {/* Social Login */}
        <SocialLogin
          onGoogleLogin={() => handleSocialLogin("Google")}
          onGithubLogin={() => handleSocialLogin("GitHub")}
          loading={loading}
        />

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            New to LuminexClient?{" "}
            <Link
              to="/auth/register"
              className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              Create your account
            </Link>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Join thousands of hosting providers using our platform
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
