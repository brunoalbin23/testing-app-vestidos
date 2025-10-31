"use client";

import { useEffect, useState } from "react";

type Props = { itemId: number };

type Range = { start: string; end: string };

function toISO(d: Date) {
  return d.toISOString().slice(0, 10);
}

function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];
  
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const endDate = new Date(lastDay);
  const daysToAdd = 6 - endDate.getDay();
  endDate.setDate(endDate.getDate() + daysToAdd);
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  
  return days;
}

function getMonthName(date: Date): string {
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export default function ItemCalendar({ itemId }: Props) {
  const [busy, setBusy] = useState<Range[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetch(`/api/items/${itemId}/availability`)
      .then((r) => r.json())
      .then((data) => setBusy(data.rentals ?? []))
      .catch(() => setBusy([]));
  }, [itemId]);

  const today = new Date();
  const days = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  function isBooked(date: Date) {
    const iso = toISO(date);
    return busy.some((r) => r.start <= iso && iso <= r.end);
  }

  function isCurrentMonth(date: Date): boolean {
    return date.getFullYear() === currentMonth.getFullYear() && 
           date.getMonth() === currentMonth.getMonth();
  }

  function isToday(date: Date): boolean {
    const todayISO = toISO(today);
    const dateISO = toISO(date);
    return todayISO === dateISO;
  }

  function goToPreviousMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  }

  function goToToday() {
    setCurrentMonth(new Date());
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthName = getMonthName(currentMonth);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {monthName}
          </h3>
          {currentMonth.getMonth() !== today.getMonth() || 
           currentMonth.getFullYear() !== today.getFullYear() ? (
            <button
              onClick={goToToday}
              className="text-xs text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
            >
              Today
            </button>
          ) : null}
        </div>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="space-y-1 min-h-[20rem]">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d, idx) => {
            const booked = isBooked(d);
            const isCurrentMonthDate = isCurrentMonth(d);
            const isTodayDate = isToday(d);
            
            return (
              <div
                key={`${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${idx}`}
                title={toISO(d)}
                className={`text-center text-xs rounded-md px-1 py-2 min-h-[2.5rem] flex flex-col items-center justify-center transition-colors ${
                  !isCurrentMonthDate
                    ? "text-slate-400 dark:text-slate-600 opacity-50"
                    : booked
                    ? "bg-rose-200 text-rose-800 dark:bg-rose-900/60 dark:text-rose-100 border-2 border-rose-400 dark:border-rose-700 font-medium"
                    : isTodayDate
                    ? "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-200 font-semibold ring-2 ring-fuchsia-500"
                    : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span>{d.getDate()}</span>
                {booked && isCurrentMonthDate && (
                  <span className="text-[10px] mt-0.5">Booked</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
