"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Menu } from "lucide-react";

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--dark-surface)",
        borderColor: "var(--dark-border)",
      }}
    >
      <div className="w-full">
        <div className="flex items-center h-14 md:h-16">
          {/* Mobile: Menu Button + Logo */}
          <div className="flex items-center gap-2 md:hidden px-4">
            {/* Hamburger Menu - Mobile Only */}
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg transition-colors hover:bg-white/10 -ml-2"
              aria-label="Open menu"
            >
              <Menu size={24} style={{ color: "var(--foreground)" }} />
            </button>

            {/* Logo - Mobile */}
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/kartel-labs-new.png"
                alt="Kartel Labs"
                width={1500}
                height={551}
                priority
                className="h-[40px] w-auto"
              />
            </Link>
          </div>

          {/* Desktop: Logo positioned to the right of sidebar (w-64 = 256px) */}
          <div className="hidden md:flex items-center" style={{ marginLeft: "256px", paddingLeft: "2rem" }}>
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Image
                src="/kartel-labs-new.png"
                alt="Kartel Labs"
                width={1500}
                height={551}
                priority
                className="h-[60px] w-auto"
              />
            </Link>
          </div>

          {/* Desktop: Social Links - Positioned on the right */}
          <div className="hidden md:flex items-center gap-4 md:gap-6 ml-auto px-4 sm:px-6 lg:px-8">
            {/* Kartel AI Logo */}
            <Link
              href="https://www.kartel.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center transition-opacity hover:opacity-70"
              aria-label="Kartel AI Main Site"
            >
              <Image
                src="/kartel-labs-logo.png"
                alt="Kartel AI"
                width={116}
                height={20}
                className="h-4 md:h-5 w-auto"
              />
            </Link>

            <div className="flex items-center gap-3 md:gap-4">
              <Link
                href="https://www.linkedin.com/company/105327048/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="md:w-5 md:h-5" style={{ color: "var(--foreground)" }} />
              </Link>

              <Link
                href="https://www.instagram.com/kartel_ai/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="Instagram"
              >
                <Instagram size={18} className="md:w-5 md:h-5" style={{ color: "var(--foreground)" }} />
              </Link>

              <Link
                href="https://x.com/kartel_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="X (Twitter)"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="md:w-5 md:h-5"
                  style={{ color: "var(--foreground)" }}
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
