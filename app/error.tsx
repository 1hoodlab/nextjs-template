"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-semibold">Something went wrong!</h2>
        <p className="text-muted-foreground">
          {error.message || "An unexpected error occurred"}
        </p>
        {/* Only show digest in development */}
        {process.env.NODE_ENV === "development" && error.digest && (
          <p className="text-muted-foreground font-mono text-sm">
            Error digest: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
