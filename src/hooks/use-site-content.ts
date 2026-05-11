import { useState, useEffect } from "react";
import { fetchSiteContent, type SiteContent } from "@/sanity/queries";
import { defaultContent } from "@/sanity/defaults";

type Status = "loading" | "success" | "fallback";

export function useSiteContent(): { content: SiteContent; status: Status } {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;

    // If no project ID is configured, skip the fetch and use defaults
    if (!projectId || projectId === "REPLACE_PROJECT_ID") {
      setStatus("fallback");
      return;
    }

    fetchSiteContent()
      .then((data) => {
        // Merge fetched data with defaults so missing fields never break the UI
        setContent({
          hero: data.hero ?? defaultContent.hero,
          services: data.services ?? defaultContent.services,
          testimonials: data.testimonials?.length ? data.testimonials : defaultContent.testimonials,
          faqs: data.faqs?.length ? data.faqs : defaultContent.faqs,
          about: data.about ?? defaultContent.about,
        });
        setStatus("success");
      })
      .catch((err) => {
        console.warn("Sanity fetch failed, using default content:", err);
        setStatus("fallback");
      });
  }, []);

  return { content, status };
}
