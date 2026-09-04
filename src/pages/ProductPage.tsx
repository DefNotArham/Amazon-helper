import type { Product } from "../types/product-type";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type ProductPageProps = {
  product: Product;
};

type View = "product" | "loading" | "results";

function Header() {
  return (
    <>
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
    </>
  );
}

export default function ProductPage({ product }: ProductPageProps) {
  const [view, setView] = useState<View>("product");
  const [analysis, setAnalysis] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAnalyze = () => {
    setErrorMessage("");
    setView("loading");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;

      if (!tabId) {
        setErrorMessage("Couldn't read this tab. Try again.");
        setView("product");
        return;
      }

      chrome.tabs.sendMessage(
        tabId,
        { type: "GET_REVIEWS" },
        async (reviews) => {
          try {
            const response = await fetch("http://127.0.0.1:8000/analyze", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                product,
                reviews,
              }),
            });

            if (!response.ok) {
              throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log("BACKEND RESPONSE:", data);
            setAnalysis(data.analysis);
            setView("results");
          } catch (error) {
            console.error("ANALYSIS ERROR:", error);
            setErrorMessage("Something went wrong. Please try again.");
            setView("product");
          }
        },
      );
    });
  };

  // ---- Page 2: Loading screen ----
  if (view === "loading") {
    return (
      <div className="w-[380px] max-w-full bg-gradient-to-b from-slate-50 to-white text-slate-900 font-sans antialiased">
        <Header />
        <div className="flex flex-col items-center justify-center px-8 py-16">
          <div className="relative flex h-14 w-14 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="h-14 w-14 animate-spin text-slate-900"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth={2.5}
                className="opacity-15"
              />
              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="mt-5 text-[14px] font-semibold text-slate-900">
            Analyzing Product...
          </p>
          <p className="mt-1.5 max-w-[260px] text-center text-[12px] leading-relaxed text-slate-500">
            We're reading customer reviews and generating AI insights.
          </p>
        </div>
      </div>
    );
  }

  // ---- Page 3: AI Results screen ----
  if (view === "results") {
    return (
      <div className="w-[380px] max-w-full bg-gradient-to-b from-slate-50 to-white text-slate-900 font-sans antialiased">
        <Header />

        <div className="px-5 py-6">
          {/* Results header */}
          <div className="flex items-center gap-1.5 px-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-orange-500"
            >
              <path d="M12 2 13.8 8.2 20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
              <path d="M19 15l.7 2.3L22 18l-2.3.7-.7 2.3-.7-2.3L16 18l2.3-.7.7-2.3Z" />
            </svg>
            <p className="text-[14px] font-semibold text-slate-900">
              AI Insights
            </p>
          </div>
          <p className="mt-0.5 px-0.5 text-[10.5px] text-slate-400">
            Based on product details &amp; customer reviews
          </p>

          {/* Results card */}
          <div className="mt-3 max-h-72 overflow-y-auto rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
            <p className="whitespace-pre-wrap text-[12.5px] leading-relaxed text-slate-700">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </p>
          </div>

          {/* Back button */}
          <button
            type="button"
            onClick={() => setView("product")}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 shadow-sm transition-colors duration-150 hover:bg-slate-50 active:bg-slate-100 cursor-pointer"
          >
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
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back to Product
          </button>
        </div>
      </div>
    );
  }

  // ---- Page 1: Product screen (default) ----
  return (
    <div className="w-[380px] max-w-full bg-gradient-to-b from-slate-50 to-white text-slate-900 font-sans antialiased">
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

        {/* Status pill */}
        <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600 ring-1 ring-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Product found
        </span>
      </div>

      <div className="h-px w-full bg-slate-100" />

      {/* Main card */}
      <div className="px-5 py-6">
        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-[11.5px] leading-snug text-red-600">
            {errorMessage}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]">
          {/* Title */}
          <h2 className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-slate-900">
            {product.title}
          </h2>

          {/* Price + rating row */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[19px] font-bold tracking-tight text-slate-900">
              ${product.price}
            </p>

            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 ring-1 ring-amber-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 text-amber-500"
              >
                <path d="M12 2.5l2.9 6.4 7 .7-5.3 4.7 1.6 6.9L12 17.8l-6.2 3.4 1.6-6.9L2.1 9.6l7-.7L12 2.5z" />
              </svg>
              <span className="text-[12px] font-semibold text-amber-700">
                {product.rating}
              </span>
            </div>
          </div>

          <div className="my-4 h-px w-full bg-slate-100" />

          {/* Quick facts strip */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 shrink-0 text-slate-400"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l2.5 2.5" />
            </svg>
            AI analysis based on product details and customer reviews
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={handleAnalyze}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-slate-800 active:bg-slate-950 cursor-pointer"
        >
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
            <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" />
          </svg>
          Analyze Product
        </button>

        <p className="mt-3 text-center text-[10.5px] text-slate-400">
          Analysis usually takes a few seconds
        </p>
      </div>
    </div>
  );
}
