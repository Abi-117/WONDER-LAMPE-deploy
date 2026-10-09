import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/landing-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wonder Lampe Academy | Learn Share Market from ₹299" },
      {
        name: "description",
        content:
          "Learn Share Market from zero with Wonder Lampe Academy. Get recorded classes, 21 days live online training, study materials, AI stock and portfolio access and a premium learning community for ₹299.",
      },
      { property: "og:title", content: "Wonder Lampe Academy | Learn Share Market from ₹299" },
      {
        property: "og:description",
        content: "A structured ₹299 Share Market Learning Program for beginners, with recorded classes, live training, study materials and educational AI tools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <LandingPage />;
}
