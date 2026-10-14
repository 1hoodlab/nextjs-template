type ButtonVariantProps = {
  variant?: "primary" | "ghost";
  className?: string;
};

export function buttonVariants({
  variant = "primary",
  className = "",
}: ButtonVariantProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
    ghost: "hover:bg-foreground/5 focus-visible:ring-foreground/20",
  };

  return [base, variants[variant], className].filter(Boolean).join(" ");
}
