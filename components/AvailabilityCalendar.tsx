"use client";

import { useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
    selectedDate: string; // "YYYY-MM-DD" alebo ""
    blockedDates: string[]; // zo Sanity: ["2026-03-13", ...].
    onSelect: (ymd: string) => void;
};

function toYMDLocal(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export default function AvailabilityCalendar({ selectedDate, blockedDates, onSelect }: Props) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayYMD = toYMDLocal(today);

    const blockedSet = useMemo(() => {
        return new Set((blockedDates || []).filter(Boolean));
    }, [blockedDates]);

    const selected = selectedDate ? new Date(selectedDate + "T00:00:00") : undefined;

    return (
        <div className="rounded-xl border border-white/10 bg-zinc-900/30 p-4">
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

            <DayPicker
                mode="single"
                weekStartsOn={1}
                showOutsideDays
                selected={selected}
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
                classNames={{
                    months: "flex justify-center",
                    month: "space-y-4",
                    caption: "flex items-center justify-between px-1",
                    caption_label: "text-sm font-semibold text-white",
                    nav: "flex items-center gap-1",
                    nav_button:
                        "h-8 w-8 inline-flex items-center justify-center rounded-md border border-white/10 text-white/80 hover:bg-white/10 transition",
                    table: "w-full border-collapse",
                    head_row: "flex",
                    head_cell:
                        "w-10 text-[10px] uppercase tracking-[0.12em] text-zinc-500 font-semibold text-center",
                    row: "flex w-full mt-2",
                    cell: "w-10 h-10 p-0 text-center",
                    day: "w-10 h-10 rounded-lg border border-transparent text-sm font-light text-white hover:bg-white/10 transition",
                    day_today: "outline outline-1 outline-white/20 outline-offset-[-2px]",
                    day_outside: "text-zinc-700",
                    day_disabled: "opacity-100",
                    day_selected: "bg-white text-black border border-white hover:bg-white",
                }}
            />
        </div>
    );
}