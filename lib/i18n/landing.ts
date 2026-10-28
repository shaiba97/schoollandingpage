// Bilingual copy for the landing page. Every visible string lives here so
// the client component stays layout-only: `t` decides text, `dir` decides
// orientation, and nothing depends on translating inside JSX.

export type LandingLocale = "en" | "ar";

const en = {
  brandName: "Madar",
  tagline: "Multi-tenant School ERP",
  nav: [
    { label: "Features", href: "#hero" },
    { label: "Portals", href: "#portals" },
    { label: "Pricing", href: "#pricing" },
    { label: "Why Us", href: "#why" },
    { label: "Contact", href: "#contact" },
  ],
  langToggleLabel: "العربية",
  langToggleAria: "Switch to Arabic",
  requestDemo: "Request Demo",
  hero: {
    badge: "Bilingual, built for Sudan, Egypt & the GCC",
    titleStart: "The Next-Generation Multi-Tenant ERP Suite for",
    titleHighlight: "Modern Schools",
    sub: "Centralized tenant governance, Gulf-region compliance, real-time examination center wizards, automated financial ledgers, and role-gated access for every stakeholder.",
    primaryCta: "View Pricing Plans",
    secondaryCta: "Explore the Portals",
    mockUrl: "admin.madar.example / dashboard",
    metrics: [
      { label: "Collections", value: "SAR 406k", delta: "+12.4% MoM" },
      { label: "Active exams", value: "42", delta: "8 grading now" },
      { label: "Teaching staff", value: "98", delta: "96% present" },
    ],
    caption: "Admin Dashboard & Examination Results Matrix preview",
    stats: [
      { label: "Schools onboarded", value: "500+" },
      { label: "Regions served", value: "Sudan · Egypt · GCC" },
      { label: "Role-gated portals", value: "7" },
    ],
  },
  portals: {
    eyebrow: "What's included",
    title: "One platform. Every portal your school needs.",
    description:
      "A complete ecosystem of role-gated portals and administrative tools, unified under multi-tenant isolation.",
    cards: [
      {
        name: "Administrative Workspace",
        description:
          "Where school leadership governs daily operations, staff, and subscription settings.",
      },
      {
        name: "Academic & Examination Affairs",
        description:
          "Everything a school needs to plan classes and run examinations end to end.",
      },
      {
        name: "Financial & Fee Management",
        description:
          "A transparent home for tuition, payments, and operational finance.",
      },
      {
        name: "Teacher & Faculty Portal",
        description:
          "A dedicated workspace for teachers to manage classes and day-to-day duties.",
      },
      {
        name: "Student & Parent Workspace",
        description:
          "A family workspace to follow academic progress and school life.",
      },
      {
        name: "Transport & Fleet Management",
        description:
          "Coordination of routes, vehicles, and student transportation, day to day.",
      },
      {
        name: "Receptionist & Front Desk",
        description:
          "The front-office home for visitors, gate passes, and admissions inquiries.",
      },
    ],
  },
  pricing: {
    eyebrow: "Transparent pricing",
    title: "Flat yearly plans. No hidden fees.",
    description:
      "Every tier shows the flat yearly commitment plus the system-calculated monthly equivalent — full transparency, always.",
    yearly: "Yearly",
    monthly: "Monthly",
    perYear: "/ year",
    perMonth: "/ mo",
    equivalent: "Equivalent to",
    billedAnnually: "billed annually",
    billedMonthly: "billed monthly",
    popular: "Most popular",
    selectPlan: "Select Plan",
  },
  why: {
    eyebrow: "Why us",
    title: "Engineered for the region, built for classroom reality.",
    description:
      "Enterprise-grade architecture with first-class localization for schools across Sudan, Egypt, and the GCC.",
    items: [
      {
        name: "Native Bilingual Support",
        description:
          "One system in two directions: full Arabic RTL and English LTR across every portal, record, and printed transcript.",
      },
      {
        name: "Regional Currency & Fees",
        description:
          "Fee structures and payment flows aligned with Sudan, Egypt, and the Gulf — installment plans, registration fees, and localized billing practice.",
      },
      {
        name: "Local Academic & Exam Compliance",
        description:
          "Grading scales, examination standards, and transcript formats shaped to national ministry requirements across the regions we serve.",
      },
      {
        name: "Strict Multi-Tenant Isolation",
        description:
          "Database-level and dynamic access-tier protection ensure every school's data lives in its own walled garden.",
      },
    ],
  },
  contact: {
    eyebrow: "Get in touch",
    title: "Talk to our school success team.",
    description:
      "Onboarding, data migration, plan selection — we respond within one business day.",
    fullName: "Full Name",
    fullNamePh: "Jane Al-Rashid",
    schoolName: "School Name",
    schoolNamePh: "Riyadh International Academy",
    email: "Email Address",
    emailPh: "jane@school.edu.sa",
    phone: "Phone Number / WhatsApp",
    phonePh: "+249 512 345 678",
    region: "Target Region",
    message: "Message / Request Details",
    messagePh: "Tell us about your institution and what you need…",
    submit: "Submit Inquiry",
    submitting: "Submitting…",
    errors: {
      fullName: "Full name is required",
      schoolName: "School name is required",
      email: "Email address is required",
      emailFormat: "Enter a valid email",
      phone: "Phone or WhatsApp number is required",
      phoneFormat: "Enter digits with an optional country code, e.g. +249…",
      region: "Select your target region",
      message: "Tell us a bit more (10+ characters)",
      generic:
        "We could not submit your request just now. Please try again or email us directly.",
    },
    toasts: {
      successTitle: "Inquiry received",
      successDescription: "Our team will contact you within one working day.",
      errorTitle: "Submission failed",
      errorDescription: "Something went wrong on our side. Please try again in a moment.",
    },
    thanksTitle: "Inquiry received",
    thanksLead: (name: string, email: string) =>
      `Thank you, ${name}. We will reach you at ${email} shortly.`,
    sendAnother: "Send another inquiry",
    helplineLabel: "Emergency helpline",
    helplineValue: "+966 800 123 4567",
    supportLabel: "Support email",
    supportValue: "support@madar.example",
    regionCardTitle: "Region-ready deployment",
    regionCardBody:
      "Localized fee rules, bilingual records, and enrollment journeys for schools in Sudan, Egypt, and the GCC (KSA, UAE, Qatar, Kuwait, Oman, Bahrain) out of the box.",
  },
  footer: {
    blurb:
      "Unified administration, examinations, finance, and transport for schools across Sudan, Egypt, and the GCC — bilingual by design.",
    columns: [
      { title: "Platform", items: ["Features", "Portals", "Pricing", "Why Us"] },
      {
        title: "Legal",
        items: ["Terms of Service", "Privacy Policy", "Cookie Policy", "License"],
      },
    ],
    copyright: (year: number | null) =>
      `© ${year ?? ""} Madar. All rights reserved.`,
    status: "All Systems Operational",
  },
};

type Messages = typeof en;

const ar: Messages = {
  brandName: "مدار",
  tagline: "نظام متعدد المنشآت لإدارة المدارس",
  nav: [
    { label: "المميزات", href: "#hero" },
    { label: "البوابات", href: "#portals" },
    { label: "الأسعار", href: "#pricing" },
    { label: "لماذا نحن", href: "#why" },
    { label: "تواصل معنا", href: "#contact" },
  ],
  langToggleLabel: "English",
  langToggleAria: "التبديل إلى الإنجليزية",
  requestDemo: "طلب تجربة",
  hero: {
    badge: "ثنائي اللغة، مبني للسودان ومصر ودول الخليج",
    titleStart: "النظام المتكامل والأحدث",
    titleHighlight: "لإدارة المدارس متعددة المنشآت",
    sub: "إدارة مركزية شاملة، توافق إقليمي للخليج العربي، مراكز امتحانات تفاعلية، دفاتر مالية مؤتمنة، وصلاحيات مخصصة لكل مستخدم.",
    primaryCta: "استعرض خطط الأسعار",
    secondaryCta: "استكشف البوابات",
    mockUrl: "admin.madar.example / dashboard",
    metrics: [
      { label: "التحصيلات", value: "376,545 USD", delta: "+12.4% شهرياً" },
      { label: "الامتحانات الجارية", value: "42", delta: "8 قيد التصحيح" },
      { label: "الهيئة التدريسية", value: "98", delta: "الانضباط 96%" },
    ],
    caption: "معاينة لوحة الإدارة ومصفوفة نتائج الامتحانات",
    stats: [
      { label: "مدارس مشتركة", value: "+500" },
      { label: "المناطق المخدومة", value: "السودان · مصر · الخليج" },
      { label: "بوابات بدور ومسؤوليات", value: "7" },
    ],
  },
  portals: {
    eyebrow: "ماذا تتضمن",
    title: "منصة واحدة. كل بوابات مدرستك.",
    description: "منظومة كاملة من البوابات وأدوات الإدارة بأدوار محكمة، موحدة تحت عزل متعدد المنشآت.",
    cards: [
      {
        name: "بوابة الإدارة العامة",
        description: "حيث تدير إدارة المدرسة أعمالها اليومية وكوادرها وإعدادات الاشتراك.",
      },
      {
        name: "بوابة الشؤون الأكاديمية والامتحانات",
        description: "كل ما تحتاجه المدرسة لتخطيط الصفوف وإدارة الامتحانات من البداية إلى النهاية.",
      },
      {
        name: "الشؤون المالية والرسوم",
        description: "مكان شفاف لإدارة الرسوم والمدفوعات والشؤون التشغيلية المالية.",
      },
      {
        name: "بوابة المعلمين",
        description: "مساحة مخصصة للمعلمين لإدارة الصفوف ومهامهم اليومية.",
      },
      {
        name: "بوابات الطلاب وأولياء الأمور",
        description: "مساحة للأسر لمتابعة التقدم الدراسي والحياة المدرسية.",
      },
      {
        name: "بوابة النقل والمواصلات",
        description: "تنسيق المسارات والمركبات ونقل الطلاب، يوماً بيوم.",
      },
      {
        name: "بوابة الاستقبال",
        description: "واجهة الاستقبال للزوار وتصاريح الدخول واستفسارات القبول.",
      },
    ],
  },
  pricing: {
    eyebrow: "أسعار واضحة",
    title: "خطط سنوية ثابتة. بدون رسوم خفية.",
    description:
      "كل خطة تعرض المبلغ السنوي الثابت وما يعادله شهرياً كما يحسبه النظام — شفافية كاملة دائماً.",
    yearly: "سنوياً",
    monthly: "شهرياً",
    perYear: "/ سنوياً",
    perMonth: "/ شهرياً",
    equivalent: "ما يعادل",
    billedAnnually: "يُدفع سنوياً",
    billedMonthly: "يُدفع شهرياً",
    popular: "الأكثر طلباً",
    selectPlan: "اختر الخطة",
  },
  why: {
    eyebrow: "لماذا نحن",
    title: "مصمم للمنطقة، ومبني لواقع الفصل.",
    description:
      "بنية مؤسسية عالية الجودة مع عربية وإنجليزية أولاً للمدارس عبر السودان ومصر والخليج.",
    items: [
      {
        name: "دعم ثنائي اللغة أصيل",
        description:
          "نظام واحد باتجاهين: عربي كامل (RTL) وإنجليزي كامل (LTR) في كل البوابات والسجلات والكشوف المطبوعة.",
      },
      {
        name: "عملة ورسوم إقليمية",
        description:
          "هياكل رسوم ومسارات دفع متوافقة مع السودان ومصر والخليج — خطط تقسيط ورسوم اشتراك ومعاملات محلية.",
      },
      {
        name: "امتثال أكاديمي وامتحاني محلي",
        description:
          "مقاييس التنقيط ومعايير الامتحانات وصيغ الشهادات مطابقة لأنظمة الوزارات في المناطق التي نخدمها.",
      },
      {
        name: "عزل صارم متعدد المنشآت",
        description:
          "حماية على مستوى قاعدة البيانات وشرائح وصول ديناميكية تضمن أن بيانات كل مدرسة في حصنها الخاص.",
      },
    ],
  },
  contact: {
    eyebrow: "تواصل معنا",
    title: "تواصل مع فريق نجاح المدارس.",
    description: "إنشاء البيانات، ترحيل السجلات، اختيار الخطة — نرد خلال يوم عمل واحد.",
    fullName: "الاسم الكامل",
    fullNamePh: "جين الرشيد",
    schoolName: "اسم المدرسة",
    schoolNamePh: "أكاديمية الرياض الدولية",
    email: "البريد الإلكتروني للمدرسة",
    emailPh: "jane@school.edu.sa",
    phone: "رقم الهاتف / واتساب",
    phonePh: "+249 512 345 678",
    region: "المنطقة المستهدفة",
    message: "الرسالة / تفاصيل الطلب",
    messagePh: "أخبرنا عن مؤسستك وما تحتاجه…",
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال…",
    errors: {
      fullName: "الاسم الكامل مطلوب",
      schoolName: "اسم المدرسة مطلوب",
      email: "البريد الإلكتروني مطلوب",
      emailFormat: "أدخل بريداً إلكترونياً صالحاً",
      phone: "رقم الهاتف أو واتساب مطلوب",
      phoneFormat: "أدخل رقماً مع مفتاح الدولة عند الحاجة، مثل +249…",
      region: "اختر المنطقة المستهدفة",
      message: "أضف تفاصيل أكثر (10 أحرف على الأقل)",
      generic: "لم نتمكن من إرسال طلبك الآن. حاول مجدداً أو راسلنا مباشرة.",
    },
    toasts: {
      successTitle: "تم استلام طلبك",
      successDescription: "سيتواصل معك فريقنا خلال يوم عمل واحد.",
      errorTitle: "تعذر الإرسال",
      errorDescription: "حدث خطأ من جهتنا. حاول مرة أخرى بعد قليل.",
    },
    thanksTitle: "تم استلام طلبك",
    thanksLead: (name: string, email: string) =>
      `شكراً ${name}، سنتواصل معك على ${email} قريباً.`,
    sendAnother: "إرسال طلب آخر",
    helplineLabel: "الخط الساخن للطوارئ",
    helplineValue: "+966 800 123 4567",
    supportLabel: "البريد الإلكتروني للدعم",
    supportValue: "support@madar.example",
    regionCardTitle: "جاهز للمنطقة منذ اليوم الأول",
    regionCardBody:
      "قواعد رسوم محلية، سجلات ثنائية اللغة، ورحلات تسجيل مخصصة للمدارس في السودان ومصر ودول الخليج (السعودية، الإمارات، قطر، الكويت، عُمان، البحرين) بدون إضافات.",
  },
  footer: {
    blurb:
      "إدارة وامتحانات ومالية ونقل بشكل موحد للمدارس عبر السودان ومصر والخليج — ثنائية اللغة بالتصميم.",
    columns: [
      { title: "المنصة", items: ["المميزات", "البوابات", "الأسعار", "لماذا نحن"] },
      {
        title: "الشؤون القانونية",
        items: ["شروط الخدمة", "سياسة الخصوصية", "سياسة الملفات", "اتفاقية الترخيص"],
      },
    ],
    copyright: (year: number | null) => `جميع الحقوق محفوظة. مدار © ${year ?? ""}`,
    status: "جميع الأنظمة تعمل",
  },
};

export const MESSAGES: Record<LandingLocale, Messages> = { en, ar };

/** Target-region values + per-locale labels for the inquiry form select. */
export const REGIONS: Array<{ value: string; en: string; ar: string }> = [
  { value: "", en: "Select a region", ar: "اختر المنطقة" },
  { value: "SUDAN", en: "Sudan", ar: "السودان" },
  { value: "EGYPT", en: "Egypt", ar: "مصر" },
  { value: "GCC_KSA", en: "KSA (Saudi Arabia)", ar: "السعودية" },
  { value: "GCC_UAE", en: "UAE (United Arab Emirates)", ar: "الإمارات" },
  { value: "GCC_KUWAIT", en: "Kuwait", ar: "الكويت" },
  { value: "GCC_QATAR", en: "Qatar", ar: "قطر" },
  { value: "GCC_OMAN", en: "Oman", ar: "عُمان" },
  { value: "GCC_BAHRAIN", en: "Bahrain", ar: "البحرين" },
];

/**
 * Arabic tier display names, keyed by the English display name after the
 * redundant "Plan" suffix is stripped. Unknown names fall back to English.
 */
export const AR_TIER_NAMES: Record<string, string> = {
  Primary: "الأساسي",
  Intermediate: "المتوسط",
  Advanced: "المتقدم",
  Customized: "مخصص",
};

/**
 * Arabic checklist labels for the pricing cards. Keys are the exact English
 * labels the backend's public pricing catalogue emits (PORTAL_MODULE_LABELS
 * and FEATURE_LABELS); unknown labels stay English rather than blanking out.
 */
export const AR_CHECKLIST_LABELS: Record<string, string> = {
  "Central Admin Portal": "بوابة الإدارة المركزية",
  "Academic & Examination Center": "مركز الشؤون الأكاديمية والامتحانات",
  "Financial & Student Payments": "الشؤون المالية ومدفوعات الطلاب",
  "Teacher Portal": "بوابة المعلمين",
  "Parent Portal": "بوابة أولياء الأمور",
  "Student Portal": "بوابة الطلاب",
  "Transport & Fleet Management": "إدارة النقل والمواصلات",
  "Receptionist Portal": "بوابة الاستقبال",
  "Standard attendance": "الحضور اليومي",
  Timetable: "الجدول الدراسي",
  Examinations: "الامتحانات",
  "Basic report cards": "كشوف النتائج الأساسية",
  "Guardian web & mobile portal": "بوابة أولياء الأمور (ويب وجوال)",
  "WhatsApp attendance triggers": "تنبيهات الحضور عبر واتساب",
  "SMS attendance triggers": "تنبيهات الحضور عبر الرسائل النصية",
  "Financial installments": "تقسيط الرسوم المالية",
  Payroll: "كشوف الرواتب",
  "Real-time bus tracking": "تتبع الحافلات مباشرة",
  "ZATCA / GCC tax receipts": "الفواتير الضريبية (ZATCA / الخليج)",
  "Bespoke portal configuration": "تهيئة مخصصة للبوابات",
  "Custom database isolation": "عزل مخصص لقاعدة البيانات",
  "Dedicated SLA": "اتفاقية مستوى خدمة مخصصة",
};
