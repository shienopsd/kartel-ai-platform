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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-sm opacity-60"
            style={{ color: "var(--foreground)" }}
          >
            © 2026 Kartel AI. All rights reserved.
          </p>

          <p
            className="text-sm opacity-60"
            style={{ color: "var(--foreground)" }}
          >
            Free workflows and plugins for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
