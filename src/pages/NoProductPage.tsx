import React from "react";

/**
 * NoProductPage
 *
 * Shown inside the Amazon Helper Chrome extension popup when the user
 * opens the extension while NOT on an individual Amazon product page.
 *
 * UI only — no routing, no backend calls.
 */
const NoProductPage: React.FC = () => {
  const handleGoToAmazon = () => {
    window.open("https://www.amazon.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-[380px] max-w-full bg-gradient-to-b from-slate-50 to-white text-slate-900 font-sans antialiased">
      {/* Header / Brand */}
      <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 shadow-sm shadow-orange-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4.5 w-4.5"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
          </svg>
        </div>
        <div className="leading-tight">
          <p className="text-[13.5px] font-semibold tracking-tight text-slate-900">
            Amazon Helper
          </p>
          <p className="text-[10.5px] font-medium text-slate-400">
            AI Shopping Assistant
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-slate-100" />

      {/* Main card */}
      <div className="px-5 py-6">
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
          {/* Illustration */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 ring-1 ring-slate-200/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-slate-400"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
              <line
                x1="4"
                y1="20"
                x2="20"
                y2="4"
                strokeWidth={1.5}
                className="text-orange-400"
                stroke="currentColor"
              />
            </svg>
          </div>

          {/* Message */}
          <div className="text-center">
            <h1 className="text-[15px] font-semibold text-slate-900">
              No Product Detected
            </h1>
            <p className="mx-auto mt-2 max-w-[260px] text-[13px] leading-relaxed text-slate-500">
              We couldn't find an Amazon product on this tab. Open a product
              page on Amazon, then reopen the extension to get started.
            </p>
          </div>

          {/* Steps */}
          <div className="mt-5 space-y-2.5 rounded-xl bg-slate-50 p-3.5">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[10px] font-semibold text-orange-600">
                1
              </span>
              <p className="text-[12px] leading-snug text-slate-600">
                Go to <span className="font-medium text-slate-800">Amazon</span>{" "}
                and open any product listing
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[10px] font-semibold text-orange-600">
                2
              </span>
              <p className="text-[12px] leading-snug text-slate-600">
                Click the{" "}
                <span className="font-medium text-slate-800">
                  Amazon Helper
                </span>{" "}
                icon again
              </p>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={handleGoToAmazon}
            className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-slate-800 active:bg-slate-950"
          >
            Go to Amazon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </button>
        </div>

        {/* Footer hint */}
        <p className="mt-4 text-center text-[10.5px] text-slate-400">
          Works automatically on any Amazon product page
        </p>
      </div>
    </div>
  );
};

export default NoProductPage;
