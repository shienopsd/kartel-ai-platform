"use client";

import { useState } from "react";
import { X, Mail, Loader2 } from "lucide-react";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
  productTitle: string;
}

export default function EmailCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  productTitle,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(email);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div
        className="relative w-full max-w-md rounded-xl p-6"
        style={{
          background: "var(--dark-surface)",
          border: "1px solid var(--dark-border)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={20} style={{ color: "var(--foreground)", opacity: 0.6 }} />
        </button>

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto"
          style={{
            background: "linear-gradient(135deg, #1B2A4E 0%, #6366F1 100%)",
          }}
        >
          <Mail size={24} className="text-white" />
        </div>

        {/* Title */}
        <h2
          className="text-xl font-bold text-center mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Get Your Download
        </h2>

        {/* Subtitle */}
        <p
          className="text-sm text-center mb-6 opacity-70"
          style={{ color: "var(--foreground)" }}
        >
          Enter your email to download <strong>{productTitle}</strong> and receive updates on new releases.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{
                background: "var(--dark-elevated)",
                border: "1px solid var(--dark-border)",
              }}
              disabled={isSubmitting}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #1B2A4E 0%, #6366F1 100%)",
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Download Now"
            )}
          </button>
        </form>

        {/* Privacy note */}
        <p
          className="text-xs text-center mt-4 opacity-50"
          style={{ color: "var(--foreground)" }}
        >
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
