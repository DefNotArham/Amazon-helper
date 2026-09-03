import type { Product } from "../types/product-type";

type ProductPageProps = {
  product: Product;
};

export default function ProductPage({ product }: ProductPageProps) {
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

        {/* Status pill */}
        <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600 ring-1 ring-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Product found
        </span>
      </div>

      <div className="h-px w-full bg-slate-100" />

      {/* Main card */}
      <div className="px-5 py-6">
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
            AI insights ready — price history, reviews &amp; alternatives
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-slate-800 active:bg-slate-950"
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
