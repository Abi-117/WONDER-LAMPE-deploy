import { useEffect, useState, type FormEvent } from "react";

import { useServerFn } from "@tanstack/react-start";

import {

  ArrowRight, BookOpen, Bot, BriefcaseBusiness, CalendarDays, Check,

  ChevronRight, CircleDollarSign, Facebook, GraduationCap, Instagram, LineChart,

  Menu, PlayCircle, ShieldCheck, Sparkles, TrendingUp, Users, X, Zap,

} from "lucide-react";

import type { LucideIcon } from "lucide-react";



import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { siteConfig } from "@/lib/site-config";

import { registrationSchema, submitProgramRegistration, type RegistrationInput } from "@/lib/registration.functions";



type SiteSettings = {

  programName: string;

  programPrice: number;

  originalPrice: number;

  showOriginalPrice: boolean;

  currency: string;



  heroTitle: string;

  heroDescription: string;

  primaryCta: string;

  secondaryCta: string;



  // =========================

  // STARTING POINT

  // =========================

  problemsEyebrow: string;

  problemsTitle: string;

  problemsDescription: string;



  problems: {

    number: string;

    title: string;

    text: string;

  }[];



  problemsBottomTitle: string;

  problemsBottomText: string;



  // =========================

// 21 DAYS JOURNEY

// =========================

journeyEyebrow: string;

journeyTitle: string;



journey: {

  days: string;

  title: string;

  text: string;

}[];



journeyBottomText: string;



offerEyebrow: string;

offerTitle: string;

offerDescription: string;

offerAccessTitle: string;

offerButtonText: string;



  // =========================

  // BENEFITS

  // =========================

  benefitsEyebrow: string;

  benefitsTitle: string;



  benefits: {

    number: string;

    title: string;

    text: string;

  }[];



  benefitsButtonText: string;
  certificatesEyebrow: string;
  certificatesTitle: string;
  certificatesDescription: string;

  certificates: {
    title: string;
    alt: string;
    image: string;
  }[];

  reviewsEyebrow: string;
  reviewsTitle: string;
  reviewsDescription: string;

  reviews: {
    name: string;
    course: string;
    text: string;
    rating: number;
    verified: boolean;
  }[];

};

type Course = {

  _id: string;

  courseName: string;

  subName: string;

  duration: string;

  price: number;

  status: boolean;

};







const defaultSiteSettings: SiteSettings = {

  programName: "Share Market Learning Program",



  programPrice: 299,



  originalPrice: 0,



  showOriginalPrice: false,



  currency: "INR",



  heroTitle: "Learn Share Market from Zero",



  heroDescription: "",



  primaryCta: "START LEARNING",



  secondaryCta: "JOIN NOW",



  problemsEyebrow: "Your starting point",



  problemsTitle: "Starting Your Share Market Journey?",



  problemsDescription:

    "Do any of these challenges sound familiar?",

    benefitsEyebrow: "WHAT YOU GET",



    offerEyebrow: "One price. Complete system.",



offerTitle: "Everything You Need to Start Learning Share Market",



offerDescription:

  "Start your Share Market learning journey with a structured program designed to help you understand the market from the fundamentals.",



offerAccessTitle: "Complete access",



offerButtonText: "GET ACCESS",



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
  certificatesEyebrow: "Recognition",
  certificatesTitle: "Certificates",
  certificatesDescription: "Our professional certifications.",

  certificates: [],

  reviewsEyebrow: "Student Reviews",
  reviewsTitle: "What Our Students Say",
  reviewsDescription: "Feedback from our learners.",

  reviews: [],


benefitsButtonText: "Start Your Learning Journey",



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



  problemsBottomTitle:

    "A Structured Learning System Can Change That.",



  problemsBottomText:

    "Learn → Analyse → Understand → Practice",

};



const API_URL =

   process.env.API_URL || "http://localhost:5000";



const formatPrice = (price: number) => {

  return `₹${price.toLocaleString("en-IN")}`;

};



// const benefits = [

//   { icon: PlayCircle, number: "01", title: "Recorded Classes", text: "Learn at your own pace with structured recorded lessons you can revisit whenever you need." },

//   { icon: CalendarDays, number: "02", title: "21 Days Live Online Training", text: "Follow a structured 21-day learning journey with live online training and interaction." },

//   { icon: BookOpen, number: "03", title: "Complete Study Materials", text: "Access learning resources covering foundation, fundamental analysis and technical analysis." },

//   { icon: Bot, number: "04", title: "AI Stock & Portfolio Access", text: "Explore AI-powered educational tools that support stock and portfolio analysis without guaranteeing returns." },

//   { icon: Users, number: "05", title: "Premium Learning Community", text: "Connect with fellow learners and stay engaged through a dedicated learning community." },

// ];

const problems = [

  ["Don't Know Where to Start?", "You are interested in the stock market but do not know where to begin."],

  ["Confused About Stock Selection?", "You want to understand how stocks can be analysed before making decisions."],

  ["Too Many YouTube Videos?", "You watch multiple videos but still do not have a structured learning path."],

  ["Technical Analysis Feels Complicated?", "Charts, candlesticks, indicators and trends can feel overwhelming."],

  ["Fundamental Analysis Is Confusing?", "You want to understand how to study companies and their fundamentals."],

  ["Learning Without a System?", "Random learning makes it difficult to connect everything together."],

];

const journey = [

  ["Days 1–3", "Foundation", "Understand the stock market and essential concepts."],

  ["Days 4–7", "Market Understanding", "Learn stocks, exchanges, terminology and market structure."],

  ["Days 8–11", "Fundamental Analysis", "Learn how to study companies and understand stock fundamentals."],

  ["Days 12–15", "Technical Analysis", "Learn charts, candlesticks, trends, support, resistance and indicators."],

  ["Days 16–18", "Trading Concepts", "Understand risk management, setups, entry and exit concepts and psychology."],

  ["Days 19–21", "Practical Learning", "Review analysis, portfolio concepts and guided learning."],

];

const courses = [

  {

    name: "OPTION EXPRESS",

    subName: "Options Trading",

    duration: "Duration 1",

  },

  {

    name: "STOCK MARKET PRO",

    subName: "Stock Market Training",

    duration: "Duration 100",

  },

  {

    name: "SHARE MARKET FOUNDATION",

    subName: "Advanced Level",

    duration: "Duration 5",

  },

  {

    name: "ADVANCED TECHNICAL TRADING",

    subName: "Trading Workshop",

    duration: "Duration 1",

  },

];

const profiles = [

  [GraduationCap, "Complete Beginners", "Starting a stock market learning journey from zero."],

  [BriefcaseBusiness, "Working Professionals", "Building financial market knowledge alongside a career."],

  [BookOpen, "Students", "Interested in understanding financial markets."],

  [CircleDollarSign, "New Investors", "Learning investing concepts through a structured path."],

  [TrendingUp, "Aspiring Traders", "Understanding trading concepts and technical analysis."],

  [PlayCircle, "Video Learners", "Ready to turn scattered videos into a clear learning system."],

] as const;

const getFaqs = (price: number) => [

  [

    "Is this program suitable for beginners?",

    "Yes. The program is designed to help learners start from the fundamentals.",

  ],

  [

    "What is the program price?",

    `The special program price is ${formatPrice(price)}.`,

  ],

  [

    "Are the classes online?",

    "Yes. The program includes online learning and 21 days of live online training.",

  ],

  [

    "Do I get recorded classes?",

    "Yes. Recorded lessons are included so you can learn at your own pace.",

  ],

  [

    "Do I get study materials?",

    "Yes. Complete study materials are included as part of the learning system.",

  ],

  [

    "Is AI Stock & Portfolio Access included?",

    "Yes. It is included as an educational tool and does not guarantee investment returns.",

  ],

  [

    "Is this a stock tip service?",

    "No. This is an educational program focused on market knowledge and structured learning, not guaranteed stock tips.",

  ],

  [

    "Will I make guaranteed profits after completing the program?",

    "No. The program is educational and does not guarantee profits or investment returns.",

  ],

  [

    "How do I join?",

    `Click any JOIN FOR ${formatPrice(price)} button, complete registration, and continue to the available payment step.`,

  ],

];

const registrationFields = [

  ["fullName", "Full Name", "Your full name", "text"],

  ["mobile", "Mobile Number", "10-digit mobile", "tel"],

  ["email", "Email Address", "you@example.com", "email"],

  ["city", "City", "Your city", "text"],

  ["whatsappNumber", "WhatsApp Number", "10-digit WhatsApp number", "tel"],

] as const;

const academyFeatures: Array<[LucideIcon, string, string]> = [

  [Users, "Experienced Educators", "Learn through structured guidance from experienced educators."],

  [BookOpen, "Structured Learning", "Follow a clear learning path instead of random content."],

  [Zap, "Online Learning", "Learn from anywhere through online training."],

  [LineChart, "Practical Understanding", "Focus on understanding market concepts and analysis."],

];



function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {

  return <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">

    {eyebrow && <p className="mb-3 text-xs font-bold uppercase text-primary">{eyebrow}</p>}

    <h2 className="text-3xl font-extrabold text-foreground md:text-5xl">{title}</h2>

    {description && <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>}

  </div>;

}

function JoinButton({ open, label = siteConfig.primaryCta, className = "" }: { open: () => void; label?: string; className?: string }) {

  return <Button onClick={open} size="lg" className={`motion-cta h-12 bg-primary px-6 font-bold text-primary-foreground shadow-gold hover:bg-primary/90 ${className}`}>{label}<ArrowRight /></Button>;

}

function SectionCta({

  open,

  label,

}: {

  open: () => void;

  label?: string;

}) {

  return (

    <div className="mt-10 text-center">

      <JoinButton

        open={open}

        label={label || "JOIN NOW"}

      />

    </div>

  );

}



function MarketDashboard() {

  const bars = [36, 50, 42, 65, 55, 74, 61, 82, 70, 88, 76, 94];

  return <div className="relative mx-auto w-full max-w-[570px]" aria-label="Educational market dashboard illustration">

    <div className="dashboard-shell relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-premium md:p-7">

      <div className="mb-7 flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-muted-foreground">Learning Dashboard</p><p className="mt-1 text-lg font-bold">Market Structure</p></div><span className="flex items-center gap-2 rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success"><span className="h-2 w-2 rounded-full bg-success" /> Market open</span></div>

      <div className="grid grid-cols-3 gap-3">

        {[['Market index', '+1.24%'], ['Watchlist', '12 stocks'], ['Portfolio lab', 'Practice']].map(([k,v]) => <div key={k} className="rounded-lg border border-border bg-background p-3"><p className="text-[10px] font-bold uppercase text-muted-foreground">{k}</p><p className="mt-2 text-sm font-extrabold text-foreground">{v}</p></div>)}

      </div>

      <div className="mt-5 rounded-xl border border-border bg-background p-4">

        <div className="mb-4 flex items-center justify-between"><span className="text-sm font-bold">Price action study</span><span className="text-xs text-muted-foreground">Educational visual</span></div>

        <div className="relative h-48 border-b border-l border-border/70">

          <svg viewBox="0 0 520 180" className="absolute inset-0 h-full w-full" role="img" aria-label="Illustrative stock market learning chart">

            <path className="chart-line" pathLength="1" d="M0 148 C45 138 58 110 96 119 S147 151 185 103 S245 122 280 78 S333 95 369 54 S420 69 520 20" fill="none" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />

            <path d="M0 148 C45 138 58 110 96 119 S147 151 185 103 S245 122 280 78 S333 95 369 54 S420 69 520 20 L520 180 L0 180 Z" fill="url(#chartFill)" opacity=".22" />

            <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--success)"/><stop offset="1" stopColor="var(--background)"/></linearGradient></defs>

          </svg>

          <div className="absolute inset-0 flex items-end justify-around px-3 pb-1">{bars.map((h,i)=><span key={i} className={`chart-bar relative w-2 rounded-sm ${i % 3 === 0 ? 'bg-primary' : 'bg-success'}`} style={{height:`${h}%`, animationDelay:`${i*70}ms`}}><i className="absolute left-1/2 top-[-8px] h-[calc(100%+16px)] w-px -translate-x-1/2 bg-current opacity-40" /></span>)}</div>

        </div>

      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="text-success" /> For learning and analysis practice only</p>

    </div>

    <div className="absolute -bottom-5 -left-4 hidden rounded-lg border border-border bg-card p-4 shadow-premium md:block"><p className="text-[10px] font-bold uppercase text-muted-foreground">Learning path</p><p className="mt-1 font-bold">21 guided days</p></div>

  </div>;

}



function RegistrationDialog({

  open,

  onOpenChange,

  settings,

}: {

  open: boolean;

  onOpenChange: (value: boolean) => void;

  settings: SiteSettings;

}) {  const submitRegistration = useServerFn(submitProgramRegistration);

  const [step, setStep] = useState<"form" | "payment" | "success">("form");

  const [experience, setExperience] = useState<RegistrationInput["experienceLevel"]>("Beginner");

  const [risk, setRisk] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [registrationName, setRegistrationName] = useState("");

  async function startPayment(studentId: string) {

  try {

    setLoading(true);

    setError("");



    const response = await fetch(

      `${API_URL}/api/payment/create-order`,

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          studentId,

          paymentType: "program",

        }),

      }

    );



    const data = await response.json();



    if (!response.ok || !data.success) {

      throw new Error(

        data.message || "Unable to create payment order."

      );

    }



    const options = {

      key: data.publicKey,

      amount: data.amount,

      currency: data.currency,

      name: "Wonder Lampe Academy",

      description: settings.programName,



      order_id: data.orderId,



      prefill: {

        name: registrationName,

      },



      theme: {

        color: "#D4AF37",

      },



      handler: async function (paymentResponse: {

        razorpay_order_id: string;

        razorpay_payment_id: string;

        razorpay_signature: string;

      }) {

        await verifyPayment(paymentResponse);

      },



      modal: {

        ondismiss: function () {

          setLoading(false);

          setError("Payment was cancelled.");

        },

      },

    };



    const razorpay = new window.Razorpay(options);



    razorpay.open();

  } catch (error) {

    setLoading(false);



    throw error;

  }

}



async function verifyPayment(paymentResponse: {

  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;

}) {

  try {

    const response = await fetch(

      `${API_URL}/api/payment/verify`,

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          razorpayOrderId:

            paymentResponse.razorpay_order_id,



          razorpayPaymentId:

            paymentResponse.razorpay_payment_id,



          razorpaySignature:

            paymentResponse.razorpay_signature,

        }),

      }

    );



    const data = await response.json();



    if (!response.ok || !data.success) {

      throw new Error(

        data.message || "Payment verification failed."

      );

    }



    setLoading(false);

    setStep("success");

  } catch (error) {

    setLoading(false);



    setError(

      error instanceof Error

        ? error.message

        : "Payment verification failed."

    );

  }

}

  async function submit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault(); setError("");

    const fd = new FormData(event.currentTarget);

    const parsed = registrationSchema.safeParse({ fullName: fd.get("fullName"), mobile: fd.get("mobile"), email: fd.get("email"), city: fd.get("city"), whatsappNumber: fd.get("whatsappNumber"), experienceLevel: experience, riskAcknowledged: risk });

    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check your details."); return; }

    setLoading(true);

    try {

  const registrationResult = await submitRegistration({

    data: parsed.data,

  });



  if (!registrationResult?.studentId) {

    throw new Error("Student registration failed.");

  }



  await startPayment(registrationResult.studentId);

} catch (e) {

  setError(

    e instanceof Error

      ? e.message

      : "Something went wrong. Please try again."

  );

} finally {

  setLoading(false);

}

  }

  function reset(next: boolean) { onOpenChange(next); if (!next) window.setTimeout(() => { setStep("form"); setError(""); }, 200); }

  return <Dialog open={open} onOpenChange={reset}><DialogContent className="max-h-[92vh] overflow-y-auto border-border sm:max-w-xl">

    {step === "form" && <><DialogHeader><div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-primary"><span className="grid h-7 w-7 place-items-center rounded-full bg-gold-soft">1</span> Registration</div><DialogTitle className="text-2xl">Register for the {formatPrice(settings.programPrice)} Program</DialogTitle><DialogDescription>Enter your details to continue to the payment step.</DialogDescription></DialogHeader>

      <form onSubmit={submit} className="mt-2 space-y-4" noValidate>

        <div className="grid gap-4 sm:grid-cols-2">{registrationFields.map(([name,label,placeholder,type])=><div key={name} className={name === "whatsappNumber" ? "sm:col-span-2" : ""}><Label htmlFor={name}>{label}</Label><Input id={name} name={name} type={type} placeholder={placeholder} className="mt-1.5 h-11" maxLength={name === "whatsappNumber" || name === "mobile" ? 10 : undefined} required /></div>)}</div>

        <div><Label>Experience Level</Label><Select value={experience} onValueChange={(v) => setExperience(v as RegistrationInput["experienceLevel"])}><SelectTrigger className="mt-1.5 h-11 w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Beginner">Beginner</SelectItem><SelectItem value="Basic Knowledge">Basic Knowledge</SelectItem><SelectItem value="Intermediate">Intermediate</SelectItem></SelectContent></Select></div>

        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted p-4"><Checkbox id="risk" checked={risk} onCheckedChange={(v) => setRisk(v === true)} /><Label htmlFor="risk" className="text-xs leading-5 text-muted-foreground">I understand that this is an educational program and that stock market participation involves market risk.</Label></div>

        {error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}

<Button

  disabled={loading}

  type="submit"

  className="h-12 w-full bg-primary font-bold text-primary-foreground"

>

  {loading

    ? "Saving registration…"

    : `CONTINUE FOR ${formatPrice(settings.programPrice)}`}

  <ArrowRight />

</Button>

        <p className="text-center text-xs text-muted-foreground"><ShieldCheck className="mr-1 inline h-3.5 w-3.5" />Your details are stored securely.</p>

      </form></>}



      {step === "payment" && (

  <div className="py-10 text-center">

    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-soft text-primary">

      <CircleDollarSign className="h-8 w-8" />

    </div>



    <h3 className="mt-5 text-2xl font-extrabold">

      Complete Your Payment

    </h3>



    <p className="mx-auto mt-3 max-w-sm text-muted-foreground">

      Complete your secure payment of{" "}

      <strong>

        {formatPrice(settings.programPrice)}

      </strong>

      {" "}to confirm your enrollment.

    </p>



    <p className="mt-5 text-xs text-muted-foreground">

      Razorpay secure checkout will open automatically.

    </p>

  </div>

)}

{step === "success" && (

  <div className="py-10 text-center">

    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success-soft text-success">

      <Check className="h-9 w-9" />

    </div>



    <h3 className="mt-5 text-2xl font-extrabold">

      Payment Successful!

    </h3>



    <p className="mx-auto mt-3 max-w-md text-muted-foreground">

      Welcome to Wonder Lampe Academy.

      Your registration and payment have been successfully completed.

    </p>



    <div className="mx-auto mt-6 max-w-sm rounded-lg border border-border bg-muted p-4">

      <p className="text-xs font-bold uppercase text-muted-foreground">

        Program

      </p>



      <p className="mt-1 font-extrabold">

        {settings.programName}

      </p>



      <p className="mt-2 text-xl font-black text-primary">

        {formatPrice(settings.programPrice)}

      </p>

    </div>



    {siteConfig.whatsappCommunityUrl && (

      <Button

        asChild

        className="mt-6 h-12 bg-primary text-primary-foreground"

      >

        <a

          href={siteConfig.whatsappCommunityUrl}

          target="_blank"

          rel="noreferrer"

        >

          JOIN OUR WHATSAPP COMMUNITY

          <ArrowRight />

        </a>

      </Button>

    )}



    <p className="mt-5 text-xs text-muted-foreground">

      Your learning access details will be shared with you shortly.

    </p>

  </div>

)}

  </DialogContent></Dialog>;

}



export function LandingPage() {



const [settings, setSettings] =

  useState<SiteSettings>(defaultSiteSettings);

const [courses, setCourses] = useState<Course[]>([]);

const [settingsLoading, setSettingsLoading] =

  useState(true);

  useEffect(() => {

  const fetchCourses = async () => {

    try {

      const response = await fetch(`${API_URL}/api/courses`);

      const data = await response.json();



      if (data.success) {

        setCourses(

          (data.courses || []).filter(

            (course: Course) => course.status === true

          )

        );

      }

    } catch (error) {

      console.error("Courses fetch error:", error);

    }

  };



  fetchCourses();

}, []);



  useEffect(() => {

  const script = document.createElement("script");



  script.src = "https://checkout.razorpay.com/v1/checkout.js";

  script.async = true;



  document.body.appendChild(script);



  return () => {

    document.body.removeChild(script);

  };

}, []);



  useEffect(() => {

  const loadSettings = async () => {

    try {

      const response = await fetch(`${API_URL}/api/settings`);



      if (!response.ok) {

        throw new Error("Failed to load settings");

      }



      const data = await response.json();



      if (data?.success && data?.settings) {

  setSettings({

  ...defaultSiteSettings,

  ...data.settings,



 problems:
  Array.isArray(data.settings?.problems)
    ? data.settings.problems
    : defaultSiteSettings.problems,


  journey:

    Array.isArray(data.settings?.journey) &&

    data.settings.journey.length > 0

      ? data.settings.journey

      : defaultSiteSettings.journey,

courseModules:
  Array.isArray(data.settings?.courseModules)
    ? data.settings.courseModules
    : defaultSiteSettings.courseModules,



  benefits:

    Array.isArray(data.settings?.benefits) &&

    data.settings.benefits.length > 0

      ? data.settings.benefits

      : defaultSiteSettings.benefits,

});

}

    } catch (error) {

      console.error("Settings loading error:", error);

    } finally {

      setSettingsLoading(false);

    }

  };



  loadSettings();

}, []);



  const [dialogOpen, setDialogOpen] = useState(false); const [menuOpen, setMenuOpen] = useState(false);

  const openRegistration = () => { setMenuOpen(false); setDialogOpen(true); };

  const nav = [["What You'll Learn","curriculum"],["What You Get","benefits"],["21 Days","journey"],["Who It's For","audience"],["Mentor","mentor"],["Certificates","certificates"],["Reviews","reviews"],["FAQ","faq"]];

  return <div className="min-h-screen overflow-x-hidden bg-background pb-20 text-foreground md:pb-0">

    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/95 backdrop-blur-xl"><div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-6"><a href="#home" className="flex items-center gap-3"><img src={siteConfig.logo} alt="Wonder Lampe Academy" className="h-12 w-12 object-contain"/><span className="hidden text-sm font-extrabold uppercase leading-tight sm:block">Wonder Lampe<br/><span className="text-[10px] font-semibold text-muted-foreground">Financial Empowerment Academy</span></span></a><nav className="hidden items-center gap-5 xl:flex">{nav.map(([label,id])=><a key={id} href={`#${id}`} className="text-xs font-semibold text-muted-foreground transition hover:text-foreground">{label}</a>)}</nav><div className="flex items-center gap-2"><JoinButton open={openRegistration} className="h-10 px-4 text-xs sm:px-5"/><Button variant="outline" size="icon" className="xl:hidden" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen?<X/>:<Menu/>}</Button></div></div>{menuOpen&&<nav className="border-t border-border bg-card px-4 py-3 xl:hidden">{nav.map(([label,id])=><a onClick={()=>setMenuOpen(false)} key={id} href={`#${id}`} className="block border-b border-border/60 py-3 text-sm font-semibold last:border-0">{label}</a>)}</nav>}</header>



    <main>

      <section id="home" className="financial-grid relative py-14 md:py-20"><div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-6 lg:grid-cols-[1.03fr_.97fr]"><div><div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gold-soft px-3 py-2 text-xs font-bold uppercase text-primary"><Sparkles className="h-4 w-4"/>Special Learning Program</div>

      <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.08] md:text-6xl">

  {settings.heroTitle}{" "}


  {/* Original Price - Strikethrough */}
  {settings?.showOriginalPrice &&
    Number(settings?.originalPrice) > 0 && (
      <span className="text-4xl font-semibold text-muted-foreground line-through decoration-2">
        ₹{Number(settings.originalPrice).toLocaleString("en-IN")}
      </span>
    )}

  {/* Current Program Price */}
  <span className="text-6xl font-black text-primary">
    ₹{Number(settings?.programPrice ?? 299).toLocaleString("en-IN")}
  </span>



</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{settings.heroDescription ||

    "Learn stock market and trading from the basics with practical guidance."}

</p>

<div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">{["Recorded Classes","21 Days Live Training","Study Materials","AI Tools","Premium Community"].map(x=><span key={x} className="flex items-center gap-1.5"><Check className="text-success"/>{x}</span>)}</div>

<div className="mt-8 flex flex-col gap-3 sm:flex-row">

  <JoinButton

    open={openRegistration}

    label={`${settings.primaryCta} FOR ${formatPrice(settings.programPrice)}`}

  />



  <Button

    asChild

    variant="outline"

    size="lg"

    className="h-12"

  >

    <a href="#benefits">

      SEE WHAT YOU GET <ChevronRight />

    </a>

  </Button>

</div>

<p className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground"><span>Beginner Friendly</span><span>•</span><span>Structured Learning</span><span>•</span><span>Online Training</span></p></div><MarketDashboard/></div></section>



      <div className="border-y border-primary/20 bg-gold-soft"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-center sm:flex-row sm:text-left md:px-6"><div><p className="font-extrabold text-primary">{formatPrice(settings.programPrice)} SPECIAL LEARNING PROGRAM</p><p className="text-sm text-muted-foreground">Start your Stock Market Learning Journey Today</p></div><JoinButton open={openRegistration} label="JOIN NOW" className="h-10"/></div></div>



   <section className="section bg-muted">

  <div className="container-page">



    <SectionTitle

      eyebrow={settings.problemsEyebrow}

      title={settings.problemsTitle}

      description={settings.problemsDescription}

    />



    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">



     {(settings.problems || []).map((problem, index) => (

        <article

          key={`${problem.number}-${index}`}

          className="feature-card"

        >

          <span className="text-xs font-extrabold text-primary">

            {problem.number || `0${index + 1}`}

          </span>



          <h3 className="mt-4 text-lg font-bold">

            {problem.title}

          </h3>



          <p className="mt-2 text-sm leading-6 text-muted-foreground">

            {problem.text}

          </p>

        </article>

      ))}



    </div>



    <div className="mt-10 text-center">



      <h3 className="text-2xl font-extrabold">

        {settings.problemsBottomTitle}

      </h3>



      <p className="mt-2 font-bold text-success">

        {settings.problemsBottomText}

      </p>



    </div>



    <SectionCta

      open={openRegistration}

      label={settings.secondaryCta}

    />



  </div>

</section>



     <section className="section">

  <div className="container-page">

    <div className="grid items-center gap-12 lg:grid-cols-2">



      {/* LEFT CONTENT */}

      <div>

        <p className="eyebrow">

          {settings.offerEyebrow}

        </p>



        <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">

          {settings.offerTitle}

        </h2>



        <p className="mt-5 text-muted-foreground">

          {settings.offerDescription}

        </p>



        <JoinButton

          open={openRegistration}

          label={`${settings.offerButtonText} FOR ${formatPrice(

            settings.programPrice

          )}`}

          className="mt-7"

        />

      </div>



      {/* RIGHT OFFER PANEL */}

      <div className="offer-panel">



        <p className="text-sm font-bold uppercase text-muted-foreground">

          {settings.offerAccessTitle}

        </p>



        <p className="mt-1 text-6xl font-black text-primary">

          {formatPrice(settings.programPrice)}

        </p>



        <div className="mt-6 space-y-3">



          {(settings.benefits || []).map((benefit) => (

            <p

              key={benefit.number}

              className="flex items-center gap-3 font-semibold"

            >

              <span className="grid h-6 w-6 place-items-center rounded-full bg-success-soft text-success">

                <Check />

              </span>



              {benefit.title}

            </p>

          ))}



        </div>



      </div>



    </div>

  </div>

</section>



<section id="benefits" className="section bg-muted">

  <div className="container-page">



    <SectionTitle

      eyebrow={settings.benefitsEyebrow}

      title={settings.benefitsTitle}

    />



    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">



      {(settings.benefits || []).map((benefit, index) => (

        <article

          key={benefit.number}

          className="feature-card lg:min-h-72"

        >

          <div className="flex items-center justify-between">



            <span className="grid h-11 w-11 place-items-center rounded-lg bg-gold-soft text-primary">

              <Check />

            </span>



            <span className="text-xs font-extrabold text-muted-foreground">

              {benefit.number}

            </span>



          </div>



          <h3 className="mt-6 font-extrabold">

            {benefit.title}

          </h3>



          <p className="mt-3 text-sm leading-6 text-muted-foreground">

            {benefit.text}

          </p>

        </article>

      ))}



    </div>



    <SectionCta

      open={openRegistration}

      label={settings.benefitsButtonText}

    />



  </div>

</section>



      <section className="section"><div className="container-page"><SectionTitle eyebrow="Built for clarity" title="One Program. Multiple Learning Benefits."/><div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-premium lg:grid-cols-[1fr_340px]"><div className="divide-y divide-border">

        {(settings.benefits || []).map((benefit, index) => (

  <div

    key={benefit.number}

    className="flex gap-4 p-5 md:p-6"

  >

    <span className="font-black text-primary">

      {benefit.number || `0${index + 1}`}

    </span>



    <div>

      <h3 className="font-bold">

        {benefit.title}

      </h3>



      <p className="mt-1 text-sm text-muted-foreground">

        {benefit.text}

      </p>

    </div>

  </div>

))}

        </div><div className="flex flex-col items-center justify-center bg-gold-soft p-8 text-center"><p className="text-xs font-bold uppercase text-muted-foreground">Your price</p><p className="mt-2 text-7xl font-black text-primary">{formatPrice(settings.programPrice)}</p><p className="mt-3 text-sm text-muted-foreground">One learning system. Everything you need to start.</p><JoinButton open={openRegistration} label="YES, I WANT TO START" className="mt-6"/></div></div></div></section>



      <section id="curriculum" className="section bg-muted"><div className="container-page">
  <SectionTitle
  eyebrow={settings.curriculumEyebrow}
  title={settings.curriculumTitle}
/>
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{(settings.courseModules || []).map((m, i) =><article key={m.title} className="feature-card">
  <p className="text-xs font-extrabold text-primary">
  MODULE {String(i + 1).padStart(2, "0")}
</p>

<h3 className="mt-3 font-extrabold">
  {m.title}
</h3>

<ul className="mt-4 space-y-2">
  {(m.topics || []).map((topic, topicIndex) => (
    <li
      key={`${topic}-${topicIndex}`}
      className="flex gap-2 text-sm text-muted-foreground"
    >
      <Check className="mt-0.5 text-success" />
      {topic}
    </li>
  ))}
</ul>
    </article>)}</div>
<p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground">
  {settings.curriculumDisclaimer}
</p>    <SectionCta

  open={openRegistration}

  label={settings.secondaryCta}

/></div></section>



      <section id="journey" className="section"><div className="container-page"><SectionTitle

  eyebrow={settings.journeyEyebrow}

  title={settings.journeyTitle}

/>



<div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-3 before:absolute before:left-0 before:right-0 before:top-7 before:hidden before:h-0.5 before:bg-primary/30 lg:before:block">

{(settings.journey || []).map((item, i) => (

  <article

    key={`${item.days}-${i}`}

    className="relative rounded-lg border border-border bg-card p-6 shadow-sm"

  >

    <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-black text-primary-foreground">

      {i + 1}

    </span>



    <p className="mt-5 text-xs font-bold uppercase text-success">

      {item.days}

    </p>



    <h3 className="mt-1 text-lg font-extrabold">

      {item.title}

    </h3>



    <p className="mt-2 text-sm leading-6 text-muted-foreground">

      {item.text}

    </p>

  </article>

))}

</div>

<p className="mt-8 text-center text-lg font-black text-primary">

  {settings.journeyBottomText}

</p>

<SectionCta

  open={openRegistration}

  label={settings.secondaryCta}

/></div>

</section>

      <section id="courses" className="section bg-mist-200">

  <div className="container-page">



    <SectionTitle

      eyebrow="Our Courses"

      title="Explore Our Courses"

      description="Choose the right learning program for your market journey."

    />



    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">



      {courses.length > 0 ? (

        courses.map((course) => (



          <article

            key={course._id}

            className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"

          >



            {/* SUB NAME */}

            <p className="text-xs font-bold uppercase tracking-wide text-primary">

              {course.subName}

            </p>



            {/* COURSE NAME */}

            <h3 className="mt-3 min-h-[52px] text-lg font-extrabold leading-6">

              {course.courseName}

            </h3>



            {/* DURATION */}

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-muted-foreground">

              <CalendarDays className="h-4 w-4 text-primary" />

              {course.duration}

            </div>



            {/* PRICE */}

            <div className="mt-4 border-t border-border pt-4">

              <p className="text-xs font-semibold uppercase text-muted-foreground">

                Course Price

              </p>



              <p className="mt-1 text-2xl font-black text-primary">

                {formatPrice(course.price)}

              </p>

            </div>



            {/* STATUS */}

            <div className="mt-4">

              <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-bold text-success">

                Active

              </span>

            </div>



          </article>



        ))

      ) : (

        <div className="col-span-full py-10 text-center text-muted-foreground">

          No courses available.

        </div>

      )}



    </div>



  </div>

</section>

      <section id="audience" className="section bg-muted"><div className="container-page"><SectionTitle eyebrow="Designed for learners" title="Who Is This Program For?"/><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{profiles.map(([Icon,title,text])=><article className="feature-card flex gap-4" key={title}><span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-success-soft text-success"><Icon/></span><div><h3 className="font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div></article>)}</div><SectionCta

  open={openRegistration}

  label={settings.secondaryCta}

/></div></section>

<section className="section">
  <div className="container-page">

    {/* SECTION TITLE */}
    <SectionTitle
      eyebrow="Wonder Lampe Academy"
      title="Why Learn With Wonder Lampe Academy?"
    />

    {/* ACADEMY STATISTICS */}
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {[
        ["5,000+", "Students Enrolled"],
        ["5000+", "Students Certified"],
        ["31+", "Global Teachers"],
        ["10+", "Courses"],
      ].map(([number, label]) => (
        <div
          key={label}
          className="border-l-2 border-primary px-5 py-3"
        >
          <p className="text-3xl font-black md:text-5xl">
            {number}
          </p>

          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            {label}
          </p>
        </div>
      ))}
    </div>

    {/* ACADEMY FEATURES */}
    <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {academyFeatures.map(([Icon, title, description]) => (
        <article
          key={title}
          className="feature-card"
        >
          <Icon className="text-primary" />

          <h3 className="mt-4 font-bold">
            {title}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        </article>
      ))}
    </div>

    {/* MENTOR QUALIFICATIONS - SAME SECTION */}
    <div className="mt-14 md:mt-16">

      {/* MENTOR HEADING */}
      <div className="mb-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">
          Mentor Credentials
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-tight md:text-3xl">
          Mentor Qualifications
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          Learn with a mentor with professional certifications
          and specialised knowledge across financial markets.
        </p>
      </div>

      {/* QUALIFICATION CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {[
          {
            organization: "NISM",
            qualification: "Research Analyst",
          },
          {
            organization: "NISM",
            qualification: "Equity Derivatives",
          },
          {
            organization: "AMFI (NISM)",
            qualification: "Mutual Fund Distributor",
          },
          {
            organization: "IRDAI",
            qualification: "LIC Agent",
          },
          {
            organization: "NPTEL · SWAYAM",
            qualification: "Business Forecasting",
          },
          {
            organization: "NPTEL · SWAYAM",
            qualification: "Commodity Derivatives & Risk Management",
          },
        ].map((item) => (
          <article
            key={`${item.organization}-${item.qualification}`}
            className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg md:p-6"
          >
            <div className="flex items-start gap-4">

              {/* ICON */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <GraduationCap size={24} />
              </div>

              {/* QUALIFICATION DETAILS */}
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  {item.organization}
                </p>

                <h3 className="mt-2 text-base font-bold leading-6 md:text-lg">
                  {item.qualification}
                </h3>
              </div>
            </div>

            {/* HOVER ACCENT */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </article>
        ))}

      </div>

      {/* MENTOR TAGLINE */}
      <div className="mt-7 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-6 md:px-8 md:py-7">
        <p className="text-center text-lg font-black tracking-tight md:text-2xl">
          Qualified. Experienced. Practical Market Knowledge.
        </p>

        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
          Build your understanding of the share market through
          structured learning and practical market concepts.
        </p>
      </div>

    </div>

    {/* EXISTING CTA */}
    <SectionCta
      open={openRegistration}
      label={settings.secondaryCta}
    />

  </div>
</section>




<section
  id="mentor"
  className="section relative overflow-hidden bg-gold-soft"
>
  <div className="container-page">

    {/* SECTION HEADER */}
    <div className="mx-auto mb-12 max-w-3xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SectionTitle
        eyebrow="Learn With Guidance"
        title="Meet Your Mentor"
        description="Learn from real market experience, practical insights, and a structured approach to stock market education."
      />
    </div>

    {/* MENTOR PROFILE */}
    <div
      className="group relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-premium transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-700"
    >
      <div className="h-1.5 w-full bg-primary" />

      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

        {/* LEFT: IMAGE */}
        <div className="p-5 sm:p-8 lg:p-10">
          <div className="relative mx-auto max-w-md">

            {/* EXPERIENCE BADGE */}
            <div className="absolute -right-2 -top-2 z-10 rounded-xl bg-primary px-4 py-3 text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-105 sm:-right-4 sm:-top-4">
              <p className="text-xl font-black">15+</p>
              <p className="text-[10px] font-bold uppercase tracking-wider">
                Years Experience
              </p>
            </div>

            {/* MENTOR PHOTO */}
            <div className="overflow-hidden rounded-2xl border border-primary/20">
              <img
                loading="lazy"
                src={siteConfig.mentor.image}
                alt="Dr. M. Madhankumar, Founder and CEO of Wonder Lampe Academy"
                className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            {/* IMAGE CAPTION */}
            <div className="relative -mt-24 rounded-b-2xl bg-gradient-to-t from-black/90 via-black/70 to-transparent p-5 pt-10 text-white sm:p-6 sm:pt-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                Founder &amp; CEO
              </p>

              <h3 className="mt-1 text-2xl font-black sm:text-3xl">
                Dr. M. Madhankumar
              </h3>

              <p className="mt-1 text-sm text-white/80">
                Wonder Lampe Academy
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-7 grid grid-cols-2 gap-3">

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="text-2xl font-black text-primary sm:text-3xl">
                2009
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Active Trader Since
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="text-2xl font-black text-primary sm:text-3xl">
                5,000+
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Students Mentored
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT: MENTOR DETAILS */}
        <div className="flex flex-col justify-center p-5 pt-2 sm:p-8 lg:p-10 lg:pl-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-4 motion-safe:duration-700">

          <span className="w-fit rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Market Educator &amp; Mentor
          </span>

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-4xl xl:text-5xl">
            Learn From Experience.
            <span className="mt-1 block text-primary">
              Understand The Market.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            {siteConfig.mentor.bio ||
              "With years of market experience, Dr. M. Madhankumar focuses on making stock market education simple, practical and actionable for learners."}
          </p>

          {/* CAREER JOURNEY */}
          <div className="mt-8">
            <h3 className="text-lg font-extrabold">
              Professional Journey
            </h3>

            <div className="mt-5 space-y-5">

              <div className="group/item flex gap-4 transition-transform duration-300 hover:translate-x-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-black text-primary transition-colors duration-300 group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                  09
                </div>

                <div>
                  <p className="font-bold">
                    Active Trader Since 2009
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Practical exposure to stock market movements and trading.
                  </p>
                </div>
              </div>

              <div className="group/item flex gap-4 transition-transform duration-300 hover:translate-x-1">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-black text-primary transition-colors duration-300 group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                  13
                </div>

                <div>
                  <p className="font-bold">
                    Trainer &amp; Mentor Since 2013
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Helping learners understand market concepts through structured education.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div className="mt-8">
            <h3 className="text-lg font-extrabold">
              Professional Certifications
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "NISM – Equity Derivatives",
                "NISM – Commodity Derivatives",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-semibold leading-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 sm:text-sm"
                >
                  <span className="mr-1 text-primary">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* EXPERTISE */}
          <div className="mt-8">
            <h3 className="text-lg font-extrabold">
              Areas of Expertise
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Trading & Technical Analysis",
                "Stock Market Research",
                "Algorithmic (Algo) Trading",
                "AI Trading Concepts",
              ].map((item) => (
                <div
                  key={item}
                  className="group/skill flex items-center gap-3 rounded-xl border border-border p-3 transition-all duration-300 hover:translate-x-1 hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary transition-all duration-300 group-hover/skill:bg-primary group-hover/skill:text-primary-foreground">
                    ✓
                  </span>

                  <span className="text-sm font-semibold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* LEARNING APPROACH */}
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-md sm:p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              The Learning Approach
            </p>

            <h3 className="mt-2 text-lg font-black sm:text-xl">
              Simple. Practical. Actionable.
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Understand market fundamentals, technical analysis,
              research methods and risk awareness through a structured
              learning experience.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <JoinButton
              open={openRegistration}
              label="LEARN WITH WONDER LAMPE"
              className="w-full transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
            />

            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Educational content only. Trading involves market risk.
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>





            <section id="certificates" className="section">
        <div className="container-page">
          <SectionTitle
            eyebrow={settings.certificatesEyebrow}
            title={settings.certificatesTitle}
            description={settings.certificatesDescription}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(Array.isArray(settings.certificates) ? settings.certificates : []).length > 0
  ? (Array.isArray(settings.certificates) ? settings.certificates : []).map((certificate, index) => (
              <figure key={`${certificate.image}-${index}`} className="certificate-frame overflow-hidden rounded-lg border border-border bg-card p-3 shadow-premium">
                {certificate.image ? (
                  <img loading="lazy" src={certificate.image} alt={certificate.alt || certificate.title || "Certificate"} className="aspect-[4/3] w-full rounded-md object-contain" />
                ) : (
                  <div className="grid aspect-[4/3] place-items-center rounded-md bg-gold-soft p-6 text-center"><GraduationCap className="mx-auto h-10 w-10 text-primary" /><p className="mt-3 text-sm font-semibold">Certificate image not added</p></div>
                )}
                <figcaption className="px-2 pb-1 pt-4 text-center text-sm font-bold">{certificate.title}</figcaption>
              </figure>
            )) : [1, 2, 3].map((item) => (
              <div key={item} className="certificate-frame grid aspect-[4/3] place-items-center rounded-lg border border-dashed border-primary/40 bg-gold-soft p-6 text-center"><div><GraduationCap className="mx-auto h-10 w-10 text-primary" /><p className="mt-4 font-bold">Certificate image coming soon</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="section bg-muted">
        <div className="container-page">
          <SectionTitle eyebrow={settings.reviewsEyebrow} title={settings.reviewsTitle} description={settings.reviewsDescription} />
          <div className="grid gap-4 md:grid-cols-3">
        {(Array.isArray(settings.reviews) ? settings.reviews : []).length > 0
  ? (Array.isArray(settings.reviews) ? settings.reviews : []).map((review, index) => (
          <article key={`${review.name}-${index}`} className="feature-card">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-primary"><Users /></div>
                <div className="mt-4 flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((star) => <span key={star} className={star <= review.rating ? "text-amber-500" : "text-muted-foreground/30"}>★</span>)}
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">“{review.text}”</p>
                <p className="mt-5 font-bold">{review.name}</p>
                {review.course && <p className="mt-1 text-xs text-muted-foreground">{review.course}</p>}
                {review.verified && <p className="mt-2 text-xs font-bold text-primary"><ShieldCheck className="mr-1 inline h-3.5 w-3.5" />Verified student review</p>}
              </article>
            )) : [1, 2, 3].map((item) => (
              <article key={item} className="feature-card"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-primary"><Users /></div><p className="mt-5 text-xs font-bold uppercase text-primary">Student review placeholder</p><p className="mt-3 text-sm leading-6 text-muted-foreground">A space for a genuine Wonder Lampe Academy student review.</p></article>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <p className="font-bold">Follow Wonder Lampe Academy</p>
            <Button asChild variant="outline"><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><Instagram /> Instagram</a></Button>
            <Button asChild variant="outline"><a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer"><Facebook /> Facebook</a></Button>
          </div>
          <SectionCta open={openRegistration} label={settings.secondaryCta} />
        </div>
      </section>

<section className="section">

  <div className="container-page">

    <SectionTitle

      eyebrow="Simple enrollment"

      title="How It Works"

    />



    <div className="grid gap-4 md:grid-cols-4">

      {[

        [

          "Register",

          `Click any ${formatPrice(settings.programPrice)} button and enter your details.`,

        ],

        [

          "Complete Payment",

          "Use the secure payment link when available.",

        ],

        [

          "Get Access",

          "Receive your program access and learning details.",

        ],

        [

          "Start Learning",

          "Begin your classes, live training and resources.",

        ],

      ].map(([title, text], i) => (

        <article key={title} className="feature-card">

          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-black text-primary-foreground">

            {i + 1}

          </span>



          <h3 className="mt-5 font-extrabold">

            {title}

          </h3>



          <p className="mt-2 text-sm leading-6 text-muted-foreground">

            {text}

          </p>

        </article>

      ))}

    </div>

  </div>

</section>

    <section id="faq" className="section bg-muted">

  <div className="container-page">

    <SectionTitle

      eyebrow="Clear answers"

      title="Frequently Asked Questions"

    />



    <Accordion

      type="single"

      collapsible

      className="mx-auto max-w-3xl rounded-xl border border-border bg-card px-5 shadow-sm"

    >

      {getFaqs(settings.programPrice).map(([q, a], i) => (

        <AccordionItem

          key={q}

          value={`faq-${i}`}

        >

          <AccordionTrigger className="py-5 text-base font-bold hover:no-underline">

            {q}

          </AccordionTrigger>



          <AccordionContent className="pb-5 leading-6 text-muted-foreground">

            {a}

          </AccordionContent>

        </AccordionItem>

      ))}

    </Accordion>



    <SectionCta

      open={openRegistration}

      label={settings.secondaryCta}

    />

  </div>

</section>



      <section className="section  bg-[#FFF8E7]"><div className="container-page text-center"><p className="eyebrow">Begin your learning journey</p><h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black md:text-5xl">Start Your Share Market Learning Journey Today.</h2><p className="mx-auto mt-5 max-w-2xl text-muted-foreground">Learn the fundamentals. Understand the market. Build your knowledge with a structured learning system.</p><p className="mt-5 text-7xl font-black text-primary">{formatPrice(settings.programPrice)}</p><p className="mx-auto mt-4 max-w-3xl text-sm font-semibold">Recorded Classes + 21 Days Live Training + Study Materials + AI Stock & Portfolio Access + Premium Community</p><JoinButton open={openRegistration} label={`START LEARNING FOR ${formatPrice(settings.programPrice)}`} className="mt-8"/></div></section>



      <section id="register" className="section"><div className="container-page"><div className="mx-auto max-w-4xl rounded-xl border border-border bg-foreground p-7 text-background shadow-premium md:p-12"><div className="grid items-center gap-8 md:grid-cols-[1fr_auto]"><div><p className="text-xs font-bold uppercase text-primary">{formatPrice(settings.programPrice)} Special Learning Program</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Ready to build your market knowledge?</h2><p className="mt-4 text-sm leading-6 text-background/70">Register now to continue to the payment step. No payment is taken until a secure payment link is available.</p></div><JoinButton open={openRegistration} label={`REGISTER FOR ${formatPrice(settings.programPrice)}`}/></div></div></div></section>



      <section className="border-t w-full border-border bg-muted py-10"><div className="container-page"><h2 className="text-lg font-extrabold">Disclaimer</h2><p className="mt-3  text-xs leading-6 text-muted-foreground">This program is intended for educational purposes only. Stock market investments and trading involve market risks. Past performance does not guarantee future results. Wonder Lampe Academy does not guarantee profits or returns from participation in the program.</p></div></section>

    </main>



 <footer className="w-full max-w-none bg-secondary py-10">
  <div className="mx-auto grid w-full max-w-none gap-8 px-4 md:grid-cols-[1.2fr_1fr_1fr] md:px-10 lg:px-16">
    <div className="flex items-center gap-4">
      <img
        src={siteConfig.logo}
        alt="Wonder Lampe Academy logo"
        className="h-20 w-20 shrink-0 object-contain"
      />
      <div>
        <p className="font-black">WONDER LAMPE</p>
        <p className="text-sm text-muted-foreground">
          Financial Empowerment Academy
        </p>
      </div>
    </div>

    <div>
      <p className="font-bold">Contact</p>
      <p className="mt-3 text-sm text-muted-foreground">
        {siteConfig.office}
      </p>
      <a
        className="mt-2 block text-sm font-semibold"
        href={`tel:${siteConfig.phone}`}
      >
        {siteConfig.phone}
      </a>
    </div>

    <div>
      <p className="font-bold">Connect</p>
      <div className="mt-3 flex gap-3">
        <a
          aria-label="Instagram"
          href={siteConfig.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <Instagram />
        </a>
        <a
          aria-label="Facebook"
          href={siteConfig.facebookUrl}
          target="_blank"
          rel="noreferrer"
          className="social-link"
        >
          <Facebook />
        </a>
      </div>

      <a
        href="https://wonderlampe.com"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-sm font-semibold underline underline-offset-4 hover:text-primary"
      >
        www.wonderlampe.com
      </a>
    </div>
  </div>

  <div className="mt-8 flex w-full flex-col items-start justify-between gap-3 border-t border-border px-4 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center md:px-10 lg:px-16">
    <p>
      © 2026 Wonder Lampe Academy. Educational program only.
    </p>

    <p>
      Developed by{" "}
      <a
        href="https://asquaresolutionstech.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-foreground transition-colors hover:text-primary"
      >
        A Square Solutions
      </a>
    </p>
  </div>
</footer>


    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/30 bg-card p-3 shadow-[0_-8px_30px_color-mix(in_oklab,var(--foreground)_12%,transparent)] md:hidden"><Button onClick={openRegistration} className="h-12 w-full bg-primary font-black text-primary-foreground">{formatPrice(settings.programPrice)} — START LEARNING <ArrowRight/></Button></div>

          <RegistrationDialog

        open={dialogOpen}

        onOpenChange={setDialogOpen}

        settings={settings}

      />



  </div>;

}
