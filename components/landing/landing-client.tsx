"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  GraduationCap,
  Banknote,
  Wallet,
  Truck,
  Users,
  Languages,
  ShieldCheck,
  School,
  Mail,
  Phone,
  ChevronRight,
  ArrowRight,
  X,
  Menu,
  Lock,
  CheckCircle2,
  Loader2,
  Globe,
  MessageCircle,
} from "lucide-react";
import { cn } from "cn";
import { Toaster, toast } from "@/components/ui/toast";
import { DirectionProvider } from "@/components/ui/direction";
import { LandingLocaleProvider, useLandingLocale } from "@/components/landing/locale";
import type { PublicSupportContact } from "@/lib/contacts-fetch";
import {
  AR_CHECKLIST_LABELS,
  AR_TIER_NAMES,
  REGIONS,
  type LandingLocale,
} from "@/lib/i18n/landing";
import { priceLabel, tierDisplayName, type PricingTier } from "@/lib/pricing";

// WhatsApp and mailto targets stay LTR and ASCII no matter the page
// direction: wa.me wants digits only (no plus, no spaces).
function waHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

function mailtoHref(email: string): string {
  return `mailto:${email.trim()}`;
}

function pickContacts(
  contacts: PublicSupportContact[],
  region: string,
): { phone?: PublicSupportContact; email?: PublicSupportContact } {
  const scoped = region
    ? contacts.filter((c) => c.region === region)
    : contacts;
  // Fall back to the whole directory when the picked region has none.
  const pool = scoped.length > 0 ? scoped : contacts;
  return {
    phone: pool.find((c) => c.contactType === "PHONE"),
    email: pool.find((c) => c.contactType === "EMAIL"),
  };
}

function Logo({ tagline }: { tagline?: boolean }) {
  const { t, dir } = useLandingLocale();
  return (
    <div className="flex items-center gap-2.5">
      <div className="rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <School className="size-5 text-white" aria-hidden />
        </div>
      </div>
      <div className="leading-tight">
        <div
          // The wordmark keeps a fixed direction so the mixed
          // Latin/Arabic brand reads the same wherever it appears.
          dir={dir === "rtl" ? "rtl" : "ltr"}
          className={cn(
            "text-lg font-bold tracking-tight text-foreground",
            dir === "rtl" && "tracking-normal",
          )}
        >
          {t.brandName}
        </div>
        {tagline && (
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t.tagline}
          </div>
        )}
      </div>
    </div>
  );
}

const PRIMARY_CTA = "bg-primary text-primary-foreground hover:bg-primary/90";

function LanguageToggle({ full }: { full?: boolean }) {
  const { locale, setLocale, t } = useLandingLocale();
  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "en" ? "ar" : "en")}
      aria-label={t.langToggleAria}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border bg-background font-medium transition-colors hover:bg-muted",
        full ? "h-10 w-full justify-center px-4 text-sm" : "h-9 px-2.5 text-xs sm:text-sm",
      )}
    >
      <Globe className="size-4" aria-hidden />
      {t.langToggleLabel}
    </button>
  );
}

function Navbar() {
  const { t } = useLandingLocale();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all",
        scrolled ? "border-border bg-white shadow-sm" : "border-transparent bg-white",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="#hero" aria-label={`${t.brandName} home`}>
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Main navigation">
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/70 transition-colors hover:text-emerald-600"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <a
            href="#contact"
            className={cn(
              "hidden h-9 items-center rounded-lg px-4 text-sm font-semibold transition-colors md:inline-flex",
              PRIMARY_CTA,
            )}
          >
            {t.requestDemo}
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background md:hidden"
          >
            <Menu className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 end-0 flex w-4/5 max-w-xs flex-col gap-1 overflow-y-auto border-s border-border bg-background p-4 shadow-md">
            <div className="mb-2 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted"
              >
                {link.label}
                <ChevronRight className="size-4 text-muted-foreground rtl:rotate-180" aria-hidden />
              </a>
            ))}
            <div className="mt-3 space-y-2 border-t border-border pt-3">
              <LanguageToggle full />
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-10 items-center justify-center rounded-lg text-sm font-semibold",
                  PRIMARY_CTA,
                )}
              >
                {t.requestDemo}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
      <p className="mt-4 text-lg text-muted-foreground">{description}</p>
    </div>
  );
}

function Hero() {
  const { t } = useLandingLocale();
  const bars = [45, 70, 55, 90, 65, 80, 100];

  return (
    <section id="hero" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pt-20 pb-24 md:px-6 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Languages className="size-3.5" aria-hidden />
            {t.hero.badge}
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance md:text-6xl">
            {t.hero.titleStart}{" "}
            <span className="text-emerald-600">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-balance text-muted-foreground md:text-xl">
            {t.hero.sub}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#pricing"
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-sm font-semibold transition-colors",
                PRIMARY_CTA,
              )}
            >
              {t.hero.primaryCta}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </a>
            <a
              href="#portals"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-sm font-semibold transition-colors hover:bg-muted"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            <div className="flex items-center gap-2 border-b border-slate-200 bg-muted px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span dir="ltr" className="ms-3 font-mono text-[10px] text-muted-foreground">
                {t.hero.mockUrl}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 p-4">
              {t.hero.metrics.map((m) => (
                <div key={m.label} className="rounded-lg border border-slate-200 bg-card p-3">
                  <div className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                    {m.label}
                  </div>
                  <div className="mt-1 text-lg font-bold md:text-xl">{m.value}</div>
                  <div className="mt-0.5 text-[10px] font-medium text-emerald-600">{m.delta}</div>
                </div>
              ))}
            </div>
            <div className="px-4 pb-4">
              <div className="flex h-28 items-end gap-1.5 rounded-xl border border-slate-200 bg-muted p-3">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={cn(
                      "w-full rounded-sm",
                      i === 3 ? "bg-emerald-600" : "bg-emerald-200",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">{t.hero.caption}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-slate-200 pt-8">
          {t.hero.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg font-bold md:text-2xl">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Portal card icons. Names and descriptions come from the dictionary so
// each locale gets its own card set; this row is layout structure only.
const PORTAL_ICONS: LucideIcon[] = [
  LayoutDashboard,
  GraduationCap,
  Banknote,
  Wallet,
  Users,
  Truck,
  Phone,
];

function Portals() {
  const { t } = useLandingLocale();
  return (
    <section id="portals" className="bg-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 md:px-6">
        <SectionHeading
          eyebrow={t.portals.eyebrow}
          title={t.portals.title}
          description={t.portals.description}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.portals.cards.map((portal, index) => {
            const Icon = PORTAL_ICONS[index] ?? LayoutDashboard;
            return (
              <div
                key={portal.name}
                className="group rounded-xl border border-slate-200 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="font-semibold leading-snug">{portal.name}</h3>
                  </div>
                  <ArrowRight
                    className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-emerald-600 group-hover:opacity-100 rtl:rotate-180 group-hover:rtl:-translate-x-0.5"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {portal.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function localChecklistLabel(label: string, locale: LandingLocale): string {
  if (locale !== "ar") return label;
  return AR_CHECKLIST_LABELS[label] ?? label;
}

function localTierName(name: string, locale: LandingLocale): string {
  const display = tierDisplayName(name);
  if (locale !== "ar") return display;
  return AR_TIER_NAMES[display] ?? display;
}

function Pricing({ tiers }: { tiers: PricingTier[] }) {
  const { t, locale } = useLandingLocale();
  const [yearly, setYearly] = React.useState(true);
  const visible = tiers.filter((tier) => !tier.isQuoteBased);
  const popularCode = visible.some((tier) => tier.code === "INTERMEDIATE")
    ? "INTERMEDIATE"
    : (visible[1]?.code ?? visible[0]?.code ?? "");

  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 md:px-6">
        <SectionHeading
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          description={t.pricing.description}
        />

        <div className="mx-auto mb-12 flex w-fit items-center gap-1 rounded-xl border border-slate-200 bg-muted p-1">
          <button
            type="button"
            onClick={() => setYearly(true)}
            aria-pressed={yearly}
            className={cn(
              "rounded-lg px-6 py-2 text-sm font-medium transition-all",
              yearly
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.pricing.yearly}
          </button>
          <button
            type="button"
            onClick={() => setYearly(false)}
            aria-pressed={!yearly}
            className={cn(
              "rounded-lg px-6 py-2 text-sm font-medium transition-all",
              !yearly
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.pricing.monthly}
          </button>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {visible.map((tier) => {
            const popular = tier.code === popularCode;
            const displayName = localTierName(tier.name, locale);
            return (
              <div
                key={tier.code}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-xl bg-card p-6 transition-all",
                  popular
                    ? "border border-emerald-600 shadow-md md:-translate-y-2"
                    : "border border-slate-200 shadow-sm hover:shadow-md",
                )}
              >
                {popular && (
                  <span className="absolute top-0 end-6 rounded-b-md bg-emerald-600 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                    {t.pricing.popular}
                  </span>
                )}
                <h3 className="text-lg font-semibold">{displayName}</h3>
                {tier.target && (
                  <p
                    className={cn(
                      "mt-1 text-sm text-muted-foreground",
                      locale === "ar" && "text-justify",
                    )}
                  >
                    {tier.target}
                  </p>
                )}
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {priceLabel(tier, yearly ? tier.price : tier.monthlyPrice, locale)}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {yearly ? t.pricing.perYear : t.pricing.perMonth}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {t.pricing.equivalent}{" "}
                  <span className="font-semibold text-foreground">
                    {priceLabel(tier, yearly ? tier.monthlyPrice : tier.price, locale)}
                    {yearly ? t.pricing.perMonth : t.pricing.perYear}
                  </span>{" "}
                  Â· {yearly ? t.pricing.billedAnnually : t.pricing.billedMonthly}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.checklist.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-2 text-sm text-start"
                    >
                      <CheckCircle2
                        className={cn(
                          "size-4 shrink-0",
                          item.unlocked ? "text-emerald-600" : "text-muted-foreground/40",
                        )}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          locale === "ar" && "leading-relaxed",
                          !item.unlocked && "text-muted-foreground/50 line-through",
                        )}
                      >
                        {localChecklistLabel(item.label, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={cn(
                    "mt-7 inline-flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors",
                    popular
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "border border-slate-200 bg-white hover:bg-muted",
                  )}
                >
                  {t.pricing.selectPlan}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const WHY_ICONS: LucideIcon[] = [Languages, Banknote, ShieldCheck, Lock];

function WhyUs() {
  const { t } = useLandingLocale();
  return (
    <section id="why" className="bg-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 md:px-6">
        <SectionHeading
          eyebrow={t.why.eyebrow}
          title={t.why.title}
          description={t.why.description}
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map((item, index) => {
            const Icon = WHY_ICONS[index] ?? Languages;
            return (
              <div
                key={item.name}
                className="group rounded-xl border border-slate-200 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  label,
  cta,
  value,
  href,
  icon: Icon,
}: {
  label: string;
  cta: string;
  value: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-card p-4 shadow-sm transition-all hover:shadow-md"
      // The contact value itself is always LTR even in the Arabic layout.
      dir="ltr"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
        <Icon className="size-5" aria-hidden />
      </div>
      <div className="min-w-0 flex-1 text-start">
        <div className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {label}
        </div>
        <div className="truncate text-sm font-semibold">{value}</div>
      </div>
      <span
        className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white"
        dir="ltr"
      >
        {cta}
      </span>
    </a>
  );
}

function FloatingContacts({ contacts }: { contacts: PublicSupportContact[] }) {
  const { t } = useLandingLocale();
  const picked = pickContacts(contacts, "");
  const fab =
    "fixed bottom-4 left-4 z-40 flex size-12 items-center justify-center rounded-full shadow-lg ring-1 transition-all hover:scale-105";

  return (
    <div className="flex flex-col gap-2">
      {picked.phone && (
        <a
          href={waHref(picked.phone.contact)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.contact.whatsappLabel}
          data-testid="fab-whatsapp"
          className={cn(fab, "bottom-4 left-4 bg-[#25D366] text-white ring-black/10 hover:bg-[#20bd5a]")}
        >
          <MessageCircle className="size-6" aria-hidden />
        </a>
      )}
      {picked.email && (
        <a
          href={mailtoHref(picked.email.contact)}
          aria-label={t.contact.emailLabel}
          data-testid="fab-email"
          className={cn(fab, "bottom-20 left-4 bg-primary text-primary-foreground hover:bg-primary/90")}
        >
          <Mail className="size-6" aria-hidden />
        </a>
      )}
    </div>
  );
}

type FormState = {
  fullName: string;
  schoolName: string;
  email: string;
  phone: string;
  region: string;
  message: string;
};
const EMPTY_FORM: FormState = {
  fullName: "",
  schoolName: "",
  email: "",
  phone: "",
  region: "",
  message: "",
};

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  placeholder,
  ltr,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  ltr?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        dir={ltr ? "ltr" : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition-colors focus:ring-3 focus:ring-ring/30",
          error ? "border-destructive focus:border-destructive" : "border-input focus:border-ring",
        )}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function RegionField({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const { locale, t } = useLandingLocale();
  return (
    <div className="space-y-1.5">
      <label htmlFor="region" className="text-sm font-medium">
        {t.contact.region}
      </label>
      <select
        id="region"
        name="region"
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "region-error" : undefined}
        className={cn(
          "h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition-colors focus:ring-3 focus:ring-ring/30",
          error ? "border-destructive focus:border-destructive" : "border-input focus:border-ring",
        )}
      >
        {REGIONS.map((region) => (
          <option key={region.value} value={region.value} disabled={!region.value}>
            {locale === "ar" ? region.ar : region.en}
          </option>
        ))}
      </select>
      {error && (
        <p id="region-error" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Inquire({ contacts }: { contacts: PublicSupportContact[] }) {
  const { t, locale } = useLandingLocale();
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const setField =
    (key: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = t.contact.errors.fullName;
    if (!form.schoolName.trim()) next.schoolName = t.contact.errors.schoolName;
    if (!form.email.trim()) next.email = t.contact.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t.contact.errors.emailFormat;
    if (!form.phone.trim()) next.phone = t.contact.errors.phone;
    else if (!/^\+?[0-9][0-9\s-]{6,29}$/.test(form.phone.trim())) next.phone = t.contact.errors.phoneFormat;
    if (!form.region) next.region = t.contact.errors.region;
    if (form.message.trim().length < 10) next.message = t.contact.errors.message;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const response = await fetch(
        `${(process.env.NEXT_PUBLIC_BACKEND_URL || "https://schoolbackend-7n8a.onrender.com").replace(/\/$/, "")}/api/public/inquiries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: form.fullName.trim(),
            schoolName: form.schoolName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            region: form.region,
            message: form.message.trim(),
          }),
        },
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setSent(true);
      toast.add({
        type: "success",
        title: t.contact.toasts.successTitle,
        description: t.contact.toasts.successDescription,
      });
    } catch {
      setFormError(t.contact.errors.generic);
      toast.add({
        type: "error",
        title: t.contact.toasts.errorTitle,
        description: t.contact.toasts.errorDescription,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Live, region-aware contacts: the picks follow the form's region select
  // so a prospect always sees the team member serving their region.
  const picked = pickContacts(contacts, form.region);

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 md:px-6">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
        />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-card p-10 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                  <CheckCircle2 className="size-7" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{t.contact.thanksTitle}</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  {t.contact.thanksLead(form.fullName.split(" ")[0], form.email)}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY_FORM);
                    setSent(false);
                  }}
                  className="mt-6 h-9 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium hover:bg-muted"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                dir={locale === "ar" ? "rtl" : "ltr"}
                className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label={t.contact.fullName}
                    name="fullName"
                    value={form.fullName}
                    error={errors.fullName}
                    onChange={setField("fullName")}
                    placeholder={t.contact.fullNamePh}
                  />
                  <Field
                    label={t.contact.schoolName}
                    name="schoolName"
                    value={form.schoolName}
                    error={errors.schoolName}
                    onChange={setField("schoolName")}
                    placeholder={t.contact.schoolNamePh}
                  />
                  <Field
                    label={t.contact.email}
                    name="email"
                    type="email"
                    ltr
                    value={form.email}
                    error={errors.email}
                    onChange={setField("email")}
                    placeholder={t.contact.emailPh}
                  />
                  <Field
                    label={t.contact.phone}
                    name="phone"
                    type="tel"
                    ltr
                    value={form.phone}
                    error={errors.phone}
                    onChange={setField("phone")}
                    placeholder={t.contact.phonePh}
                  />
                </div>
                <div className="mt-4">
                  <RegionField
                    value={form.region}
                    error={errors.region}
                    onChange={setField("region")}
                  />
                </div>
                <div className="mt-4 space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={setField("message")}
                    placeholder={t.contact.messagePh}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(
                      "w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:ring-3 focus:ring-ring/30",
                      errors.message
                        ? "border-destructive focus:border-destructive"
                        : "border-input focus:border-ring",
                    )}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>
                {formError && (
                  <p role="alert" className="mt-3 text-xs text-destructive">
                    {formError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60",
                    PRIMARY_CTA,
                  )}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      {t.contact.submitting}
                    </>
                  ) : (
                    t.contact.submit
                  )}
                </button>
              </form>
            )}
          </div>
          <div className="space-y-4 lg:col-span-2">
            {picked.phone && (
              <ContactCard
                label={t.contact.whatsappLabel}
                cta={t.contact.ctaChat}
                value={picked.phone.contact}
                href={waHref(picked.phone.contact)}
                icon={MessageCircle}
              />
            )}
            {picked.email && (
              <ContactCard
                label={t.contact.emailLabel}
                cta={t.contact.ctaEmail}
                value={picked.email.contact}
                href={mailtoHref(picked.email.contact)}
                icon={Mail}
              />
            )}
            {!picked.phone && !picked.email && (
              <p className="rounded-xl border border-slate-200 bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                {t.contact.contactsFallbackNote}
              </p>
            )}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
              <h3 className="text-sm font-bold text-emerald-900">{t.contact.regionCardTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-800">
                {t.contact.regionCardBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLandingLocale();
  const [year, setYear] = React.useState<number | null>(null);
  React.useEffect(() => {
    // Deliberately deferred: a client-side new Date() during prerender is
    // rejected by Next 16 cache components, so the year is set post-hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- single year read
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm space-y-3">
            <Logo tagline />
            <p className="text-sm text-muted-foreground">{t.footer.blurb}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            {t.footer.columns.map((column) => (
              <div key={column.title} className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wider text-foreground uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-emerald-600"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-muted-foreground md:flex-row">
          <p>{t.footer.copyright(year)}</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              {t.footer.status}
            </span>
            <span className="flex items-center gap-2">
              <a href="#" aria-label="X (Twitter)" className="hover:text-emerald-600">
                ð•
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-emerald-600">
                in
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage({
  initialTiers,
  initialContacts,
}: {
  initialTiers: PricingTier[];
  initialContacts: PublicSupportContact[];
}) {
  return (
    <LandingLocaleProvider>
      <LandingShell initialTiers={initialTiers} initialContacts={initialContacts} />
    </LandingLocaleProvider>
  );
}

function LandingShell({
  initialTiers,
  initialContacts,
}: {
  initialTiers: PricingTier[];
  initialContacts: PublicSupportContact[];
}) {
  const { dir, locale } = useLandingLocale();
  return (
    <DirectionProvider direction={dir}>
      <div dir={dir} lang={locale} className="flex min-h-screen flex-col bg-background">
        <Toaster />
        <FloatingContacts contacts={initialContacts} />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Portals />
          <Pricing tiers={initialTiers} />
          <WhyUs />
          <Inquire contacts={initialContacts} />
        </main>
        <Footer />
      </div>
    </DirectionProvider>
  );
}
