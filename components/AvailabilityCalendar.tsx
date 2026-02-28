"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
    selectedDate: string; // "YYYY-MM-DD" alebo ""
    blockedDates: string[]; // zo Sanity: ["2026-03-13", ...]
    onSelect: (ymd: string) => void;
};

function toYMDLocal(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function addMonthsSafe(base: Date, delta: number): Date {
    return new Date(base.getFullYear(), base.getMonth() + delta, 1);
}

function EmptyNav() {
    return <></>;
}

export default function AvailabilityCalendar({ selectedDate, blockedDates, onSelect }: Props) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayYMD = toYMDLocal(today);

    const blockedSet = useMemo(() => new Set((blockedDates || []).filter(Boolean)), [blockedDates]);

    const selected = selectedDate ? new Date(selectedDate + "T00:00:00") : undefined;

    const [month, setMonth] = useState<Date>(() => {
        const base = selected ?? today;
        return new Date(base.getFullYear(), base.getMonth(), 1);
    });

    return (
        <div className="inline-block w-fit max-w-full rounded-xl border border-white/10 bg-zinc-900/30 p-4">
            <div className="mb-3 flex flex-wrap gap-3 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-green-500/70" />
                    Voľné dni
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-zinc-500/70" />
                    Obsadené
                </div>
            </div>

            {/* +3px doľava aj doprava */}
            <div className="w-fit max-w-full px-[3px]">
                <DayPicker
                    mode="single"
                    weekStartsOn={1}
                    showOutsideDays
                    selected={selected}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                        if (!date) return;
                        onSelect(toYMDLocal(date));
                    }}
                    disabled={(date) => {
                        const ymd = toYMDLocal(date);
                        if (ymd < todayYMD) return true; // minulé dni
                        if (blockedSet.has(ymd)) return true; // obsadené dni
                        return false;
                    }}
                    modifiers={{
                        blocked: (date) => blockedSet.has(toYMDLocal(date)),
                        available: (date) => {
                            const ymd = toYMDLocal(date);
                            return ymd >= todayYMD && !blockedSet.has(ymd);
                        },
                    }}
                    modifiersClassNames={{
                        available:
                            "bg-green-500/10 text-green-200 border border-green-500/20 hover:bg-green-500/20",
                        blocked:
                            "bg-zinc-500/20 text-zinc-500 border border-zinc-500/20 line-through cursor-not-allowed",
                    }}
                    components={{
                        Nav: EmptyNav,
                    }}
                    classNames={{
                        months: "flex justify-center",
                        month: "space-y-4",
                        caption: "flex items-center justify-center px-3",
                        caption_label: "text-sm font-semibold text-white w-full text-left pl-[30px]",

                        table: "w-fit border-collapse",
                        head_row: "flex",
                        head_cell:
                            "w-6 text-[10px] uppercase tracking-[0.12em] text-zinc-400 font-semibold text-center",
                        row: "flex w-full mt-2",
                        cell: "w-6 h-6 p-0 text-center",
                        day: "w-60 h-6 rounded-lg border border-transparent text-sm font-light text-white hover:bg-white/6 transition",
                        day_today: "outline outline-1 outline-white/20 outline-offset-[-2px]",
                        day_outside: "text-zinc-700",
                        day_disabled: "opacity-100",
                        day_selected: "bg-white text-black border border-white hover:bg-white",
                    }}
                />

                <div className="mt-3 flex items-center justify-center gap-6">
                    <button
                        type="button"
                        aria-label="Predošlý mesiac"
                        onClick={() => setMonth((m) => addMonthsSafe(m, -1))}
                        className="text-blue-500 hover:text-blue-400 transition text-3xl leading-none"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        aria-label="Ďalší mesiac"
                        onClick={() => setMonth((m) => addMonthsSafe(m, 1))}
                        className="text-blue-500 hover:text-blue-400 transition text-3xl leading-none"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}