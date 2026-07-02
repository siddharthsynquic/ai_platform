import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Label } from "./label";

interface Props {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Thin wrapper for React Hook Form fields.
 * Usage:
 *   <FormField label="Email" htmlFor="email" error={errors.email?.message}>
 *     <Input id="email" {...register("email")} />
 *   </FormField>
 */
export function FormField({ label, htmlFor, error, hint, required, className, children }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
