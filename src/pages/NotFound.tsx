import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen items-center bg-background text-foreground">
      <div className="container-prose py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">404 · Not found</span>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
            This page isn't{" "}
            <span className="bg-accent px-2 box-decoration-clone">where it should be</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">
            The link may be outdated, or the page may have moved. Either way,
            let's get you back to something useful.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="accent" size="lg" asChild>
              <a href="/">Return home</a>
            </Button>
            <a
              href="/#contact"
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
