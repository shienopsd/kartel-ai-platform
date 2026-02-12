import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t"
      style={{
        background: "var(--dark-surface)",
        borderColor: "var(--dark-border)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Social Links - Visible on mobile, hidden on desktop (already in header) */}
        <div className="flex items-center justify-center gap-6 mb-6 md:hidden">
          <Link
            href="https://www.kartel.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
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

          <Link
            href="https://www.linkedin.com/company/105327048/admin/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} style={{ color: "var(--foreground)" }} />
          </Link>

          <Link
            href="https://www.instagram.com/kartel_ai/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            aria-label="Instagram"
          >
            <Instagram size={22} style={{ color: "var(--foreground)" }} />
          </Link>

          <Link
            href="https://x.com/kartel_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
            aria-label="X (Twitter)"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: "var(--foreground)" }}
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
        </div>

        {/* Copyright and Tagline */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-sm opacity-60 text-center md:text-left"
            style={{ color: "var(--foreground)" }}
          >
            © 2026 Kartel AI. All rights reserved.
          </p>

          <p
            className="text-sm opacity-60 text-center md:text-right"
            style={{ color: "var(--foreground)" }}
          >
            Free workflows and plugins for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
