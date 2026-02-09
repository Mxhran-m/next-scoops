import * as React from "react";

import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card text-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn("p-6", className)} {...props} />;
}

export { Card, CardContent };
