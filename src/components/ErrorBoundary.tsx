import { Component, type ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("Site error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "4rem auto" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Something went wrong.</h1>
          <p style={{ marginTop: "1rem", color: "#666" }}>
            The page encountered an error. Please try refreshing.
          </p>
          <pre style={{ marginTop: "1rem", fontSize: "0.75rem", color: "#999", whiteSpace: "pre-wrap" }}>
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: "1.5rem", padding: "0.5rem 1.25rem", background: "#000", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" }}
          >
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
