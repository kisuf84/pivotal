export default {
  name: "services",
  title: "Services Section",
  type: "document",
  fields: [
    { name: "eyebrow", title: "Eyebrow label", type: "string" },
    { name: "headline", title: "Section headline", type: "string" },
    { name: "subheadline", title: "Section subheadline", type: "text", rows: 2 },
    {
      name: "services",
      title: "Service cards",
      type: "array",
      validation: (Rule: any) => Rule.max(3),
      of: [
        {
          type: "object",
          fields: [
            { name: "tag", title: "Tag label", type: "string", description: "e.g. '01 · Start here'" },
            { name: "title", title: "Card title", type: "string" },
            { name: "description", title: "Description", type: "text", rows: 3 },
            {
              name: "bullets",
              title: "Bullet points",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule: any) => Rule.max(4),
            },
            {
              name: "highlight",
              title: "Highlighted card (dark background)",
              type: "boolean",
              description: "Only one card should be highlighted at a time",
              initialValue: false,
            },
          ],
          preview: { select: { title: "title", subtitle: "tag" } },
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Services Section" }) },
};
