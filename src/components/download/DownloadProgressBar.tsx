"use client";

import { useDownloadContext } from "@/contexts/DownloadContext";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

export default function DownloadProgressBar() {
  const {
    isDownloading,
    progress,
    fileName,
    productTitle,
    error,
    clearError,
    cancelDownload,
  } = useDownloadContext();

  if (!isDownloading && !error) {
    return null;
  }

  const isComplete = progress === 100;
  const barColor = error ? "#EF4444" : isComplete ? "#10B981" : "#6366F1";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "#0E1028",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* Progress Bar */}
      <div className="relative h-1 w-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: "#0E1028" }} />

        <div
          className="absolute top-0 left-0 h-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: barColor,
            boxShadow: `0 0 10px ${barColor}`,
          }}
        />
      </div>

      {/* Info Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          {error ? (
            <AlertCircle size={20} className="text-red-500" />
          ) : isComplete ? (
            <CheckCircle2 size={20} className="text-green-500" />
          ) : (
            <div
              className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
              style={{
                borderColor: "#6366F1",
                borderTopColor: "transparent",
              }}
            />
          )}

          <div className="flex flex-col">
            <p className="text-sm font-medium text-white">
              {error
                ? "Download Failed"
                : isComplete
                ? "Download Complete"
                : `Downloading ${productTitle || fileName}...`}
            </p>
            {!error && (
              <p className="text-xs opacity-60 text-white">
                {isComplete ? fileName : `${Math.round(progress)}% complete`}
              </p>
            )}
            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>
        </div>

        <button
          onClick={error ? clearError : cancelDownload}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          aria-label={error ? "Dismiss" : "Cancel download"}
        >
          <X size={18} className="text-white/60 hover:text-white" />
        </button>
      </div>
    </div>
  );
}
