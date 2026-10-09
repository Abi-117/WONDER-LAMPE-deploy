import mongoose from "mongoose";

// ========================================
// PROBLEM ITEM SCHEMA
// ========================================
const problemSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    text: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

// ========================================
// BENEFIT ITEM SCHEMA
// ========================================
const benefitSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    text: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);
    // ========================================
// JOURNEY ITEM SCHEMA
// ========================================
const journeySchema = new mongoose.Schema(
  {
    days: {
      type: String,
      default: "",
      trim: true,
    },

    title: {
      type: String,
      default: "",
      trim: true,
    },

    text: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

// ========================================
// CERTIFICATE ITEM SCHEMA
// ========================================
const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },
    alt: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

// ========================================
// STUDENT REVIEW SCHEMA
// ========================================
const studentReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },
    course: {
      type: String,
      default: "",
      trim: true,
    },
    text: {
      type: String,
      default: "",
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// ========================================
// COURSE MODULE ITEM SCHEMA
// ========================================
const courseModuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      trim: true,
    },

    topics: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

// ========================================
// SITE SETTINGS SCHEMA
// ========================================
const siteSettingsSchema = new mongoose.Schema(
  {
    // =========================
    // MAIN PROGRAM
    // =========================
    programName: {
      type: String,
      default: "Share Market Learning Program",
      trim: true,
    },

    programPrice: {
      type: Number,
      default: 299,
      min: 0,
    },

    originalPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    showOriginalPrice: {
      type: Boolean,
      default: false,
    },

    currency: {
      type: String,
      default: "INR",
      trim: true,
    },

    // =========================
    // HERO
    // =========================
    heroTitle: {
      type: String,
      default: "Learn Share Market from Zero",
      trim: true,
    },

    heroDescription: {
      type: String,
      default: "",
      trim: true,
    },

    primaryCta: {
      type: String,
      default: "START LEARNING",
      trim: true,
    },

    secondaryCta: {
      type: String,
      default: "JOIN NOW",
      trim: true,
    },

    // =========================
    // STARTING POINT SECTION
    // =========================
    problemsEyebrow: {
      type: String,
      default: "Your starting point",
      trim: true,
    },

    problemsTitle: {
      type: String,
      default: "Starting Your Share Market Journey?",
      trim: true,
    },

    problemsDescription: {
      type: String,
      default: "Do any of these challenges sound familiar?",
      trim: true,
    },

    problems: {
      type: [problemSchema],

      default: [
        {
          number: "01",
          title: "Don't Know Where to Start?",
          text: "You are interested in the stock market but do not know where to begin.",
        },
        {
          number: "02",
          title: "Confused About Stock Selection?",
          text: "You want to understand how stocks can be analysed before making decisions.",
        },
        {
          number: "03",
          title: "Too Many YouTube Videos?",
          text: "You watch multiple videos but still do not have a structured learning path.",
        },
        {
          number: "04",
          title: "Technical Analysis Feels Complicated?",
          text: "Charts, candlesticks, indicators and trends can feel overwhelming.",
        },
        {
          number: "05",
          title: "Fundamental Analysis Is Confusing?",
          text: "You want to understand how to study companies and their fundamentals.",
        },
        {
          number: "06",
          title: "Learning Without a System?",
          text: "Random learning makes it difficult to connect everything together.",
        },
      ],
    },

    problemsBottomTitle: {
      type: String,
      default: "A Structured Learning System Can Change That.",
      trim: true,
    },

    problemsBottomText: {
      type: String,
      default: "Learn → Analyse → Understand → Practice",
      trim: true,
    },
offerEyebrow: {
  type: String,
  default: "One price. Complete system.",
  trim: true,
},

offerTitle: {
  type: String,
  default: "Everything You Need to Start Learning Share Market",
  trim: true,
},

offerDescription: {
  type: String,
  default:
    "Start your Share Market learning journey with a structured program designed to help you understand the market from the fundamentals.",
  trim: true,
},

offerAccessTitle: {
  type: String,
  default: "Complete access",
  trim: true,
},

offerButtonText: {
  type: String,
  default: "GET ACCESS",
  trim: true,
},

// =========================
// COMPLETE CURRICULUM
// =========================
curriculumEyebrow: {
  type: String,
  default: "Complete curriculum",
  trim: true,
},

curriculumTitle: {
  type: String,
  default: "What Will You Learn?",
  trim: true,
},

courseModules: {
  type: [courseModuleSchema],

  default: [
    {
      title: "Stock Market Basics",
      topics: [
        "Understanding the stock market",
        "Stocks and exchanges",
        "Market terminology",
      ],
    },
    {
      title: "Fundamental Analysis",
      topics: [
        "Company analysis",
        "Financial statements",
        "Understanding fundamentals",
      ],
    },
    {
      title: "Technical Analysis",
      topics: [
        "Charts and candlesticks",
        "Support and resistance",
        "Trends and indicators",
      ],
    },
    {
      title: "Trading Concepts",
      topics: [
        "Entry and exit concepts",
        "Risk management",
        "Trading psychology",
      ],
    },
    {
      title: "Practical Learning",
      topics: [
        "Stock analysis",
        "Portfolio concepts",
        "Practical application",
      ],
    },
  ],
},

curriculumDisclaimer: {
  type: String,
  default:
    "This is an educational program. Participation does not guarantee profits or investment returns.",
  trim: true,
},

// ========================================
// CERTIFICATES SECTION
// ========================================
certificatesEyebrow: {
  type: String,
  default: "Recognition",
  trim: true,
},

certificatesTitle: {
  type: String,
  default: "Certificates",
  trim: true,
},

certificatesDescription: {
  type: String,
  default: "Our professional certifications.",
  trim: true,
},

certificates: {
  type: [certificateSchema],
  default: [],
},

// ========================================
// STUDENT REVIEWS SECTION
// ========================================
reviewsEyebrow: {
  type: String,
  default: "Student Reviews",
  trim: true,
},

reviewsTitle: {
  type: String,
  default: "What Our Students Say",
  trim: true,
},

reviewsDescription: {
  type: String,
  default: "Feedback from our learners.",
  trim: true,
},

reviews: {
  type: [studentReviewSchema],
  default: [],
},


// =========================
// 21 DAYS JOURNEY
// =========================
journeyEyebrow: {
  type: String,
  default: "A clear learning path",
  trim: true,
},

journeyTitle: {
  type: String,
  default: "21 Days. One Structured Learning Journey.",
  trim: true,
},

journey: {
  type: [journeySchema],

  default: [
    {
      days: "Days 1–3",
      title: "Foundation",
      text: "Understand the stock market and essential concepts.",
    },
    {
      days: "Days 4–7",
      title: "Market Understanding",
      text: "Learn stocks, exchanges, terminology and market structure.",
    },
    {
      days: "Days 8–11",
      title: "Fundamental Analysis",
      text: "Learn how to study companies and understand stock fundamentals.",
    },
    {
      days: "Days 12–15",
      title: "Technical Analysis",
      text: "Learn charts, candlesticks, trends, support, resistance and indicators.",
    },
    {
      days: "Days 16–18",
      title: "Trading Concepts",
      text: "Understand risk management, setups, entry and exit concepts and psychology.",
    },
    {
      days: "Days 19–21",
      title: "Practical Learning",
      text: "Review analysis, portfolio concepts and guided learning.",
    },
  ],
},

journeyBottomText: {
  type: String,
  default: "LEARN → ANALYSE → UNDERSTAND → PRACTICE",
  trim: true,
},


    // =========================
    // BENEFITS / WHAT YOU GET
    // =========================
    benefitsEyebrow: {
      type: String,
      default: "WHAT YOU GET",
      trim: true,
    },

    benefitsTitle: {
      type: String,
      default: "Everything You Need to Start Learning Share Market",
      trim: true,
    },

    benefits: {
      type: [benefitSchema],

      default: [
        {
          number: "01",
          title: "Recorded Classes",
          text: "Learn at your own pace with structured recorded lessons you can revisit whenever you need.",
        },
        {
          number: "02",
          title: "21 Days Live Online Training",
          text: "Follow a structured 21-day learning journey with live online training and interaction.",
        },
        {
          number: "03",
          title: "Complete Study Materials",
          text: "Access learning resources covering foundation, fundamental analysis and technical analysis.",
        },
        {
          number: "04",
          title: "AI Stock & Portfolio Access",
          text: "Explore AI-powered educational tools that support stock and portfolio analysis without guaranteeing returns.",
        },
        {
          number: "05",
          title: "Premium Learning Community",
          text: "Connect with fellow learners and stay engaged through a dedicated learning community.",
        },
      ],
    },

    benefitsButtonText: {
      type: String,
      default: "Start Your Learning Journey",
      trim: true,
    },

    // =========================
    // ADMIN
    // =========================
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

// ========================================
// EXPORT MODEL
// ========================================
export default mongoose.model(
  "SiteSettings",
  siteSettingsSchema
);