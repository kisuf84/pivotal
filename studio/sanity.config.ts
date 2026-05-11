import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "pivotal-strategic-solutions",
  title: "Pivotal Strategic Solutions",

  // Fill this in after creating your Sanity project at sanity.io/manage
  projectId: "REPLACE_PROJECT_ID",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Hero Section").id("hero").child(
              S.document().schemaType("hero").documentId("hero")
            ),
            S.listItem().title("Services Section").id("services").child(
              S.document().schemaType("services").documentId("services")
            ),
            S.listItem().title("About Section").id("about").child(
              S.document().schemaType("about").documentId("about")
            ),
            S.divider(),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("faq").title("FAQ"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
