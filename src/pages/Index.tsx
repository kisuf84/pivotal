import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ScrollProgress } from "@/components/ScrollProgress";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSiteContent } from "@/hooks/use-site-content";
import { Compass, Wrench, LineChart, Menu, X, ArrowRight } from "lucide-react";
import portrait from "@/assets/manal-portrait.jpg";
import { openCalendlyPopup } from "@/lib/calendly";

const ICONS = [Compass, Wrench, LineChart];

const BookCallButton = ({
  children = "Book a Clarity Call",
  size = "lg",
  className = "",
}: {
  children?: React.ReactNode;
  size?: "lg" | "default";
  className?: string;
}) => (
  <Button variant="accent" size={size} className={className} onClick={openCalendlyPopup}>
    {children}
  </Button>
);

const NavLink = ({ href, children, active, onClick }: {
  href: string; children: React.ReactNode; active?: boolean; onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={`text-sm font-medium transition-colors ${active ? "text-foreground" : "text-ink-soft hover:text-foreground"}`}
  >
    {children}
    <span className={`mt-1 block h-0.5 origin-left transition-transform duration-300 ${active ? "scale-x-100 bg-accent" : "scale-x-0 bg-transparent"}`} />
  </a>
);

const Index = () => {
  const sectionIds = ["services", "approach", "about", "faq", "contact"];
  const active = useActiveSection(sectionIds);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { content } = useSiteContent();
  const { hero, services, testimonials, faqs, about } = content;

  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (mobileNavOpen) firstMenuLinkRef.current?.focus();
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileNavOpen(false);
        menuToggleRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && mobilePanelRef.current) {
        const focusable = mobilePanelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeEl = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (activeEl === first || activeEl === menuToggleRef.current)) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault(); menuToggleRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileNavOpen]);

  const navItems = [
    { href: "#services", label: "Services", id: "services" },
    { href: "#approach", label: "Approach", id: "approach" },
    { href: "#about", label: "About", id: "about" },
    { href: "#faq", label: "FAQ", id: "faq" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ScrollProgress />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="container-prose flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-2" onClick={() => setMobileNavOpen(false)}>
            <span className="inline-block h-2.5 w-2.5 flex-shrink-0 bg-accent" />
            <span className="text-sm font-semibold tracking-tight">Pivotal Strategic Solutions</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((l) => (
              <NavLink key={l.href} href={l.href} active={active === l.id}>{l.label}</NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <BookCallButton size="default">Book a Clarity Call</BookCallButton>
            </div>
            <button
              type="button"
              ref={menuToggleRef}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileNavOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
            >
              {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div
            id="mobile-nav"
            ref={mobilePanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="border-t border-border bg-background md:hidden"
          >
            <nav className="container-prose flex flex-col py-2">
              {navItems.map((item, idx) => (
                <a
                  key={item.id}
                  href={item.href}
                  ref={idx === 0 ? firstMenuLinkRef : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileNavOpen(false);
                    menuToggleRef.current?.focus();
                    requestAnimationFrame(() => {
                      const el = document.getElementById(item.id);
                      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); history.replaceState(null, "", item.href); }
                    });
                  }}
                  aria-current={active === item.id ? "true" : undefined}
                  className={`flex items-center gap-3 border-l-2 py-3 pl-3 text-base font-medium transition-colors ${
                    active === item.id ? "border-accent text-foreground" : "border-transparent text-ink-soft"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="py-3">
                <BookCallButton size="default" className="w-full justify-center">Book a Clarity Call</BookCallButton>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="border-b border-border bg-background">
        <div className="container-prose grid gap-12 py-20 md:grid-cols-12 md:gap-10 md:py-28">
          <div className="md:col-span-8">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {hero.headline}{" "}
              <span className="bg-accent px-2 box-decoration-clone">{hero.headlineAccent}</span>
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg text-ink-soft">
              <p>You don't have a visibility problem. You have a structure problem, and it gets more expensive as the business grows.</p>
              <p>We redesign the foundation underneath your financial data so it actually works at scale.</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookCallButton size="lg">Book a Clarity Call</BookCallButton>
              <a href="#services" className="text-sm font-medium text-foreground underline-offset-4 hover:underline">See how we work →</a>
            </div>
          </div>
          <aside className="md:col-span-4">
            <div className="h-full rounded-lg border border-border bg-secondary p-6 md:p-7">
              <p className="eyebrow">At a glance</p>
              <dl className="mt-5 space-y-5">
                {hero.stats.map((stat, i) => (
                  <div key={stat.value} className={i > 0 ? "border-t border-border pt-5" : ""}>
                    <dt className="text-lg font-semibold tracking-tight">{stat.value}</dt>
                    <dd className="mt-1 text-sm text-ink-soft">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-secondary">
        <div className="container-prose section-pad grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="eyebrow">If this feels familiar…</span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              You have financials.
              <span className="mt-3 block text-ink-soft">But they're not giving you what you need to run the business with confidence.</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-7 text-lg text-ink-soft">
            <p>You're not sure:</p>
            <ul className="space-y-3">
              {[
                "if data is captured and categorized correctly",
                "if reports reflect how the business actually operates, or if MRR/ARR tie out across systems",
                "if the information you're using is complete and current",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>So you pull data from billing, CRM, and accounting, lean on spreadsheets to fill the gaps, and work around the system to get answers.</p>
            <p className="text-foreground">
              <span className="bg-accent px-1.5">And when it matters most — investor conversations, audits, due diligence — you're not fully confident in what you're presenting.</span>
            </p>
            <p>This gets harder to fix as the business grows. Messy systems are manageable early on, then expensive to unwind at scale.</p>
          </div>
        </div>
      </section>

      {/* APPROACH — 4 stages */}
      <section id="approach" className="bg-background">
        <div className="container-prose section-pad border-t border-border">
          <div className="max-w-3xl">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Four stages, in order.</h2>
            <p className="mt-5 text-[17px] leading-[1.7] text-ink-soft">
              We don't start with reports or systems. We start with how your financial data is produced — and we move through it in the same order, every time.
            </p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { n: "01", h: "Assess", tag: "We understand what's happening", p: "We map how your data is captured, categorized, and moved today — and where the structure is breaking down. Before anything changes, we know exactly what we're working with." },
              { n: "02", h: "Design", tag: "We define how it should work", p: "We design the structure, workflows, and system connections so your data reflects how the business actually operates — accurate, complete, consistent, and available when you need it." },
              { n: "03", h: "Implement", tag: "We put it in place", p: "We build the structure into your systems, set up the workflows, document the process, and add controls and automation where they reduce manual work without adding risk." },
              { n: "04", h: "Align", tag: "We ensure it continues working", p: "As the business evolves, structure drifts. We keep data, workflows, and systems aligned with how the business actually operates — so what we built keeps working." },
            ].map((s) => (
              <li key={s.n} className="rounded-lg border border-border bg-background p-7">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ink-soft">
                  <span className="h-1.5 w-1.5 bg-accent" />{s.n}
                </span>
                <h3 className="mt-4 text-xl font-semibold leading-snug text-foreground">{s.h}</h3>
                <p className="mt-1 text-sm font-medium text-foreground/70">{s.tag}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.p}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-lg border-l-2 border-accent bg-secondary p-7">
            <p className="eyebrow">The point</p>
            <p className="mt-3 text-[17px] leading-[1.7] text-foreground">
              Most businesses focus on the output. We focus on the stages that produce it — because that's where the real problem almost always lives.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-background">
        <div className="container-prose section-pad">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">{services.eyebrow}</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{services.headline}</h2>
            </div>
            <p className="max-w-md text-ink-soft">{services.subheadline}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.services.map((s, i) => {
              const Icon = ICONS[i] ?? Compass;
              return (
                <Reveal
                  key={s.title}
                  delay={i * 80}
                  as="article"
                  className={`group flex flex-col rounded-lg border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    s.highlight ? "border-foreground bg-foreground text-background hover:shadow-foreground/20" : "border-border bg-background hover:border-foreground/40"
                  }`}
                >
                  <Icon className={`mb-5 h-7 w-7 ${s.highlight ? "text-accent" : "text-foreground"}`} strokeWidth={1.75} />
                  <span className={`inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.16em] ${s.highlight ? "text-accent" : "text-ink-soft"}`}>
                    <span className={`h-1.5 w-1.5 ${s.highlight ? "bg-accent" : "bg-foreground"}`} />{s.tag}
                  </span>
                  <h3 className={`mt-4 text-xl font-semibold leading-snug ${s.highlight ? "text-background" : "text-foreground"}`}>{s.title}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${s.highlight ? "text-background/80" : "text-ink-soft"}`}>{s.description}</p>
                  <ul className={`mt-6 space-y-2 text-sm ${s.highlight ? "text-background/90" : "text-foreground"}`}>
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-accent" /><span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUTCOMES — before/after table */}
      <section id="enables" className="bg-secondary">
        <div className="container-prose section-pad">
          <Reveal>
            <div className="max-w-3xl">
              <span className="eyebrow">Outcomes</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">How this changes how your business operates</h2>
              <p className="mt-6 text-[17px] leading-[1.7] text-ink-soft">
                When the structure is right, you stop working around the system and start operating through it.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 overflow-hidden rounded-lg border border-border bg-background">
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] border-b border-border bg-secondary/60">
              <div className="px-8 py-4"><span className="eyebrow">Without the right structure</span></div>
              <div className="w-12" aria-hidden="true" />
              <div className="px-8 py-4"><span className="eyebrow">With the right foundation</span></div>
            </div>
            <ul className="divide-y divide-border">
              {[
                ["Month-end is reactive and takes weeks", "Predictable close that finishes in days"],
                ["Processes depend on individuals", "Documented, repeatable, and reliable"],
                ["Spreadsheets fill the gaps between tools", "Systems handle the work end to end"],
                ["Reporting is manually assembled each cycle", "Information is ready when it's needed"],
                ["Data is inconsistent across systems", "Reports reflect how the business actually runs"],
                ["Financials exist but need interpretation", "Numbers are structured and consistently produced"],
                ["Decisions made on partial or late information", "Decisions made with confidence in the data"],
                ["Audits and due diligence mean scrambling", "You produce what's asked, cleanly and quickly"],
              ].map(([before, after]) => (
                <li key={before} className="grid gap-4 px-6 py-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-0 md:px-0 md:py-0">
                  <div className="text-[16px] leading-[1.6] text-ink-soft md:px-8 md:py-6">
                    <span className="eyebrow mb-2 block md:hidden">Before</span>{before}
                  </div>
                  <div className="flex items-center md:w-12 md:justify-center">
                    <ArrowRight className="h-4 w-4 text-ink-soft/60" aria-hidden="true" />
                  </div>
                  <div className="text-[16px] leading-[1.6] font-medium text-foreground md:px-8 md:py-6">
                    <span className="eyebrow mb-2 block md:hidden">After</span>{after}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-[17px] leading-[1.7] text-foreground">
            <span className="bg-accent px-1.5">When the foundation is right, everything built on top of it becomes easier, faster, and more reliable.</span>
          </p>
        </div>
      </section>

      {/* MID-PAGE CTA */}
      <section className="bg-background">
        <div className="container-prose py-14 md:py-20">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-[17px] leading-[1.7] text-foreground md:text-lg">
              If any of this sounds familiar, a Clarity Call is the simplest place to start.
            </p>
            <BookCallButton size="lg">Book a Clarity Call</BookCallButton>
          </div>
        </div>
      </section>

      {/* CLIENT STORIES */}
      <section className="bg-secondary">
        <div className="container-prose section-pad">
          <Reveal>
            <span className="eyebrow">Client Stories</span>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">Real engagements. Anonymized.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                label: "01",
                title: "SaaS Startup · Growth Stage",
                tags: "QuickBooks to NetSuite migration · Revenue reconciliation · Month-end close",
                situation: "The business was growing and its financial setup wasn't keeping up. Data lived across billing, CRM, and accounting, but it wasn't consistent across systems and revenue wasn't reconciling cleanly. Month-end took two weeks and required significant manual effort every cycle. They came in to get the foundation right.",
                did: [
                  "Restructured how financial data was categorized and reported",
                  "Led the migration from QuickBooks to NetSuite, designing the structure correctly before the system went live",
                  "Built workflows so data moved cleanly across billing, CRM, and accounting",
                  "Redesigned the month-end close process so it ran predictably without manual intervention",
                ],
                result: [
                  "Month-end close went from two weeks to five days",
                  "Revenue reconciled cleanly across billing, CRM, and accounting",
                  "The business was later acquired; the founder credited the financial foundation as a contributing factor",
                ],
              },
              {
                label: "02",
                title: "Services Company · ~$6M Revenue",
                tags: "Month-end process design · SOP documentation · First audit",
                situation: "The business was approaching its first audit and needed to get ready. But the deeper issue was that month-end had no defined structure: it took twelve days, depended on individuals rather than documented processes, and left the team piecing things together every cycle. There were no SOPs in place.",
                did: [
                  "Redesigned the month-end close process from the ground up",
                  "Built and documented SOPs so the process didn't depend on any one person",
                  "Aligned workflows and controls to meet audit requirements",
                  "Worked alongside the team through the full audit preparation process",
                ],
                result: [
                  "Month-end close went from twelve days to four days",
                  "Passed their first audit with zero material adjustments",
                  "The team now runs close without scrambling; processes are documented and don't rely on individuals",
                ],
              },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 100} as="article" className="flex h-full flex-col rounded-lg border border-border bg-background p-7">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ink-soft">
                  <span className="h-1.5 w-1.5 bg-accent" />{s.label}
                </span>
                <h3 className="mt-4 text-xl font-semibold leading-snug text-foreground">{s.title}</h3>
                <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-ink-soft">{s.tags}</p>
                <div className="mt-6">
                  <p className="eyebrow">The situation</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{s.situation}</p>
                </div>
                <div className="mt-6">
                  <p className="eyebrow">What we did</p>
                  <ul className="mt-3 space-y-2 text-[15px] text-foreground">
                    {s.did.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" /><span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 border-t border-border pt-5">
                  <p className="eyebrow">The result</p>
                  <ul className="mt-3 space-y-2 text-[15px] font-medium text-foreground">
                    {s.result.map((r) => (
                      <li key={r} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" /><span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE'RE DIFFERENT */}
      <section className="bg-background">
        <div className="container-prose section-pad">
          <span className="eyebrow">How we're different</span>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
            If you've already talked to someone else and weren't sure they were quite right, here's where we fit.
          </h2>
          <p className="mt-5 max-w-2xl text-ink-soft">Pivotal sits between several familiar categories. Understanding where we're different helps clarify whether we're the right call.</p>
          <div className="mt-12 overflow-hidden rounded-lg border border-border bg-background">
            <div className="hidden md:grid md:grid-cols-3 border-b border-border bg-secondary/60">
              <div className="px-6 py-4"><span className="eyebrow">Who you may have talked to</span></div>
              <div className="px-6 py-4"><span className="eyebrow">What they focus on</span></div>
              <div className="px-6 py-4"><span className="eyebrow">Where we fit</span></div>
            </div>
            <ul className="divide-y divide-border">
              {[
                ["Bookkeeper", "Records and categorizes transactions on an ongoing basis", "We design how those transactions should be captured, categorized, controlled, and connected to what the business needs to know"],
                ["Accountant / CPA firm", "Closes the books, prepares financial statements, handles compliance", "We focus on the structure and workflows that produce reliable data in the first place. We often work alongside your accountant."],
                ["Fractional CFO", "Strategy, forecasting, fundraising, financial planning, executive decisions", "We build the operational finance infrastructure that makes those strategic decisions reliable: the foundation the CFO depends on"],
                ["ERP / NetSuite consultant", "Configures and implements software", "We focus on the structure, workflows, and business logic the system needs to work properly, not just the technical setup"],
                ["Analytics / BI firm", "Builds dashboards and reporting layers on top of existing data", "We fix the upstream data so dashboards and metrics are actually trustworthy"],
              ].map(([who, what, fit]) => (
                <li key={who} className="grid gap-3 px-6 py-6 md:grid-cols-3 md:gap-0 md:px-0 md:py-0">
                  <div className="md:px-6 md:py-6">
                    <span className="eyebrow mb-2 block md:hidden">Who</span>
                    <p className="text-[15px] font-semibold text-foreground">{who}</p>
                  </div>
                  <div className="text-[15px] leading-[1.6] text-ink-soft md:px-6 md:py-6">
                    <span className="eyebrow mb-2 block md:hidden">What they focus on</span>{what}
                  </div>
                  <div className="text-[15px] leading-[1.6] font-medium text-foreground md:px-6 md:py-6">
                    <span className="eyebrow mb-2 block md:hidden">Where we fit</span>{fit}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 rounded-lg border-l-2 border-accent bg-secondary p-7">
            <p className="text-[17px] leading-[1.7] text-foreground">
              Most firms focus on reports, systems, or strategy. We focus on how financial data is actually produced, because that's what all of those things depend on.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-7">
              <p className="eyebrow">A good fit if you…</p>
              <ul className="mt-5 space-y-3 text-[15px] text-foreground">
                {[
                  "Run a SaaS or service‑based business doing $500K–$10M+ in revenue",
                  "Have a bookkeeper, accountant, or finance team in place and an accounting system, but numbers still feel unreliable",
                  "Don't fully trust your numbers, or can't clearly explain them",
                  "Are growing the team, preparing to raise, going through an audit, or making a major operational decision",
                  "Want someone who works at the intersection of finance and operations, not just one or the other",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" /><span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-secondary p-7">
              <p className="eyebrow">Probably not a fit if you…</p>
              <ul className="mt-5 space-y-3 text-[15px] text-ink-soft">
                {[
                  "Are pre‑revenue or still validating the business",
                  "Are looking for a bookkeeper or tax preparer",
                  "Need a quick fix rather than a foundation to build on",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-ink-soft/40" /><span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-secondary">
        <div className="container-prose py-20 md:py-[120px]">
          <div className="grid gap-12 md:grid-cols-12 md:items-start md:gap-16">
            <div className="md:col-span-4">
              <img
                src={portrait}
                alt="Manal Elhag, CPA and founder of Pivotal Strategic Solutions"
                width={560} height={560}
                loading="lazy" decoding="async"
                className="w-full rounded-lg border border-border object-cover"
              />
            </div>
            <div className="md:col-span-8">
              <span className="eyebrow">About</span>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight md:text-[40px]">{about.headline}</h2>
              <div className="mt-8 space-y-5 text-[17px] leading-[1.7] text-ink-soft">
                {about.paragraphs.map((p, i) => (
                  <p key={i} className={i === about.paragraphs.length - 1 ? "text-foreground" : ""}>{p}</p>
                ))}
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-px bg-border">
                {about.credentials.map(({ key, value }) => (
                  <div key={key} className="bg-secondary p-4">
                    <dt className="text-sm font-semibold text-foreground">{key}</dt>
                    <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-soft">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background">
        <div className="container-prose section-pad">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="eyebrow">FAQ</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Common questions.</h2>
              <p className="mt-5 text-ink-soft">Don't see what you're looking for? Send us a note below.</p>
            </div>
            <div className="md:col-span-8 divide-y divide-border border-y border-border">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    <span>{question}</span>
                    <span className="mt-0.5 flex-shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-3 space-y-3 text-ink-soft">
                    {answer.split('\n').filter(Boolean).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-secondary">
        <div className="container-prose section-pad">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <span className="eyebrow">Get in touch</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                If your business is growing but your financial data isn't keeping up.
              </h2>
              <p className="mt-5 text-ink-soft">
                Let's look at how your data is currently structured and what needs to change.
                Book a 30‑minute Clarity Call, or send a message and we'll respond within 48 hours.
              </p>
              <div className="mt-8">
                <BookCallButton size="lg">Book a Clarity Call</BookCallButton>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold tracking-tight md:text-[28px]">Send us a message</h3>
                <p className="mt-2 text-ink-soft">Tell us about your business and what you're working through. We'll get back to you within 48 hours.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background py-10">
        <div className="container-prose flex flex-col gap-4 text-sm text-ink-soft md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 flex-shrink-0 bg-accent" />
            <span className="font-semibold text-foreground">Pivotal Strategic Solutions</span>
            <span className="text-ink-soft">· Manal Elhag, CPA</span>
          </div>
          <p>© {new Date().getFullYear()} Pivotal Strategic Solutions. All rights reserved.</p>
        </div>
      </footer>

      <FloatingCTA />
    </main>
  );
};

export default Index;
