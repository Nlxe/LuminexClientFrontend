import type { MetaFunction } from "@remix-run/node";
import { Layout } from "~/components/layout";
import { Hero } from "~/components/hero";
import { Features } from "~/components/features";
import { Testimonials } from "~/components/testimonials";
import { CTASection } from "~/components/cta-section";

export const meta: MetaFunction = () => {
  return [
    { title: "LuminexClient - Open Source WHMCS Alternative | Client Area Management" },
    {
      name: "description",
      content: "The modern, open-source alternative to WHMCS. Automate billing, service provisioning, and client management for hosting providers and service businesses. Free to download and customize."
    },
    { name: "keywords", content: "WHMCS alternative, open source billing, client area management, hosting automation, service provisioning, automated billing, hosting provider software, client portal" },
    { property: "og:title", content: "LuminexClient - Open Source WHMCS Alternative" },
    {
      property: "og:description",
      content: "The modern, open-source alternative to WHMCS for hosting providers and service businesses. Automate billing, provisioning, and client management."
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "LuminexClient - Open Source WHMCS Alternative" },
    { name: "twitter:description", content: "Modern client area management system for hosting providers. Open source, customizable, and feature-rich." },
  ];
};

export default function Index() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Testimonials />
      <CTASection />
    </Layout>
  );
}
