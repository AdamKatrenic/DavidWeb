"use client";

import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  selectedDate: string;
  blockedDates: string[];
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

const MONTH_SK: Record<number, string> = {
  0: "Január", 1: "Február", 2: "Marec", 3: "Apríl",
  4: "Máj", 5: "Jún", 6: "Júl", 7: "August",
  8: "September", 9: "Október", 10: "November", 11: "December",
};

export default function AvailabilityCalendar({
  selectedDate,
  blockedDates,
  onSelect,
}: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayYMD = toYMDLocal(today);

  const blockedSet = useMemo(
    () => new Set((blockedDates || []).filter(Boolean)),
    [blockedDates]
  );

  const selected = selectedDate
    ? new Date(selectedDate + "T00:00:00")
    : undefined;

  const [month, setMonth] = useState<Date>(() => {
    const base = selected ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const monthLabel = `${MONTH_SK[month.getMonth()]} ${month.getFullYear()}`;

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        width: "100%",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            fontSize: "17px",
            fontWeight: 700,
            color: "#f0f0f0",
            letterSpacing: "-0.02em",
          }}
        >
          {monthLabel}
        </div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginTop: "2px",
          }}
        >
          Vyberte termín
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "18px",
          padding: "10px 12px",
          background: "rgba(255,255,255,0.02)",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.04)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 8px rgba(16,185,129,0.7)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#10b981",
            }}
          >
            Voľné
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            Obsadené
          </span>
        </div>
      </div>

      {/* Calendar */}
      <style>{`
        .rdp-custom { width: 100%; }
        .rdp-custom .rdp { margin: 0; padding: 0; width: 100%; }
        .rdp-custom .rdp-months { justify-content: flex-start; width: 100%; }
        .rdp-custom .rdp-month { width: 100%; }
        .rdp-custom .rdp-month_caption,
        .rdp-custom .rdp-caption,
        .rdp-custom [class*="caption"] { display: none !important; }
        .rdp-custom table { width: 100%; border-collapse: collapse; margin: 0; padding: 0; }
        .rdp-custom .rdp-head_row { display: flex; gap: 5px; margin-bottom: 6px; width: 100%; }
        .rdp-custom .rdp-weekdays,
        .rdp-custom .rdp-weeks { width: 100%; }
        .rdp-custom .rdp-head_cell {
          flex: 1;
          min-width: 0;
          text-align: center;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          padding: 0;
        }
        .rdp-custom .rdp-tbody { display: flex; flex-direction: column; gap: 4px; width: 100%; }
        .rdp-custom .rdp-row { display: flex; gap: 5px; width: 100%; }
        .rdp-custom .rdp-cell { flex: 1; min-width: 0; height: 40px; padding: 0; text-align: center; }
        .rdp-custom .rdp-button {
          width: 100% !important;
          height: 40px !important;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.18s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: inherit;
        }
        .rdp-custom .rdp-button:hover:not([disabled]) {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }
        /* Today */
        .rdp-custom .rdp-day_today:not(.rdp-day_selected) {
          color: #fbbf24 !important;
          font-weight: 700 !important;
          background: rgba(251,191,36,0.08) !important;
          border-color: rgba(251,191,36,0.3) !important;
        }
        /* Available */
        .rdp-custom .rdp-day_available:not(.rdp-day_disabled):not(.rdp-day_outside) {
          background: rgba(16,185,129,0.05);
          border-color: rgba(16,185,129,0.12);
          color: rgba(209,250,229,0.7);
        }
        .rdp-custom .rdp-day_available:not(.rdp-day_disabled):not(.rdp-day_outside):hover {
          background: rgba(16,185,129,0.15) !important;
          border-color: rgba(16,185,129,0.3) !important;
          color: #d1fae5 !important;
          box-shadow: 0 0 16px rgba(16,185,129,0.12);
        }
        /* Blocked */
        .rdp-custom .rdp-day_blocked,
        .rdp-custom .rdp-day_disabled:not(.rdp-day_outside) {
          background: rgba(255,255,255,0.02) !important;
          border-color: rgba(255,255,255,0.03) !important;
          color: rgba(255,255,255,0.15) !important;
          text-decoration: line-through;
          cursor: not-allowed !important;
          opacity: 0.5;
        }
        /* Outside days */
        .rdp-custom .rdp-day_outside {
          color: rgba(255,255,255,0.1) !important;
          opacity: 0.4;
          pointer-events: none;
        }
        /* Selected */
        .rdp-custom .rdp-day_selected,
        .rdp-custom .rdp-day_selected:hover {
          background: #10b981 !important;
          border-color: #10b981 !important;
          color: #000 !important;
          font-weight: 700 !important;
          box-shadow: 0 0 24px rgba(16,185,129,0.45), 0 4px 12px rgba(0,0,0,0.3) !important;
        }
        /* Remove blue focus ring */
        .rdp-custom .rdp-button:focus,
        .rdp-custom .rdp-button:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>

      <div className="rdp-custom" style={{ marginLeft: "-16px", paddingLeft: 0 }}>
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
            if (ymd < todayYMD) return true;
            if (blockedSet.has(ymd)) return true;
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
            available: "rdp-day_available",
            blocked: "rdp-day_blocked",
          }}
          components={{ Nav: EmptyNav }}
        />
      </div>

      {/* Navigation arrows — below calendar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "16px",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <button
          type="button"
          aria-label="Predošlý mesiac"
          onClick={() => setMonth((m) => addMonthsSafe(m, -1))}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "10px",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontSize: "18px",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            lineHeight: 1,
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(16,185,129,0.12)";
            (e.currentTarget as HTMLButtonElement).style.color = "#10b981";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(16,185,129,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
          }}
        >
          ‹
        </button>

        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          {monthLabel}
        </span>

        <button
          type="button"
          aria-label="Ďalší mesiac"
          onClick={() => setMonth((m) => addMonthsSafe(m, 1))}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "10px",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontSize: "18px",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            lineHeight: 1,
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(16,185,129,0.12)";
            (e.currentTarget as HTMLButtonElement).style.color = "#10b981";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(16,185,129,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
          }}
        >
          ›
        </button>
      </div>
    </div>
  );
}
