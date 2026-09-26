// Dates are authored as local calendar days (new Date(y, m, d)), so read
// them back with local getters to keep the same day on every machine.
export function isoDay(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

export function longDay(date: Date): string {
    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}

export function readingMinutes(seconds: number | undefined) {
    if (seconds === undefined) return undefined;
    return `${Math.max(1, Math.round(seconds / 60))} min`;
}
