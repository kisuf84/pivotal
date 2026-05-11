export default {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "eyebrow",
      title: "Eyebrow label",
      type: "string",
      description: "Small text above the headline (e.g. 'Financial Data Structure & Systems')",
    },
    {
      name: "headline",
      title: "Headline (first part)",
      type: "string",
      description: "e.g. \"You're making decisions\"",
    },
    {
      name: "headlineAccent",
      title: "Headline accent (highlighted part)",
      type: "string",
      description: "e.g. \"without the full picture\" — this gets the chartreuse highlight",
    },
    {
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
    },
    {
      name: "stats",
      title: "Stats (At a glance)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string", description: "e.g. '18+'" },
            { name: "label", title: "Label", type: "string", description: "e.g. 'Years of CPA & advisory experience'" },
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Hero Section" }) },
};
