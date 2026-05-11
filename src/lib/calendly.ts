export const CALENDLY_URL = "https://calendly.com/d/cyn4-rtj-mqn";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

export function openCalendlyPopup() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    // Fallback: open in new tab if script hasn't loaded
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  }
}
