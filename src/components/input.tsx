import React from "react";

interface Props {
  children: React.ReactNode;
  type: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ children, type, required, onChange}: Props) {
  return (
    <>
      <label className="flex flex-col text-sm font-normal text-zinc-900 mb-1 gap-1">
        {children}
        <input
          type={type}
          required={required}
          onChange={onChange}
          className="p-2 w-full h-10 text-zinc-900 ring-1 ring-zinc-300 rounded-xl hover:ring-blue-500 focus:outline-blue-500"
        />
      </label>
    </>
  );
}
