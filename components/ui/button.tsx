import * as React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean };
export function Button({ className = "", ...props }: Props) {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium shadow-soft transition hover:opacity-90 active:opacity-80 " +
        "bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed " + className
      }
      {...props}
    />
  );
}
