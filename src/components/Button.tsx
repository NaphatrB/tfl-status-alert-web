import type { ButtonHTMLAttributes, ReactNode } from "react";

export const Button = ({
  className,
  children,
  ...rest
}: { className?: string; children?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`bg-line-background text-line-foreground border border-line-foreground rounded-md px-1 py-0.5 ${className || ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};
