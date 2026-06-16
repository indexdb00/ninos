export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const truncate = (s: string, n: number) => s.length > n ? s.slice(0, n - 1) + "…" : s;
