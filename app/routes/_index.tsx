import type { MetaFunction } from "@remix-run/node";
import { Layout } from "~/components/layout";
import { Hero } from "~/components/hero";
import { Features } from "~/components/features";
import { Testimonials } from "~/components/testimonials";
import { CTASection } from "~/components/cta-section";

export const meta: MetaFunction = () => {
  return [
    { title: "LuminexClient - A Client Area UI made in Remix" },
    {
      name: "description",
      content: "A modern frontend template showcasing a client area interface built with Remix, TypeScript, and Tailwind CSS. Features responsive design, dark theme, and beautiful animations."
    },
    { name: "keywords", content: "remix template, typescript, tailwind css, client area, dashboard template, frontend template, react components, dark theme" },
    { property: "og:title", content: "LuminexClient - Frontend Template" },
    {
      property: "og:description",
      content: "Modern client area frontend template built with Remix, TypeScript, and Tailwind CSS. Perfect for dashboards and admin panels."
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "LuminexClient - Frontend Template" },
    { name: "twitter:description", content: "Modern client area template with responsive design and beautiful animations." },
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
