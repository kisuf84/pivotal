import type { SiteContent } from "./queries";

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "Financial Data Structure & Systems",
    headline: "You're making decisions",
    headlineAccent: "without the full picture",
    subheadline:
      "Your financial data exists—but it's not structured, connected, or flowing in a way that gives you accurate, complete, and timely insight. We help you redesign how your financial data is collected, organized, and processed so it actually supports decision‑making and stakeholder needs.",
    stats: [
      { value: "18+ years", label: "CPA & advisory experience" },
      { value: "$500K–$10M+", label: "Revenue range we typically work with" },
      { value: "SaaS · Services", label: "Industries we serve" },
      { value: "Fractional · Project-based", label: "Engagement model" },
    ],
  },

  services: {
    eyebrow: "Services",
    headline: "Start with clarity. Build the structure. Stay aligned.",
    subheadline:
      "Three engagements designed to work together: define how your financial data should flow, put it in place, and keep it aligned as the business evolves.",
    services: [
      {
        tag: "01 · Start here",
        title: "Financial Clarity Sprint",
        description:
          "A focused engagement to assess how your data is collected, structured, and processed, and to define what needs to change to produce reliable, decision‑ready information.",
        bullets: [
          "Review of how data is captured & categorized",
          "Assessment of workflows & system connections",
          "Review of controls: where they exist, where they're missing",
          "Defined structure + roadmap for what to build",
          "Opportunities to apply automation and AI where they reduce manual work without adding risk",
        ],
        highlight: true,
      },
      {
        tag: "02 · Build",
        title: "Financial Systems Build & Implementation",
        description:
          "We work alongside your team, or step in directly, to implement the structure, workflows, and system alignment that make your data reliable in practice.",
        bullets: [
          "Restructure how data is categorized & reported",
          "Design & implement month‑end and approval workflows",
          "Connect systems, automate, and document SOPs",
          "Apply automation and AI where they improve accuracy, consistency, and reporting speed",
        ],
        highlight: false,
      },
      {
        tag: "03 · Sustain",
        title: "Ongoing Financial Systems Alignment",
        description:
          "As your business grows, your systems need to evolve with it. Ongoing support to keep data, workflows, and systems aligned with how the business actually operates.",
        bullets: [
          "Continuous structure & workflow review",
          "Evolve systems as the business scales",
          "Prevent drift back into fragmentation",
          "Ongoing identification of opportunities to improve efficiency through automation and AI",
        ],
        highlight: false,
      },
    ],
  },

  testimonials: [
    {
      quote:
        "We brought Manal in when our financial setup wasn't keeping up with the business. She restructured how our data was organized, led our move from QuickBooks to NetSuite, and helped build out our finance function so everything actually worked together. Before, we had numbers but didn't fully trust or use them. After, everything was consistent, clear, and actually useful for decision-making. That shift played a real role in helping us scale and ultimately get acquired.",
      name: "SaaS Startup · Growth Stage",
      role: "QuickBooks to NetSuite migration · Revenue reconciliation · Month-end close",
    },
    {
      quote:
        "We initially needed help getting audit-ready, but the bigger issue was how our data and processes were set up. Manal brought structure to our reporting, streamlined our month-end, and put clear workflows in place so things actually run consistently. We're no longer piecing things together or second-guessing the numbers. Everything is more reliable and runs a lot more smoothly.",
      name: "Services Company · ~$6M Revenue",
      role: "Month-end process design · SOP documentation · First audit",
    },
  ],

  faqs: [
    { question: "What kind of businesses do you work with?", answer: "Growing businesses that already have revenue and some financial setup in place, but are starting to feel the complexity that comes with growth. This often shows up when preparing for fundraising, audits, or scaling operations." },
    { question: "Do you do bookkeeping or accounting?", answer: "No, we don't provide bookkeeping or traditional accounting services. Our focus is on how financial data is structured and flows across the business, so the data produced is accurate, complete, and usable. We often work alongside your existing bookkeeper or accounting team." },
    { question: "What tools do you work with?", answer: "We're tool-agnostic. We commonly work with QuickBooks, NetSuite, and related systems, but our focus isn't the tool. It's how your data is structured and how systems work together." },
    { question: "Can you help with a NetSuite or system implementation?", answer: "Yes. Our role is making sure the structure, workflows, and data behind the system are set up correctly. Most implementation issues don't come from the system; they come from how the business is set up to use it." },
    { question: "What happens after the initial Sprint?", answer: "Once we've defined how your data and operations should be structured, we can support implementation, alongside your team or directly. Some clients continue working with us to keep everything aligned as the business grows." },
    { question: "What do controls mean and why do they matter?", answer: "Controls are the checks built into your financial workflows that ensure data stays consistent and reliable over time: approval steps before a bill is paid, reconciliation checks at the end of each period, review steps before a report is finalized, and documentation that makes a process repeatable. Without controls, even a well-designed system will drift." },
    { question: "How do I know if this is the right time to reach out?", answer: "If your business is growing and your reports don't fully reflect reality, your processes feel inconsistent, or you're preparing for investors, audits, or scaling — it's usually the right time." },
    { question: "What can I expect from the Clarity Call?", answer: "A focused 30-minute conversation to understand your current setup, where things feel unclear, and what's driving the need for change. You'll leave with a clearer sense of whether your issue is structural, and whether we're the right fit to work on it together." },
  ],

  about: {
    headline: "Manal Elhag, CPA. Founder.",
    paragraphs: [
      "I've worked with financial data from a few different sides — auditing it at a Big 4 firm, owning it inside corporate finance, and now rebuilding it with clients as a consultant.",
      "Each angle taught me the same thing: the issues that show up in reports almost always start further upstream, in how the data is produced.",
      "That's the part I focus on. As a CPA working at the intersection of finance and operations, my work is less about reporting and more about the systems, workflows, and decisions that shape the numbers in the first place.",
    ],
    credentials: [
      { key: "CPA", value: "Licensed" },
      { key: "Big 4 audit · Corporate finance · Financial operations consulting", value: "Background" },
      { key: "Finance + Operations", value: "Specialty" },
    ],
  },
};
