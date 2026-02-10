"use client";

import { ArrowUpDown } from "lucide-react";
import { SortOption, SortConfig } from "@/types";
import { useState, useRef, useEffect } from "react";

interface SortDropdownProps {
  value: SortOption;
  onChange: (option: SortOption) => void;
}

const SORT_OPTIONS: SortConfig[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "date-newest", label: "Newest First" },
  { value: "date-oldest", label: "Oldest First" },
  { value: "downloads-desc", label: "Most Downloaded" },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      style={{
        position: "relative",
        zIndex: 10,
        isolation: "isolate",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all hover:opacity-80"
        style={{
          background: "var(--dark-surface)",
          borderColor: "var(--dark-border)",
          color: "var(--foreground)",
        }}
      >
        <ArrowUpDown size={16} />
        <span className="text-sm font-medium">
          Sort: {selectedOption?.label}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-lg border shadow-lg overflow-hidden z-50"
          style={{
            background: "var(--dark-surface)",
            borderColor: "var(--dark-border)",
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm transition-all hover:opacity-80"
              style={{
                background:
                  value === option.value
                    ? "var(--gradient-card-hover)"
                    : "transparent",
                color: "var(--foreground)",
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
