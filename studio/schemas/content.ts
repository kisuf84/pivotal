export const testimonial = {
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      description: "Do not include quotation marks — they're added automatically",
    },
    { name: "name", title: "Name or title", type: "string", description: "e.g. 'CFO' or 'Sarah M.'" },
    { name: "role", title: "Company / role", type: "string", description: "e.g. 'SaaS Education Company'" },
  ],
  preview: { select: { title: "name", subtitle: "role" } },
};

export const faq = {
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    { name: "question", title: "Question", type: "string" },
    { name: "answer", title: "Answer", type: "text", rows: 3 },
    {
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first (1, 2, 3…)",
    },
  ],
  preview: { select: { title: "question" } },
  orderings: [{ title: "Manual order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
};

export const about = {
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    { name: "headline", title: "Headline", type: "string", description: "e.g. 'Manal Elhag, CPA — Founder.'" },
    {
      name: "paragraphs",
      title: "Bio paragraphs",
      type: "array",
      of: [{ type: "text" }],
      description: "Each item is one paragraph. The last paragraph gets the dark text treatment.",
    },
    {
      name: "credentials",
      title: "Credential tiles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Label", type: "string", description: "e.g. 'CPA'" },
            { name: "value", title: "Sub-label", type: "string", description: "e.g. 'Licensed'" },
          ],
          preview: { select: { title: "key", subtitle: "value" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "About Section" }) },
};
