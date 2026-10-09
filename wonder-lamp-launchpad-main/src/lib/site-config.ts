import logoAsset from "@/assets/logo.png";
import mentorAsset from "@/assets/madhankumar.png";

export const siteConfig = {
  brand: "Wonder Lampe Academy",
  price: 299,
  priceLabel: "₹299",
  primaryCta: "JOIN FOR ₹299",
  secondaryCta: "START LEARNING FOR ₹299",
  phone: "9615151961",
  email: "",
  office:"Chennai,Tiruchengode, Tamil Nadu – 637211",
  instagramUrl: "https://www.instagram.com/wonderlampe_academy/?hl=en",
  facebookUrl: "https://www.facebook.com/wonderlampeacademy/",
  whatsappCommunityUrl: "",
  registrationUrl: "",
  paymentUrl: "",

  logo: logoAsset,

  mentor: {
    name: "Dr. M. Madhankumar",
    designation: "Mentor / Educator",
    image: mentorAsset,
    bio: "",
    qualifications: [] as string[],
    experience: "",
    achievements: [],
  },

  certificates: [] as Array<{
    title: string;
    image: string;
    alt: string;
  }>,

  testimonials: [] as Array<{
    name: string;
    review: string;
    image?: string;
    videoUrl?: string;
  }>,

  courseModules: [
    {
      title: "Share Market Foundation",
      topics: [
        "Stock Market Basics",
        "Stocks & Exchanges",
        "Demat & Trading Basics",
        "Market Terminology",
        "Understanding Market Structure",
      ],
    },
    {
      title: "Fundamental Analysis",
      topics: [
        "Understanding Companies",
        "Business Analysis",
        "Financial Basics",
        "Financial Statements",
        "Stock Analysis Fundamentals",
      ],
    },
    {
      title: "Technical Analysis",
      topics: [
        "Reading Charts",
        "Candlestick Patterns",
        "Trends",
        "Support & Resistance",
        "Indicators",
        "Price Action Basics",
      ],
    },
    {
      title: "Trading Concepts",
      topics: [
        "Trading Basics",
        "Entry & Exit Concepts",
        "Risk Management",
        "Position Sizing",
        "Trading Psychology",
      ],
    },
    {
      title: "Portfolio Basics",
      topics: [
        "Portfolio Understanding",
        "Diversification",
        "Risk Awareness",
        "Stock Tracking",
        "Portfolio Analysis Concepts",
      ],
    },
  ],
} as const;