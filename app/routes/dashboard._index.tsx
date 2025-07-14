import type { MetaFunction } from "@remix-run/node";
import { DashboardLayout } from "~/components/dashboard/layout";
import { DashboardPage } from "~/components/dashboard/pages/dashboard";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard - LuminexClient" },
    {
      name: "description",
      content: "Dashboard overview with statistics, quick actions, and recent activity. Built with modern UI components."
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
