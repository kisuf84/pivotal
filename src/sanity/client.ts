import { createClient } from "@sanity/client";

// These values come from your Sanity project.
// After creating the Sanity project (see DEPLOY_INSTRUCTIONS), fill these in
// and add them to your .env file and Vercel environment variables.
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "REPLACE_PROJECT_ID",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // fast cached reads for production
});
