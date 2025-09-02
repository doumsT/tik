import * as React from "react";
export function Card({ className = "", children }:{ className?: string; children: React.ReactNode }) {
  return <div className={"rounded-2xl bg-white shadow-soft " + className}>{children}</div>;
}
export function CardHeader({children, className=""}:{children: React.ReactNode; className?: string}) {
  return <div className={"px-5 pt-5 " + className}>{children}</div>;
}
export function CardContent({children, className=""}:{children: React.ReactNode; className?: string}) {
  return <div className={"px-5 pb-5 " + className}>{children}</div>;
}
export function CardTitle({children, className=""}:{children: React.ReactNode; className?: string}) {
  return <h3 className={"text-lg font-semibold " + className}>{children}</h3>;
}
