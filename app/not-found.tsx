import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <FileQuestion className="text-muted-foreground h-12 w-12" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">404</h2>
          <p className="text-xl">Page Not Found</p>
        </div>

        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
