import { useState, useEffect } from "react";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DashboardLayout } from "~/components/dashboard/layout";
import { SettingsPage } from "~/components/settings/settings-page";
import { getUserSettings, updateUserSettings } from "~/lib/data/settings";
import { UserSettings } from "~/lib/types/settings";

export const meta: MetaFunction = () => {
  return [
    { title: "Settings - LuminexClient | Account Management" },
    { 
      name: "description", 
      content: "Manage your account settings, security preferences, billing information, and dashboard customization." 
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Simulate realistic API response time (optimized)
  await new Promise(resolve => setTimeout(resolve, 50));
  
  try {
    // In a real app, you'd fetch user settings from your database
    // based on the authenticated user
    const userSettings = getUserSettings();
    
    return json({
      userSettings,
      success: true
    });
  } catch (error) {
    return json({
      userSettings: null,
      success: false,
      error: "Failed to load user settings"
    }, { status: 500 });
  }
}

export default function Settings() {
  const data = useLoaderData<typeof loader>();
  const [loading, setLoading] = useState(true);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);

  useEffect(() => {
    // Optimized client-side loading state
    const timer = setTimeout(() => {
      setLoading(false);
      if (data.success && data.userSettings) {
        setUserSettings(data.userSettings);
      }
    }, 25);

    return () => clearTimeout(timer);
  }, [data]);

  const handleUpdateSettings = async (updates: Partial<UserSettings>) => {
    if (!userSettings) return;

    try {
      // Optimistically update the UI
      const updatedSettings = { ...userSettings, ...updates };
      setUserSettings(updatedSettings);

      // Simulate API call
      await updateUserSettings(updates);
      
      console.log("Settings updated:", updates);
    } catch (error) {
      // Revert optimistic update on error
      setUserSettings(userSettings);
      throw error;
    }
  };

  if (!data.success || !userSettings) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {loading ? "Loading Settings..." : "Failed to Load Settings"}
            </h2>
            {!loading && (
              <>
                <p className="text-muted-foreground mb-4">
                  {"error" in data ? data.error : "Unable to load your account settings"}
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <SettingsPage 
        userSettings={userSettings}
        onUpdateSettings={handleUpdateSettings}
      />
    </DashboardLayout>
  );
}
