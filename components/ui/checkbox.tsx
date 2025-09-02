import * as React from "react";
export function Checkbox({ checked, onChange, className="" }:{checked?: boolean; onChange?: (v:boolean)=>void; className?: string}) {
  return (
    <input
      type="checkbox"
      checked={!!checked}
      onChange={(e)=>onChange?.(e.target.checked)}
      className={"h-4 w-4 rounded border-gray-300 " + className}
    />
  );
}
