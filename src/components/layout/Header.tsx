"use client";

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "var(--dark-surface)",
        borderColor: "var(--dark-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center -ml-6">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
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

          {/* Navigation and Social Links */}
          <div className="flex items-center gap-6 ml-auto">
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
                className="h-5 w-auto"
              />
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/company/105327048/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} style={{ color: "var(--foreground)" }} />
              </Link>

              <Link
                href="https://www.instagram.com/kartel_ai/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="Instagram"
              >
                <Instagram size={20} style={{ color: "var(--foreground)" }} />
              </Link>

              <Link
                href="https://x.com/kartel_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="X (Twitter)"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
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
