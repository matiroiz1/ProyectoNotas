import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ErrorAlert from "./error";
import ExtraAlert from "./extraAlert";

type AppError = {
  title?: string;
  message: string;
  variant?: string;
};

export default function ErrorContainer() {
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<AppError>;
      setError(custom.detail || { message: "An unexpected error occurred." });
    };

    window.addEventListener("appError", handler as EventListener);
    return () => window.removeEventListener("appError", handler as EventListener);
  }, []);

  if (!error) return null;

  // choose component based on variant
  const variant = (error.variant as any) || "danger";

  return (
    <Container style={{ position: "fixed", top: 12, right: 12, zIndex: 2000, width: 360 }}>
      <ErrorAlert title={error.title} message={error.message} variant={variant as any} />
    </Container>
  );
}
