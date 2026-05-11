import { sanityClient } from "./client";

// ─── TypeScript types matching the Sanity schemas ────────────────────────────

export type Stat = {
  value: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  stats: Stat[];
};

export type ServiceCard = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  highlight: boolean;
};

export type ServicesContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  services: ServiceCard[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type AboutContent = {
  headline: string;
  paragraphs: string[];
  credentials: { key: string; value: string }[];
};

export type SiteContent = {
  hero: HeroContent;
  services: ServicesContent;
  testimonials: Testimonial[];
  faqs: FaqItem[];
  about: AboutContent;
};

// ─── GROQ queries ─────────────────────────────────────────────────────────────

const heroQuery = `*[_type == "hero"][0]{
  eyebrow, headline, headlineAccent, subheadline,
  stats[]{ value, label }
}`;

const servicesQuery = `*[_type == "services"][0]{
  eyebrow, headline, subheadline,
  services[]{ tag, title, description, bullets, highlight }
}`;

const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt asc){
  quote, name, role
}`;

const faqsQuery = `*[_type == "faq"] | order(order asc){
  question, answer
}`;

const aboutQuery = `*[_type == "about"][0]{
  headline,
  paragraphs,
  credentials[]{ key, value }
}`;

// ─── Fetch all content in parallel ───────────────────────────────────────────

export async function fetchSiteContent(): Promise<SiteContent> {
  const [hero, services, testimonials, faqs, about] = await Promise.all([
    sanityClient.fetch<HeroContent>(heroQuery),
    sanityClient.fetch<ServicesContent>(servicesQuery),
    sanityClient.fetch<Testimonial[]>(testimonialsQuery),
    sanityClient.fetch<FaqItem[]>(faqsQuery),
    sanityClient.fetch<AboutContent>(aboutQuery),
  ]);

  return { hero, services, testimonials, faqs, about };
}
