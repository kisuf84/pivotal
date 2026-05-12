import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDLY_URL = "https://calendly.com/d/cyn4-rtj-mqn";

/**
 * Floating "Book a Clarity Call" button.
 * - Appears after the user scrolls past the hero.
 * - Hides automatically when the #contact section is in view, so it never
 *   overlaps the inline form / CTA already on screen.
 */
export const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.6;
      setVisible(scrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(false);
      },
      { threshold: 0.15 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed bottom-5 right-5 z-40 transition-all duration-300 md:bottom-8 md:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <Button
        variant="accent"
        size="lg"
        asChild
        className={`pointer-events-auto shadow-lg ${visible ? "" : "pointer-events-none"}`}
      >
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book a Clarity Call"
        >
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Book a Clarity Call</span>
          <span className="sm:hidden">Book a Call</span>
        </a>
      </Button>
    </div>
  );
};

export default FloatingCTA;
