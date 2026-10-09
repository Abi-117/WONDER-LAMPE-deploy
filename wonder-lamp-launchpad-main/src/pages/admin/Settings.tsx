import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  GripVertical,
  Plus,
  RotateCcw,
  Save,
  Settings as SettingsIcon,
  Trash2,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://wonder-lampe-deploy.onrender.com";
  
type Benefit = {
  number: string;
  title: string;
  text: string;
};

type Problem = {
  number: string;
  title: string;
  text: string;
};
type CourseModule = {
  title: string;
  topics: string[];
};
type Journey = {
  days: string;
  title: string;
  text: string;
};

type CertificateItem = {
  title: string;
  alt: string;
  image: string;
};

type StudentReview = {
  name: string;
  course: string;
  text: string;
  rating: number;
  verified: boolean;
};

type SettingsData = {
  programName: string;
  programPrice: number;
  originalPrice: number;
  showOriginalPrice: boolean;
  currency: string;

  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  curriculumEyebrow: string;
curriculumTitle: string;

courseModules: CourseModule[];

curriculumDisclaimer: string;

  problemsEyebrow: string;
  problemsTitle: string;
  problemsDescription: string;
  problems: Problem[];
  problemsBottomTitle: string;
  problemsBottomText: string;

  journeyEyebrow: string;
  journeyTitle: string;
  journey: Journey[];
  journeyBottomText: string;

  offerEyebrow: string;
  offerTitle: string;
  offerDescription: string;
  offerAccessTitle: string;
  offerButtonText: string;

  certificatesEyebrow: string;
certificatesTitle: string;
certificatesDescription: string;
certificates: CertificateItem[];

reviewsEyebrow: string;
reviewsTitle: string;
reviewsDescription: string;
reviews: StudentReview[];

  benefitsEyebrow: string;
  benefitsTitle: string;
  benefits: Benefit[];
  benefitsButtonText: string;
  
};

const defaultSettings: SettingsData = {
  programName: "Share Market Learning Program",
  programPrice: 299,
  originalPrice: 0,
  showOriginalPrice: false,
  currency: "INR",

  heroTitle: "Start Learning Share Market with a Structured System",
  heroDescription:
    "Learn the fundamentals, analyse the market and build practical understanding through a guided learning journey.",
  primaryCta: "START LEARNING",
  secondaryCta: "JOIN NOW",

    curriculumEyebrow: "Complete curriculum",

  curriculumTitle: "What Will You Learn?",

  courseModules: [
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

  curriculumDisclaimer:
    "This is an educational program. Participation does not guarantee profits or investment returns.",


  problemsEyebrow: "Your starting point",
  problemsTitle: "Starting Your Share Market Journey?",
  problemsDescription: "Do any of these challenges sound familiar?",
  problems: [
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
  problemsBottomTitle: "A Structured Learning System Can Change That.",
  problemsBottomText: "Learn → Analyse → Understand → Practice",

certificatesEyebrow: "Recognition",
certificatesTitle: "Certificates",
certificatesDescription: "Professional certifications and achievements.",

certificates: [],

reviewsEyebrow: "Student voices",
reviewsTitle: "What Our Students Say",
reviewsDescription: "Hear from our students about their learning experience.",

reviews: [],

  journeyEyebrow: "A clear learning path",
  journeyTitle: "21 Days. One Structured Learning Journey.",
  journey: [
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
  journeyBottomText: "LEARN → ANALYSE → UNDERSTAND → PRACTICE",

  offerEyebrow: "One price. Complete system.",
  offerTitle: "Everything You Need to Start Learning Share Market",
  offerDescription:
    "Start your Share Market learning journey with a structured program designed to help you understand the market from the fundamentals.",
  offerAccessTitle: "Complete access",
  offerButtonText: "GET ACCESS",

  curriculumEyebrow: "Complete curriculum",

curriculumTitle: "What Will You Learn?",

courseModules: [
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

curriculumDisclaimer:
  "This is an educational program. Participation does not guarantee profits or investment returns.",

  benefitsEyebrow: "WHAT YOU GET",
  benefitsTitle: "Everything You Need to Start Learning Share Market",
  benefits: [
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
  benefitsButtonText: "Start Your Learning Journey",
};

function cloneDefaults(): SettingsData {
  return JSON.parse(JSON.stringify(defaultSettings)) as SettingsData;
}

function normalizeSettings(value: Partial<SettingsData> | null | undefined): SettingsData {
  const source = value ?? {};
  return {
    ...cloneDefaults(),
    ...source,
    problems: Array.isArray(source.problems)
      ? source.problems
      : cloneDefaults().problems,
    journey: Array.isArray(source.journey)
      ? source.journey
      : cloneDefaults().journey,
    
    courseModules: Array.isArray(source.courseModules)
      ? source.courseModules
      : cloneDefaults().courseModules,

    benefits: Array.isArray(source.benefits)
      ? source.benefits
      : cloneDefaults().benefits,
    certificates: Array.isArray(source.certificates)
      ? source.certificates
      : cloneDefaults().certificates,
    reviews: Array.isArray(source.reviews)
      ? source.reviews
      : cloneDefaults().reviews,
  };
}



function renumber<T extends { number: string }>(items: T[]): T[] {
  return items.map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, "0"),
  }));
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsData>(cloneDefaults());
  const [savedSettings, setSavedSettings] = useState<SettingsData>(
    cloneDefaults(),
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [activeSection, setActiveSection] = useState("program");
  const [uploadingCertificateIndex, setUploadingCertificateIndex] = useState<number | null>(null);

  const isDirty = useMemo(
    () => JSON.stringify(settings) !== JSON.stringify(savedSettings),
    [settings, savedSettings],
  );
async function uploadToCloudinary(file: File): Promise<string> {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    throw new Error("Admin session missing. Please login again.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    throw new Error("Session expired. Please login again.");
  }

  if (!response.ok || !data.success || !data.url) {
    throw new Error(data.message || "Image upload failed.");
  }

  return data.url;
}
  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${API_URL}/api/settings`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load settings.");
      }

      const normalized = normalizeSettings(data.settings);
      setSettings(normalized);
      setSavedSettings(normalized);
    } catch (error) {
      console.error("Settings fetch error:", error);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to load settings.",
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }
 function addCourseModule() {
  setSettings((previous) => ({
    ...previous,

    courseModules: [
      ...(previous.courseModules || []),
      {
        title: "",
        topics: [""],
      },
    ],
  }));
}

function deleteCourseModule(index: number) {
  setSettings((previous) => ({
    ...previous,

    courseModules: (previous.courseModules || []).filter(
      (_, moduleIndex) => moduleIndex !== index
    ),
  }));
}
function duplicateCourseModule(index: number) {
  setSettings((previous) => {
    const modules = [...(previous.courseModules || [])];
    const module = modules[index];

    if (!module) return previous;

    modules.splice(index + 1, 0, {
      title: module.title,
      topics: [...(module.topics || [])],
    });

    return {
      ...previous,
      courseModules: modules,
    };
  });

  setMessage("");
}

function moveCourseModule(index: number, direction: -1 | 1) {
  setSettings((previous) => {
    const modules = [...(previous.courseModules || [])];
    const target = index + direction;

    if (target < 0 || target >= modules.length) {
      return previous;
    }

    [modules[index], modules[target]] = [
      modules[target],
      modules[index],
    ];

    return {
      ...previous,
      courseModules: modules,
    };
  });

  setMessage("");
}
function updateCourseModuleTitle(
  moduleIndex: number,
  value: string
) {
  setSettings((previous) => ({
    ...previous,

    courseModules: (previous.courseModules || []).map(
      (module, index) =>
        index === moduleIndex
          ? {
              ...module,
              title: value,
            }
          : module
    ),
  }));
}

function addCourseTopic(moduleIndex: number) {
  setSettings((previous) => ({
    ...previous,

    courseModules: (previous.courseModules || []).map(
      (module, index) =>
        index === moduleIndex
          ? {
              ...module,
              topics: [
                ...(module.topics || []),
                "",
              ],
            }
          : module
    ),
  }));
}

function updateCourseTopic(
  moduleIndex: number,
  topicIndex: number,
  value: string
) {
  setSettings((previous) => ({
    ...previous,

    courseModules: (previous.courseModules || []).map(
      (module, index) =>
        index === moduleIndex
          ? {
              ...module,

              topics: (module.topics || []).map(
                (topic, index) =>
                  index === topicIndex
                    ? value
                    : topic
              ),
            }
          : module
    ),
  }));
}

function deleteCourseTopic(
  moduleIndex: number,
  topicIndex: number
) {
  setSettings((previous) => ({
    ...previous,

    courseModules: (previous.courseModules || []).map(
      (module, index) =>
        index === moduleIndex
          ? {
              ...module,

              topics: (module.topics || []).filter(
                (_, index) =>
                  index !== topicIndex
              ),
            }
          : module
    ),
  }));
}
  function updateField<K extends keyof SettingsData>(
    field: K,
    value: SettingsData[K],
  ) {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
    setMessage("");
  }

  function updateProblem(
    index: number,
    field: keyof Problem,
    value: string,
  ) {
    setSettings((previous) => {
      const problems = [...(previous.problems || [])];
      if (!problems[index]) return previous;
      problems[index] = { ...problems[index], [field]: value };
      return { ...previous, problems };
    });
    setMessage("");
  }

  function addProblem() {
    setSettings((previous) => {
      const problems = [...(previous.problems || [])];
      return {
        ...previous,
        problems: [
          ...problems,
          {
            number: String(problems.length + 1).padStart(2, "0"),
            title: "",
            text: "",
          },
        ],
      };
    });
    setMessage("");
  }

  function deleteProblem(index: number) {
    setSettings((previous) => ({
      ...previous,
      problems: renumber(
        (previous.problems || []).filter((_, itemIndex) => itemIndex !== index),
      ),
    }));
    setMessage("");
  }

  function duplicateProblem(index: number) {
    setSettings((previous) => {
      const problems = [...(previous.problems || [])];
      const item = problems[index];
      if (!item) return previous;
      problems.splice(index + 1, 0, {
        ...item,
        number: "",
      });
      return { ...previous, problems: renumber(problems) };
    });
    setMessage("");
  }

  function moveProblem(index: number, direction: -1 | 1) {
    setSettings((previous) => {
      const problems = [...(previous.problems || [])];
      const target = index + direction;
      if (target < 0 || target >= problems.length) return previous;
      [problems[index], problems[target]] = [
        problems[target],
        problems[index],
      ];
      return { ...previous, problems: renumber(problems) };
    });
    setMessage("");
  }

  function updateJourney(
    index: number,
    field: keyof Journey,
    value: string,
  ) {
    setSettings((previous) => {
      const journey = [...(previous.journey || [])];
      if (!journey[index]) return previous;
      journey[index] = { ...journey[index], [field]: value };
      return { ...previous, journey };
    });
    setMessage("");
  }

  function addJourney() {
    setSettings((previous) => ({
      ...previous,
      journey: [
        ...(previous.journey || []),
        {
          days: "",
          title: "",
          text: "",
        },
      ],
    }));
    setMessage("");
  }

  function deleteJourney(index: number) {
    setSettings((previous) => ({
      ...previous,
      journey: (previous.journey || []).filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
    setMessage("");
  }

  function duplicateJourney(index: number) {
    setSettings((previous) => {
      const journey = [...(previous.journey || [])];
      const item = journey[index];
      if (!item) return previous;
      journey.splice(index + 1, 0, { ...item });
      return { ...previous, journey };
    });
    setMessage("");
  }

  function moveJourney(index: number, direction: -1 | 1) {
    setSettings((previous) => {
      const journey = [...(previous.journey || [])];
      const target = index + direction;
      if (target < 0 || target >= journey.length) return previous;
      [journey[index], journey[target]] = [
        journey[target],
        journey[index],
      ];
      return { ...previous, journey };
    });
    setMessage("");
  }

  function updateBenefit(
    index: number,
    field: keyof Benefit,
    value: string,
  ) {
    setSettings((previous) => {
      const benefits = [...(previous.benefits || [])];
      if (!benefits[index]) return previous;
      benefits[index] = { ...benefits[index], [field]: value };
      return { ...previous, benefits };
    });
    setMessage("");
  }

  function addBenefit() {
    setSettings((previous) => {
      const benefits = [...(previous.benefits || [])];
      return {
        ...previous,
        benefits: [
          ...benefits,
          {
            number: String(benefits.length + 1).padStart(2, "0"),
            title: "",
            text: "",
          },
        ],
      };
    });
    setMessage("");
  }

  function deleteBenefit(index: number) {
    setSettings((previous) => ({
      ...previous,
      benefits: renumber(
        (previous.benefits || []).filter(
          (_, itemIndex) => itemIndex !== index,
        ),
      ),
    }));
    setMessage("");
  }

  function duplicateBenefit(index: number) {
    setSettings((previous) => {
      const benefits = [...(previous.benefits || [])];
      const item = benefits[index];
      if (!item) return previous;
      benefits.splice(index + 1, 0, { ...item, number: "" });
      return { ...previous, benefits: renumber(benefits) };
    });
    setMessage("");
  }

  function moveBenefit(index: number, direction: -1 | 1) {
    setSettings((previous) => {
      const benefits = [...(previous.benefits || [])];
      const target = index + direction;
      if (target < 0 || target >= benefits.length) return previous;
      [benefits[index], benefits[target]] = [
        benefits[target],
        benefits[index],
      ];
      return { ...previous, benefits: renumber(benefits) };
    });
    setMessage("");
  }

  function updateCertificate(index: number, field: keyof CertificateItem, value: string) {
    setSettings((previous) => ({
      ...previous,
      certificates: (previous.certificates || []).map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
    setMessage("");
  }

  function addCertificate() {
    setSettings((previous) => ({
      ...previous,
      certificates: [...(previous.certificates || []), { title: "", alt: "", image: "" }],
    }));
    setMessage("");
  }

  function deleteCertificate(index: number) {
    setSettings((previous) => ({
      ...previous,
      certificates: (previous.certificates || []).filter((_, itemIndex) => itemIndex !== index),
    }));
    setMessage("");
  }

  async function handleCertificateUpload(index: number, file?: File) {
    if (!file) return;
    try {
      setUploadingCertificateIndex(index);
      setMessage("");
      const imageUrl = await uploadToCloudinary(file);
      updateCertificate(index, "image", imageUrl);
      setMessage("Certificate image uploaded. Click Save Changes to publish it.");
      setMessageType("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Certificate image upload failed.");
      setMessageType("error");
    } finally {
      setUploadingCertificateIndex(null);
    }
  }

  function updateReview(index: number, field: keyof StudentReview, value: string | number | boolean) {
    setSettings((previous) => ({
      ...previous,
      reviews: (previous.reviews || []).map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
    setMessage("");
  }

  function addReview() {
    setSettings((previous) => ({
      ...previous,
      reviews: [...(previous.reviews || []), { name: "", course: "", text: "", rating: 5, verified: false }],
    }));
    setMessage("");
  }

  function deleteReview(index: number) {
    setSettings((previous) => ({
      ...previous,
      reviews: (previous.reviews || []).filter((_, itemIndex) => itemIndex !== index),
    }));
    setMessage("");
  }

  function resetUnsavedChanges() {
    setSettings(JSON.parse(JSON.stringify(savedSettings)));
    setMessage("Unsaved changes discarded.");
    setMessageType("success");
  }

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (settings.programPrice < 0) {
      setMessage("Program price cannot be negative.");
      setMessageType("error");
      return;
    }

    if (settings.originalPrice < 0) {
      setMessage("Original price cannot be negative.");
      setMessageType("error");
      return;
    }

    if (
      settings.showOriginalPrice &&
      settings.originalPrice <= settings.programPrice
    ) {
      setMessage(
        "Original price should be greater than the current price.",
      );
      setMessageType("error");
      return;
    }

    if (!settings.programName.trim()) {
      setMessage("Program name is required.");
      setMessageType("error");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("adminToken");

      if (!token) {
        setMessage("Admin session not found. Please login again.");
        setMessageType("error");
        return;
      }

      const response = await fetch(`${API_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Unable to save settings.");
        setMessageType("error");
        return;
      }

      const normalized = normalizeSettings(data.settings);
      setSettings(normalized);
      setSavedSettings(normalized);
      setMessage("Settings saved successfully.");
      setMessageType("success");
    } catch (error) {
      console.error("Settings save error:", error);
      setMessage("Unable to connect to server.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-2xl border bg-card px-8 py-6 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="mt-4 font-semibold text-muted-foreground">
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  const sectionButton = (
    id: string,
    label: string,
    count?: number,
  ) => (
    <button
      type="button"
      onClick={() => setActiveSection(id)}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
        activeSection === id
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      <span>{label}</span>
      {typeof count === "number" && (
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            activeSection === id
              ? "bg-white/20"
              : "bg-muted text-foreground"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );

  const inputClass =
    "mt-2 h-12 w-full rounded-xl border bg-background px-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  const textareaClass =
    "mt-2 w-full rounded-xl border bg-background p-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

  const cardClass =
    "rounded-2xl border bg-card p-6 shadow-sm";

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <div className="sticky top-0 z-30 -mx-4 mb-8 border-b bg-background/95 px-4 py-4 backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <SettingsIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                Website Settings
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage every editable section of your landing page.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isDirty && (
              <button
                type="button"
                onClick={resetUnsavedChanges}
                className="inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-bold hover:bg-muted"
              >
                <RotateCcw size={16} />
                Discard
              </button>
            )}

            <button
              form="website-settings-form"
              type="submit"
              disabled={saving || !isDirty}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />
              {saving ? "Saving..." : isDirty ? "Save Changes" : "Saved"}
            </button>
          </div>
        </div>

        {isDirty && (
          <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
            You have unsaved changes.
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border bg-card p-3 shadow-sm lg:sticky lg:top-24">
          <p className="px-3 pb-2 text-[11px] font-black uppercase tracking-wider text-muted-foreground">
            Sections
          </p>

          <div className="space-y-1">
            {sectionButton("program", "Program")}
            {sectionButton("hero", "Homepage Hero")}
            {sectionButton(
  "curriculum",
  "Complete Curriculum",
  settings.courseModules.length
)}
            {sectionButton(
              "problems",
              "Starting Point",
              settings.problems.length,
            )}
            {sectionButton(
              "journey",
              "21 Days Journey",
              settings.journey.length,
            )}
            {sectionButton("offer", "Learning Offer")}
            {sectionButton(
              "benefits",
              "Benefits / What You Get",
              settings.benefits.length,
            )}
            {sectionButton(
  "certificates",
  "Certificates",
  settings.certificates.length,
)}

{sectionButton(
  "reviews",
  "Student Reviews",
  settings.reviews.length,
)}
          </div>

          <div className="mt-4 rounded-xl bg-muted/60 p-4">
            <p className="text-xs font-bold text-muted-foreground">
              Current Price
            </p>
            <p className="mt-1 text-2xl font-black text-primary">
              ₹{settings.programPrice.toLocaleString("en-IN")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {settings.benefits.length} benefits · {settings.journey.length}{" "}
              journey stages
            </p>
          </div>
        </aside>

        <form
          id="website-settings-form"
          onSubmit={saveSettings}
          className="space-y-6"
        >
          {activeSection === "curriculum" && (
  <section className={cardClass}>

    <SectionHeader
      title="Complete Curriculum"
      description="Manage the curriculum modules and topics displayed on your public landing page."
    />

    <div className="mt-6 space-y-5">

      {/* SECTION EYEBROW */}
      <Field label="Section Eyebrow">

        <input
          type="text"
          value={settings.curriculumEyebrow}
          onChange={(e) =>
            updateField(
              "curriculumEyebrow",
              e.target.value
            )
          }
          className={inputClass}
          placeholder="Complete curriculum"
        />

      </Field>


      {/* SECTION TITLE */}
      <Field label="Section Title">

        <input
          type="text"
          value={settings.curriculumTitle}
          onChange={(e) =>
            updateField(
              "curriculumTitle",
              e.target.value
            )
          }
          className={inputClass}
          placeholder="What Will You Learn?"
        />

      </Field>


      {/* MODULES */}
      <div className="rounded-2xl border bg-muted/20 p-4 md:p-5">

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h3 className="font-black">
              Curriculum Modules
            </h3>

            <p className="text-xs text-muted-foreground">
              Add, edit, duplicate, reorder or delete modules and topics.
            </p>

          </div>

          <AddButton
            onClick={addCourseModule}
            label="Add Module"
          />

        </div>


        <div className="space-y-4">

          {(settings.courseModules || []).map(
            (module, moduleIndex) => (

              <EditableCard
                key={`${moduleIndex}-${module.title}`}

                index={moduleIndex}

                total={
                  settings.courseModules.length
                }

                title={
                  module.title ||
                  `Module ${moduleIndex + 1}`
                }

                onMoveUp={() =>
                  moveCourseModule(
                    moduleIndex,
                    -1
                  )
                }

                onMoveDown={() =>
                  moveCourseModule(
                    moduleIndex,
                    1
                  )
                }

                onDuplicate={() =>
                  duplicateCourseModule(
                    moduleIndex
                  )
                }

                onDelete={() =>
                  deleteCourseModule(
                    moduleIndex
                  )
                }
              >

                {/* MODULE TITLE */}

                <Field label="Module Title">

                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) =>
                      updateCourseModuleTitle(
                        moduleIndex,
                        e.target.value
                      )
                    }
                    className={inputClass}
                    placeholder="Stock Market Basics"
                  />

                </Field>


                {/* TOPICS */}

                <div className="rounded-xl border bg-muted/20 p-4">

                  <div className="mb-4 flex items-center justify-between gap-3">

                    <div>

                      <h4 className="font-bold">
                        Topics
                      </h4>

                      <p className="text-xs text-muted-foreground">
                        Add the topics covered in this module.
                      </p>

                    </div>

                    <AddButton
                      onClick={() =>
                        addCourseTopic(
                          moduleIndex
                        )
                      }
                      label="Add Topic"
                    />

                  </div>


                  <div className="space-y-3">

                    {(module.topics || []).map(
                      (topic, topicIndex) => (

                        <div
                          key={`${moduleIndex}-${topicIndex}`}
                          className="flex gap-2"
                        >

                          <input
                            type="text"
                            value={topic}
                            onChange={(e) =>
                              updateCourseTopic(
                                moduleIndex,
                                topicIndex,
                                e.target.value
                              )
                            }
                            className={inputClass}
                            placeholder="Enter topic"
                          />


                          <button
                            type="button"
                            onClick={() =>
                              deleteCourseTopic(
                                moduleIndex,
                                topicIndex
                              )
                            }
                            className="mt-2 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10"
                            title="Delete topic"
                          >

                            <Trash2 size={16} />

                          </button>

                        </div>

                      )
                    )}


                    {(!module.topics ||
                      module.topics.length === 0) && (

                      <div className="rounded-xl border border-dashed p-5 text-center">

                        <p className="text-sm text-muted-foreground">
                          No topics added yet.
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            addCourseTopic(
                              moduleIndex
                            )
                          }
                          className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground"
                        >

                          <Plus size={15} />

                          Add First Topic

                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </EditableCard>

            )
          )}


          {/* EMPTY MODULE STATE */}

          {settings.courseModules.length === 0 && (

            <EmptyState
              text="No curriculum modules added yet."
              buttonLabel="Add First Module"
              onClick={addCourseModule}
            />

          )}

        </div>

      </div>


      {/* DISCLAIMER */}

      <Field label="Curriculum Disclaimer">

        <textarea
          value={settings.curriculumDisclaimer}
          onChange={(e) =>
            updateField(
              "curriculumDisclaimer",
              e.target.value
            )
          }
          rows={4}
          className={textareaClass}
          placeholder="This is an educational program..."
        />

      </Field>

    </div>

  </section>
)}
          {activeSection === "program" && (
            <section className={cardClass}>
              <SectionHeader
                title="Program Settings"
                description="Control the main learning program name, price and pricing display."
              />

              <div className="mt-6 space-y-5">
                <Field label="Program Name">
                  <input
                    type="text"
                    value={settings.programName}
                    onChange={(e) =>
                      updateField("programName", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Share Market Learning Program"
                  />
                </Field>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Current Price">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={settings.programPrice}
                        onChange={(e) =>
                          updateField(
                            "programPrice",
                            Number(e.target.value),
                          )
                        }
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </Field>

                  <Field label="Original / Strike Price">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={settings.originalPrice}
                        onChange={(e) =>
                          updateField(
                            "originalPrice",
                            Number(e.target.value),
                          )
                        }
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </Field>
                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
                  <input
                    type="checkbox"
                    checked={settings.showOriginalPrice}
                    onChange={(e) =>
                      updateField("showOriginalPrice", e.target.checked)
                    }
                    className="h-5 w-5 accent-primary"
                  />
                  <div>
                    <p className="font-bold">Show Original Price</p>
                    <p className="text-xs text-muted-foreground">
                      Example: ₹499 → ₹299
                    </p>
                  </div>
                </label>

                <div className="rounded-xl bg-muted p-5">
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Live Price Preview
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    {settings.showOriginalPrice &&
                      settings.originalPrice > settings.programPrice && (
                        <span className="text-lg font-bold text-muted-foreground line-through">
                          ₹{settings.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    <span className="text-4xl font-black text-primary">
                      ₹{settings.programPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === "hero" && (
            <section className={cardClass}>
              <SectionHeader
                title="Homepage Hero"
                description="Edit the main content displayed at the top of your website."
              />

              <div className="mt-6 space-y-5">
                <Field label="Hero Title">
                  <input
                    type="text"
                    value={settings.heroTitle}
                    onChange={(e) =>
                      updateField("heroTitle", e.target.value)
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Hero Description">
                  <textarea
                    value={settings.heroDescription}
                    onChange={(e) =>
                      updateField("heroDescription", e.target.value)
                    }
                    rows={5}
                    className={textareaClass}
                  />
                </Field>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Primary CTA">
                    <input
                      type="text"
                      value={settings.primaryCta}
                      onChange={(e) =>
                        updateField("primaryCta", e.target.value)
                      }
                      className={inputClass}
                      placeholder="START LEARNING"
                    />
                  </Field>

                  <Field label="Secondary CTA">
                    <input
                      type="text"
                      value={settings.secondaryCta}
                      onChange={(e) =>
                        updateField("secondaryCta", e.target.value)
                      }
                      className={inputClass}
                      placeholder="JOIN NOW"
                    />
                  </Field>
                </div>
              </div>
            </section>
          )}

          {activeSection === "problems" && (
            <section className={cardClass}>
              <SectionHeader
                title="Starting Point"
                description="Edit the section heading, challenge cards and bottom message."
              />

              <div className="mt-6 space-y-5">
                <Field label="Section Eyebrow">
                  <input
                    type="text"
                    value={settings.problemsEyebrow}
                    onChange={(e) =>
                      updateField("problemsEyebrow", e.target.value)
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Section Title">
                  <input
                    type="text"
                    value={settings.problemsTitle}
                    onChange={(e) =>
                      updateField("problemsTitle", e.target.value)
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Section Description">
                  <textarea
                    value={settings.problemsDescription}
                    onChange={(e) =>
                      updateField("problemsDescription", e.target.value)
                    }
                    rows={3}
                    className={textareaClass}
                  />
                </Field>

                <div className="rounded-2xl border bg-muted/20 p-4 md:p-5">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-black">Challenge Cards</h3>
                      <p className="text-xs text-muted-foreground">
                        Add, edit, duplicate, reorder or delete cards.
                      </p>
                    </div>
                    <AddButton onClick={addProblem} label="Add Challenge" />
                  </div>

                  <div className="space-y-4">
                    {(settings.problems || []).map((problem, index) => (
                      <EditableCard
                        key={`${index}-${problem.number}`}
                        index={index}
                        total={settings.problems.length}
                        title={`Challenge ${index + 1}`}
                        onMoveUp={() => moveProblem(index, -1)}
                        onMoveDown={() => moveProblem(index, 1)}
                        onDuplicate={() => duplicateProblem(index)}
                        onDelete={() => deleteProblem(index)}
                      >
                        <Field label="Number">
                          <input
                            type="text"
                            value={problem.number}
                            onChange={(e) =>
                              updateProblem(
                                index,
                                "number",
                                e.target.value,
                              )
                            }
                            className={inputClass}
                            placeholder="01"
                          />
                        </Field>

                        <Field label="Title">
                          <input
                            type="text"
                            value={problem.title}
                            onChange={(e) =>
                              updateProblem(
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                            className={inputClass}
                            placeholder="Don't Know Where to Start?"
                          />
                        </Field>

                        <Field label="Description">
                          <textarea
                            value={problem.text}
                            onChange={(e) =>
                              updateProblem(index, "text", e.target.value)
                            }
                            rows={3}
                            className={textareaClass}
                            placeholder="Challenge description"
                          />
                        </Field>
                      </EditableCard>
                    ))}

                    {settings.problems.length === 0 && (
                      <EmptyState
                        text="No challenge cards added yet."
                        buttonLabel="Add First Challenge"
                        onClick={addProblem}
                      />
                    )}
                  </div>
                </div>

                <Field label="Bottom Title">
                  <input
                    type="text"
                    value={settings.problemsBottomTitle}
                    onChange={(e) =>
                      updateField("problemsBottomTitle", e.target.value)
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Bottom Text">
                  <input
                    type="text"
                    value={settings.problemsBottomText}
                    onChange={(e) =>
                      updateField("problemsBottomText", e.target.value)
                    }
                    className={inputClass}
                  />
                </Field>
              </div>
            </section>
          )}

          {activeSection === "journey" && (
            <section className={cardClass}>
              <SectionHeader
                title="21 Days Journey"
                description="Manage the learning stages shown on the public landing page."
              />

              <div className="mt-6 space-y-5">
                <Field label="Section Eyebrow">
                  <input
                    type="text"
                    value={settings.journeyEyebrow}
                    onChange={(e) =>
                      updateField("journeyEyebrow", e.target.value)
                    }
                    className={inputClass}
                  />
                </Field>

                <Field label="Section Title">
                  <input
                    type="text"
                    value={settings.journeyTitle}
                    onChange={(e) =>
                      updateField("journeyTitle", e.target.value)
                    }
                    className={inputClass}
                  />
                </Field>

                <div className="rounded-2xl border bg-muted/20 p-4 md:p-5">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-black">Learning Stages</h3>
                      <p className="text-xs text-muted-foreground">
                        The number of stages is fully editable.
                      </p>
                    </div>
                    <AddButton onClick={addJourney} label="Add Stage" />
                  </div>

                  <div className="space-y-4">
                    {(settings.journey || []).map((item, index) => (
                      <EditableCard
                        key={`${index}-${item.days}-${item.title}`}
                        index={index}
                        total={settings.journey.length}
                        title={`Learning Stage ${index + 1}`}
                        onMoveUp={() => moveJourney(index, -1)}
                        onMoveDown={() => moveJourney(index, 1)}
                        onDuplicate={() => duplicateJourney(index)}
                        onDelete={() => deleteJourney(index)}
                      >
                        <Field label="Days / Range">
                          <input
                            type="text"
                            value={item.days}
                            onChange={(e) =>
                              updateJourney(index, "days", e.target.value)
                            }
                            className={inputClass}
                            placeholder="Days 1–3"
                          />
                        </Field>

                        <Field label="Title">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                              updateJourney(index, "title", e.target.value)
                            }
                            className={inputClass}
                            placeholder="Foundation"
                          />
                        </Field>

                        <Field label="Description">
                          <textarea
                            value={item.text}
                            onChange={(e) =>
                              updateJourney(index, "text", e.target.value)
                            }
                            rows={3}
                            className={textareaClass}
                            placeholder="Learning stage description"
                          />
                        </Field>
                      </EditableCard>
                    ))}

                    {settings.journey.length === 0 && (
                      <EmptyState
                        text="No journey stages added yet."
                        buttonLabel="Add First Stage"
                        onClick={addJourney}
                      />
                    )}
                  </div>
                </div>

                <Field label="Bottom Text">
                  <input
                    type="text"
                    value={settings.journeyBottomText}
                    onChange={(e) =>
                      updateField("journeyBottomText", e.target.value)
                    }
                    className={inputClass}
                    placeholder="LEARN → ANALYSE → UNDERSTAND → PRACTICE"
                  />
                </Field>
              </div>
            </section>
          )}

          {activeSection === "offer" && (
            <section className={cardClass}>
              <SectionHeader
                title="Learning Offer Section"
                description="Edit the offer headline, description, access label and CTA. The displayed price automatically comes from Program Settings."
              />

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="space-y-5">
                  <Field label="Eyebrow">
                    <input
                      type="text"
                      value={settings.offerEyebrow}
                      onChange={(e) =>
                        updateField("offerEyebrow", e.target.value)
                      }
                      className={inputClass}
                      placeholder="One price. Complete system."
                    />
                  </Field>

                  <Field label="Title">
                    <input
                      type="text"
                      value={settings.offerTitle}
                      onChange={(e) =>
                        updateField("offerTitle", e.target.value)
                      }
                      className={inputClass}
                      placeholder="Everything You Need to Start Learning Share Market"
                    />
                  </Field>

                  <Field label="Description">
                    <textarea
                      value={settings.offerDescription}
                      onChange={(e) =>
                        updateField("offerDescription", e.target.value)
                      }
                      rows={5}
                      className={textareaClass}
                    />
                  </Field>

                  <Field label="Button Text">
                    <input
                      type="text"
                      value={settings.offerButtonText}
                      onChange={(e) =>
                        updateField("offerButtonText", e.target.value)
                      }
                      className={inputClass}
                      placeholder="GET ACCESS"
                    />
                  </Field>
                </div>

                <div className="rounded-2xl border bg-muted/30 p-6">
                  <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                    Offer Card Preview
                  </p>

                  <p className="mt-6 text-sm font-bold text-muted-foreground">
                    {settings.offerAccessTitle}
                  </p>

                  <p className="mt-2 text-5xl font-black tracking-tight">
                    ₹{settings.programPrice.toLocaleString("en-IN")}
                  </p>

                  {settings.showOriginalPrice &&
                    settings.originalPrice > settings.programPrice && (
                      <p className="mt-1 font-bold text-muted-foreground line-through">
                        ₹{settings.originalPrice.toLocaleString("en-IN")}
                      </p>
                    )}

                  <div className="mt-6">
                    <Field label="Access Title">
                      <input
                        type="text"
                        value={settings.offerAccessTitle}
                        onChange={(e) =>
                          updateField("offerAccessTitle", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Complete access"
                      />
                    </Field>
                  </div>

                  <button
                    type="button"
                    className="mt-6 h-12 w-full rounded-xl bg-primary px-5 font-black text-primary-foreground"
                  >
                    {settings.offerButtonText || "GET ACCESS"} FOR ₹
                    {settings.programPrice.toLocaleString("en-IN")}
                  </button>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Benefits shown in this offer card are managed from the
                    Benefits section.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeSection === "benefits" && (
            <section className={cardClass}>
              <SectionHeader
                title="Benefits / What You Get"
                description="These benefit items can be added, edited, duplicated, reordered and deleted. They will also update anywhere the landing page uses the same benefits array."
              />

              <div className="mt-6 space-y-5">
                <Field label="Section Eyebrow">
                  <input
                    type="text"
                    value={settings.benefitsEyebrow}
                    onChange={(e) =>
                      updateField("benefitsEyebrow", e.target.value)
                    }
                    className={inputClass}
                    placeholder="WHAT YOU GET"
                  />
                </Field>

                <Field label="Section Title">
                  <input
                    type="text"
                    value={settings.benefitsTitle}
                    onChange={(e) =>
                      updateField("benefitsTitle", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Everything You Need to Start Learning Share Market"
                  />
                </Field>

                <div className="rounded-2xl border bg-muted/20 p-4 md:p-5">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-black">Benefit Items</h3>
                      <p className="text-xs text-muted-foreground">
                        Add as many benefits as required.
                      </p>
                    </div>
                    <AddButton onClick={addBenefit} label="Add Benefit" />
                  </div>

                  <div className="space-y-4">
                    {(settings.benefits || []).map((benefit, index) => (
                      <EditableCard
                        key={`${index}-${benefit.number}-${benefit.title}`}
                        index={index}
                        total={settings.benefits.length}
                        title={`Benefit ${index + 1}`}
                        onMoveUp={() => moveBenefit(index, -1)}
                        onMoveDown={() => moveBenefit(index, 1)}
                        onDuplicate={() => duplicateBenefit(index)}
                        onDelete={() => deleteBenefit(index)}
                      >
                        <Field label="Number">
                          <input
                            type="text"
                            value={benefit.number}
                            onChange={(e) =>
                              updateBenefit(
                                index,
                                "number",
                                e.target.value,
                              )
                            }
                            className={inputClass}
                            placeholder="01"
                          />
                        </Field>

                        <Field label="Title">
                          <input
                            type="text"
                            value={benefit.title}
                            onChange={(e) =>
                              updateBenefit(
                                index,
                                "title",
                                e.target.value,
                              )
                            }
                            className={inputClass}
                            placeholder="Recorded Classes"
                          />
                        </Field>

                        <Field label="Description">
                          <textarea
                            value={benefit.text}
                            onChange={(e) =>
                              updateBenefit(index, "text", e.target.value)
                            }
                            rows={3}
                            className={textareaClass}
                            placeholder="Benefit description"
                          />
                        </Field>
                      </EditableCard>
                    ))}

                    {settings.benefits.length === 0 && (
                      <EmptyState
                        text="No benefits added yet. The public section will show no benefit items until you add one."
                        buttonLabel="Add First Benefit"
                        onClick={addBenefit}
                      />
                    )}
                  </div>
                </div>

                <Field label="Button Text">
                  <input
                    type="text"
                    value={settings.benefitsButtonText}
                    onChange={(e) =>
                      updateField("benefitsButtonText", e.target.value)
                    }
                    className={inputClass}
                    placeholder="Start Your Learning Journey"
                  />
                </Field>
              </div>
            </section>
          )}

          {activeSection === "certificates" && (
            <section className={cardClass}>
              <SectionHeader
                title="Certificates"
                description="Edit the section heading and manage certificate images. Images are uploaded to Cloudinary; save settings after uploading."
              />
              <div className="mt-6 space-y-5">
                <Field label="Section Eyebrow">
                  <input type="text" value={settings.certificatesEyebrow} onChange={(e) => updateField("certificatesEyebrow", e.target.value)} className={inputClass} />
                </Field>
                <Field label="Section Title">
                  <input type="text" value={settings.certificatesTitle} onChange={(e) => updateField("certificatesTitle", e.target.value)} className={inputClass} />
                </Field>
                <Field label="Section Description">
                  <textarea value={settings.certificatesDescription} onChange={(e) => updateField("certificatesDescription", e.target.value)} rows={3} className={textareaClass} />
                </Field>
                <div className="flex items-center justify-between gap-3 rounded-xl border bg-muted/20 p-4">
                  <div><h3 className="font-black">Certificate Items</h3><p className="text-xs text-muted-foreground">Upload JPG, PNG or WebP images up to 5 MB.</p></div>
                  <AddButton onClick={addCertificate} label="Add Certificate" />
                </div>
                <div className="space-y-4">
                  {(settings.certificates || []).map((certificate, index) => (
                    <div key={`${index}-${certificate.title}`} className="rounded-2xl border p-4 md:p-5">
                      <div className="mb-4 flex items-center justify-between gap-3"><h3 className="font-black">Certificate {index + 1}</h3><button type="button" onClick={() => deleteCertificate(index)} className="rounded-lg border border-destructive/30 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10">Delete</button></div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Certificate Title"><input type="text" value={certificate.title} onChange={(e) => updateCertificate(index, "title", e.target.value)} className={inputClass} placeholder="Certificate title" /></Field>
                        <Field label="Image Alt Text"><input type="text" value={certificate.alt} onChange={(e) => updateCertificate(index, "alt", e.target.value)} className={inputClass} placeholder="Describe the certificate image" /></Field>
                      </div>
                      <Field label="Cloudinary Image URL"><input type="url" value={certificate.image} onChange={(e) => updateCertificate(index, "image", e.target.value)} className={inputClass} placeholder="https://res.cloudinary.com/..." /></Field>
                      <div className="mt-4 grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-center">
                        <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl border bg-muted/30 p-2">
                          {certificate.image ? <img src={certificate.image} alt={certificate.alt || certificate.title || "Certificate preview"} className="h-full w-full object-contain" /> : <p className="text-center text-xs text-muted-foreground">Image preview</p>}
                        </div>
                        <div>
                          <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-bold transition hover:bg-muted">
                            {uploadingCertificateIndex === index ? "Uploading image..." : "Upload image to Cloudinary"}
                            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" disabled={uploadingCertificateIndex !== null} className="sr-only" onChange={(e) => { const file = e.currentTarget.files?.[0]; void handleCertificateUpload(index, file); e.currentTarget.value = ""; }} />
                          </label>
                          <p className="mt-2 text-xs leading-5 text-muted-foreground">You can also paste a Cloudinary URL above. Uploaded images are not published until you save the settings.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {settings.certificates.length === 0 && <EmptyState text="No certificates added yet." buttonLabel="Add First Certificate" onClick={addCertificate} />}
                </div>
              </div>
            </section>
          )}

          {activeSection === "reviews" && (
            <section className={cardClass}>
              <SectionHeader title="Student Reviews" description="Manage the student review heading and review cards. Publish only genuine reviews with permission from the students." />
              <div className="mt-6 space-y-5">
                <Field label="Section Eyebrow"><input type="text" value={settings.reviewsEyebrow} onChange={(e) => updateField("reviewsEyebrow", e.target.value)} className={inputClass} /></Field>
                <Field label="Section Title"><input type="text" value={settings.reviewsTitle} onChange={(e) => updateField("reviewsTitle", e.target.value)} className={inputClass} /></Field>
                <Field label="Section Description"><textarea value={settings.reviewsDescription} onChange={(e) => updateField("reviewsDescription", e.target.value)} rows={3} className={textareaClass} /></Field>
                <div className="flex items-center justify-between gap-3 rounded-xl border bg-muted/20 p-4"><div><h3 className="font-black">Review Items</h3><p className="text-xs text-muted-foreground">Add, edit or remove student reviews.</p></div><AddButton onClick={addReview} label="Add Review" /></div>
                <div className="space-y-4">
                  {(settings.reviews || []).map((review, index) => (
                    <div key={`${index}-${review.name}`} className="rounded-2xl border p-4 md:p-5">
                      <div className="mb-4 flex items-center justify-between gap-3"><h3 className="font-black">Review {index + 1}</h3><button type="button" onClick={() => deleteReview(index)} className="rounded-lg border border-destructive/30 px-3 py-2 text-xs font-bold text-destructive hover:bg-destructive/10">Delete</button></div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Student Name"><input type="text" value={review.name} onChange={(e) => updateReview(index, "name", e.target.value)} className={inputClass} placeholder="Student name" /></Field>
                        <Field label="Course / Program"><input type="text" value={review.course} onChange={(e) => updateReview(index, "course", e.target.value)} className={inputClass} placeholder="Course name" /></Field>
                      </div>
                      <Field label="Review Text"><textarea value={review.text} onChange={(e) => updateReview(index, "text", e.target.value)} rows={4} className={textareaClass} placeholder="Student's review" /></Field>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <Field label="Rating (1–5)"><select value={review.rating} onChange={(e) => updateReview(index, "rating", Number(e.target.value))} className={inputClass}>{[5,4,3,2,1].map((rating) => <option key={rating} value={rating}>{rating} star{rating === 1 ? "" : "s"}</option>)}</select></Field>
                        <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border p-4"><input type="checkbox" checked={review.verified} onChange={(e) => updateReview(index, "verified", e.target.checked)} className="h-5 w-5 accent-primary" /><span><span className="block font-bold">Verified review</span><span className="text-xs text-muted-foreground">Mark only after verification.</span></span></label>
                      </div>
                    </div>
                  ))}
                  {settings.reviews.length === 0 && <EmptyState text="No student reviews added yet." buttonLabel="Add First Review" onClick={addReview} />}
                </div>
              </div>
            </section>
          )}

          {message && (
            <div
              className={`rounded-xl border p-4 text-sm font-semibold ${
                messageType === "error"
                  ? "border-destructive/30 bg-destructive/5 text-destructive"
                  : "border-emerald-300 bg-emerald-50 text-emerald-800"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t pt-6">
            {isDirty && (
              <button
                type="button"
                onClick={resetUnsavedChanges}
                className="inline-flex h-12 items-center gap-2 rounded-xl border px-5 font-bold hover:bg-muted"
              >
                <RotateCcw size={17} />
                Discard Changes
              </button>
            )}

            <button
              type="submit"
              disabled={saving || !isDirty}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 font-bold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? "Saving..." : isDirty ? "Save Settings" : "All Changes Saved"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b pb-5">
      <h2 className="text-xl font-black md:text-2xl">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-bold">{label}</label>
      {children}
    </div>
  );
}

function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-sm transition hover:opacity-90"
    >
      <Plus size={16} />
      {label}
    </button>
  );
}

function EditableCard({
  index,
  total,
  title,
  children,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
}: {
  index: number;
  total: number;
  title: string;
  children: ReactNode;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
      <div className="flex flex-col gap-3 border-b bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border bg-card p-2 text-muted-foreground">
            <GripVertical size={16} />
          </div>
          <div>
            <h4 className="font-black">{title}</h4>
            <p className="text-xs text-muted-foreground">
              Item {index + 1} of {total}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <IconButton
            label="Move up"
            disabled={index === 0}
            onClick={onMoveUp}
          >
            <ChevronUp size={16} />
          </IconButton>

          <IconButton
            label="Move down"
            disabled={index === total - 1}
            onClick={onMoveDown}
          >
            <ChevronDown size={16} />
          </IconButton>

          <IconButton label="Duplicate" onClick={onDuplicate}>
            <Copy size={15} />
          </IconButton>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-destructive/30 px-3 text-xs font-bold text-destructive transition hover:bg-destructive/10"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>

      <div className="space-y-4 p-4 md:p-5">{children}</div>
    </div>
  );
}

function IconButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-card text-muted-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function EmptyState({
  text,
  buttonLabel,
  onClick,
}: {
  text: string;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed p-8 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
      <button
        type="button"
        onClick={onClick}
        className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground"
      >
        <Plus size={16} />
        {buttonLabel}
      </button>
    </div>
  );
}
