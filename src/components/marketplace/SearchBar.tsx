"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search workflows and plugins...",
}: SearchBarProps) {
  const [value, setValue] = useState("");

  const debouncedSearch = useDebouncedCallback((query: string) => {
    onSearch(query);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div
      className="relative w-full max-w-2xl"
      style={{
        position: "relative",
        zIndex: 10,
        isolation: "isolate",
      }}
    >
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40"
        size={20}
        style={{ color: "var(--foreground)" }}
      />

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
        style={{
          background: "var(--dark-surface)",
          borderColor: "var(--dark-border)",
          color: "var(--foreground)",
          "--tw-ring-color": "var(--accent-primary)",
        } as React.CSSProperties}
      />

      {value && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Clear search"
        >
          <X size={20} style={{ color: "var(--foreground)" }} />
        </button>
      )}
    </div>
  );
}
