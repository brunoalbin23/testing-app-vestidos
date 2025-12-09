import Link from "next/link";
import Image from "next/image";
import { listItems, type Category } from "../../../lib/RentalManagementSystem";
import {
  ALLOWED_CATEGORIES,
  ALLOWED_SIZES,
  ALLOWED_COLORS,
  ALLOWED_STYLES,
} from "../../../lib/filters-config";

type SearchParams = {
  q?: string;
  category?: Category | "";
  size?: string;
  color?: string;
  style?: string;
  start?: string;
  end?: string;
};

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolvedParams = await searchParams;
  const { q = "", category = "", size = "", color = "", style = "" } = resolvedParams;

  const items = listItems({
    q,
    category: category || undefined,
    size: size || undefined,
    color: color || undefined,
    style: style || undefined,
  });

  const hasActiveFilters = category || size || color || style || q;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold">Browse catalog</h1>

      <form method="GET" className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">

          {/* Search input */}
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by name, color, or style…"
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm"
          />

          {/* CATEGORY */}
          <select
            name="category"
            defaultValue={category}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          >
            <option value="">All categories</option>
            {ALLOWED_CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          {/* SIZE */}
          <select
            name="size"
            defaultValue={size}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          >
            <option value="">Any size</option>
            {ALLOWED_SIZES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* COLOR */}
          <select
            name="color"
            defaultValue={color}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          >
            <option value="">Any color</option>
            {ALLOWED_COLORS.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* STYLE */}
          <select
            name="style"
            defaultValue={style}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-900"
          >
            <option value="">Any style</option>
            {ALLOWED_STYLES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-xl bg-fuchsia-600 text-white px-4 py-2 text-sm font-medium hover:bg-fuchsia-500 transition-colors"
          >
            Search
          </button>
        </div>
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-600 dark:text-slate-400">Active filters:</span>
            {category && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 text-xs">
                Category: {category === "dress" ? "Dresses" : category === "shoes" ? "Shoes" : category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            )}
            {size && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 text-xs">
                Size: {size}
              </span>
            )}
            {color && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 text-xs">
                Color: {color.charAt(0).toUpperCase() + color.slice(1)}
              </span>
            )}
            {style && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 text-xs">
                Style: {style.charAt(0).toUpperCase() + style.slice(1).replace(/-/g, " ")}
              </span>
            )}
            <a 
              href="/search" 
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 underline"
            >
              Clear all
            </a>
          </div>
        )}
      </form>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {items.length === 0 
              ? "No items found" 
              : items.length === 1 
              ? "1 item found" 
              : `${items.length} items found`}
            {hasActiveFilters && " with current filters"}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800">
                <Image src={it.images[0]} alt={it.alt} fill className="object-cover" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-100 shadow-sm">
                    From ${it.pricePerDay}/day
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{it.category}</p>
                <p className="font-medium mt-1">{it.name}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Sizes: {it.sizes.join(", ")}</p>
                {it.style && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">Style: {it.style.replace(/-/g, " ")}</p>
                )}
                <div className="mt-3">
                  <Link href={`/items/${it.id}`} className="text-sm rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 inline-block transition-colors">
                    View details
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-base text-slate-600 dark:text-slate-400 mb-2">No items match your filters.</p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">Try adjusting your search criteria or clear the filters.</p>
              <a 
                href="/search" 
                className="inline-flex items-center rounded-xl bg-fuchsia-600 text-white px-4 py-2 text-sm font-medium hover:bg-fuchsia-500 transition-colors"
              >
                Clear all filters
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
