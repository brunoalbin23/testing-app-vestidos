import Image from "next/image";
import { notFound } from "next/navigation";
import {getItem, getItemRentals} from "../../../../lib/RentalManagementSystem";
import ItemCalendar from "./ItemCalendar";
import {getOrCreateCsrfToken} from "../../../../lib/CsrfSessionManagement";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";

export default async function ItemDetail({params}: { params: Promise<{ id: string }> }) {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const item = getItem(id);
    if (!item) return notFound();

    // Generate CSRF token; cookie will be set if missing
    const csrf = await getOrCreateCsrfToken();

    const booked = await getItemRentals(id);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <Image src={item.images[0]} alt={item.alt} fill className="object-cover" priority/>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                        {item.images.slice(1).map((src: Key | StaticImport | null | undefined) => (
                            <div key={`${src}-${item.id}`}
                                 className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                                <Image src={src as StaticImport} alt={item.alt} fill className="object-cover"/>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{item.name}</h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400 capitalize">{item.category}</p>
          <p className="mt-4">{item.description}</p>
          <p className="mt-4 font-semibold">From ${item.pricePerDay}/day</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Sizes: {item.sizes.join(", ")}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Color: {item.color}{item.style ? ` • Style: ${item.style}` : ""}</p>

          <div className="mt-8">
            <h2 className="font-semibold mb-3">Availability</h2>
            <ItemCalendar itemId={id} />
            {booked.length > 0 && (
              <p className="mt-2 text-xs text-slate-500">Dates marked are already booked.</p>
            )}
          </div>

          <div className="mt-10">
            <h2 className="font-semibold mb-3">Schedule a rental</h2>
            <form action="/api/rentals" method="POST" className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl border p-4">
              <input type="hidden" name="itemId" value={id} />
              <input type="hidden" name="csrf" value={csrf} />
              <div className="sm:col-span-2">
                <label className="sr-only" htmlFor="name">Full name</label>
                <input id="name" name="name" required placeholder="Full name" className="w-full rounded-xl border px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="sr-only" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="Email" className="w-full rounded-xl border px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="sr-only" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" required placeholder="Phone" className="w-full rounded-xl border px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="sr-only" htmlFor="start">Start date</label>
                <input id="start" name="start" type="date" required className="w-full rounded-xl border px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="sr-only" htmlFor="end">End date</label>
                <input id="end" name="end" type="date" required className="w-full rounded-xl border px-4 py-3 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <button className="w-full sm:w-auto rounded-xl bg-fuchsia-600 text-white px-6 py-3 text-sm font-semibold hover:bg-fuchsia-500">
                  Request rental
                </button>
              </div>
            </form>
            <p className="mt-2 text-xs text-slate-500">No account required. We’ll confirm availability via email.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
