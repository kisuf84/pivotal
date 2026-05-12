import { useState, useRef } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const CALENDLY_URL = "https://calendly.com/d/cyn4-rtj-mqn";

const STAGES = [
  "Pre-revenue",
  "Under $500K",
  "$500K – $1M",
  "$1M – $5M",
  "$5M – $10M",
  "$10M+",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  stage: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(1500),
});

type Field = "name" | "email" | "company" | "stage" | "message";

export const ContactForm = () => {
  const [values, setValues] = useState({ name: "", email: "", company: "", stage: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<Field, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as Field;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      // Focus the first invalid field for keyboard/SR users.
      const firstKey = Object.keys(fieldErrors)[0];
      if (firstKey && formRef.current) {
        const el = formRef.current.querySelector<HTMLElement>(`#${firstKey}`);
        el?.focus();
      }
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      // Simulated submission — wire to a backend later if needed.
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
      toast({ title: "Message received", description: "We'll be in touch within 48 hours." });
      setValues({ name: "", email: "", company: "", stage: "", message: "" });
    } catch (err) {
      setSubmitError("Something went wrong. Please try again, or book a Clarity Call directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className="rounded-lg border border-border bg-background p-8">
        <p className="text-lg font-semibold text-foreground">Thank you.</p>
        <p className="mt-2 text-ink-soft">
          Your message has been received. We'll get back to you within 48 hours.
          If you'd like to move faster, you can also book a Clarity Call directly.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="accent" asChild>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Clarity Call
            </a>
          </Button>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting} className="rounded-lg border border-border bg-background p-6 md:p-8 space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={values.name} onChange={onChange("name")} maxLength={100} className="mt-2" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <p id="name-error" className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={values.email} onChange={onChange("email")} maxLength={255} className="mt-2" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <p id="email-error" className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="company">Company <span className="text-ink-soft font-normal">(optional)</span></Label>
          <Input id="company" value={values.company} onChange={onChange("company")} maxLength={120} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="stage">Business stage <span className="text-ink-soft font-normal">(optional)</span></Label>
          <select
            id="stage"
            value={values.stage}
            onChange={onChange("stage")}
            className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
          >
            <option value="">Select revenue range</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="message">How can we help?</Label>
        <Textarea id="message" rows={5} value={values.message} onChange={onChange("message")} maxLength={1500} className="mt-2" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && <p id="message-error" className="mt-1 text-xs text-destructive">{errors.message}</p>}
      </div>
      <div aria-live="polite" className="min-h-[1.25rem]">
        {submitError && <p className="text-sm text-destructive">{submitError}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button type="submit" variant="accent" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
        <span className="text-xs text-ink-soft">We typically reply within 48 hours.</span>
      </div>
    </form>
  );
};

export default ContactForm;