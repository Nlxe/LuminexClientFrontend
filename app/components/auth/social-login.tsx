import { motion } from "framer-motion";
import { Github, Mail } from "lucide-react";
import { Button } from "~/components/ui/button";

interface SocialLoginProps {
  onGoogleLogin?: () => void;
  onGithubLogin?: () => void;
  loading?: boolean;
  className?: string;
}

export function SocialLogin({ 
  onGoogleLogin, 
  onGithubLogin, 
  loading = false,
  className 
}: SocialLoginProps) {
  return (
    <div className={className}>
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            onClick={onGoogleLogin}
            disabled={loading}
            className="w-full"
          >
            <Mail className="w-4 h-4 mr-2" />
            Google
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            onClick={onGithubLogin}
            disabled={loading}
            className="w-full"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
