import type { MetaFunction } from "@remix-run/node";
import { DashboardLayout } from "~/components/dashboard/layout";
import { DashboardPage } from "~/components/dashboard/pages/dashboard";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - LuminexClient | Hosting Management" },
    { 
      name: "description", 
      content: "Manage your hosting services, support tickets, and billing from your LuminexClient dashboard." 
    },
  ];
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardPage />
    </DashboardLayout>
  );
}
