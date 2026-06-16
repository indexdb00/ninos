export { pt } from "./pt";
export { en } from "./en";
export { es } from "./es";
export { fr } from "./fr";
export { ja } from "./ja";

export type Lang = "pt" | "en" | "es" | "fr" | "ja";
export type Translations = typeof import("./pt").pt;

import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { ja } from "./ja";

export const translations: Record<string, Translations> = { pt, en, es, fr, ja };

export function t(lang: Lang): Translations {
  return translations[lang] || pt;
}
