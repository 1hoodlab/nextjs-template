import Link from "next/link";
import { FileQuestion } from "lucide-react";

import { buttonVariants } from "@/widgets/ui/button/styles";

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

        <Link href="/" className={buttonVariants({ variant: "primary" })}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
