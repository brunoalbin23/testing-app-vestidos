"use client";

import { useState, FormEvent, useMemo } from "react";
import { useRouter } from "next/navigation";

type Props = {
  itemId: number;
  pricePerDay: number;
};

function calculateDaysDifference(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
}

export default function RentalForm({ itemId, pricePerDay }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { days, totalPrice } = useMemo(() => {
    const calculatedDays = calculateDaysDifference(start, end);
    const calculatedTotal = calculatedDays > 0 ? calculatedDays * pricePerDay : 0;
    return { days: calculatedDays, totalPrice: calculatedTotal };
  }, [start, end, pricePerDay]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("itemId", itemId.toString());
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("start", start);
      formData.append("end", end);

      const response = await fetch("/api/rentals", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        try {
          const data = await response.json();
          setError(data.error || "An error occurred. Please try again.");
        } catch {
          setError("An error occurred. Please try again.");
        }
        setIsSubmitting(false);
        return;
      }

      router.push(`/items/${itemId}?success=1`);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Rental request error:", err);
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl border p-4">
      <div className="sm:col-span-2">
        <label className="sr-only" htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Full name"
          className="w-full rounded-xl border px-4 py-3 text-sm"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="w-full rounded-xl border px-4 py-3 text-sm"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Phone"
          className="w-full rounded-xl border px-4 py-3 text-sm"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="start">Start date</label>
        <input
          id="start"
          name="start"
          type="date"
          value={start}
          onChange={(e) => {
            setStart(e.target.value);
            setError("");
          }}
          required
          className="w-full rounded-xl border px-4 py-3 text-sm"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="end">End date</label>
        <input
          id="end"
          name="end"
          type="date"
          value={end}
          onChange={(e) => {
            setEnd(e.target.value);
            setError("");
          }}
          required
          className="w-full rounded-xl border px-4 py-3 text-sm"
          disabled={isSubmitting}
        />
      </div>
      {error && (
        <div className="sm:col-span-2 rounded-xl border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20 p-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      {days > 0 && (
        <div className="sm:col-span-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Rental period: {days} {days === 1 ? "day" : "days"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                ${pricePerDay} × {days} {days === 1 ? "day" : "days"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                ${totalPrice.toFixed(2)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Total amount</p>
            </div>
          </div>
        </div>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto rounded-xl bg-fuchsia-600 text-white px-6 py-3 text-sm font-semibold hover:bg-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Request rental"}
        </button>
      </div>
      <p className="sm:col-span-2 mt-2 text-xs text-slate-500">
        No account required. We&apos;ll confirm availability via email.
      </p>
    </form>
  );
}

