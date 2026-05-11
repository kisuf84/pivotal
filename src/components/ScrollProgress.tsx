import { useEffect, useState } from "react";

/**
 * Thin progress indicator at the very top of the viewport that tracks
 * how far the user has scrolled through the page. Subtle structural cue.
 */
export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
    >
      <div
        className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress / 100})`, width: "100%" }}
      />
    </div>
  );
};

export default ScrollProgress;