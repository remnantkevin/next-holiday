export const API_SUBDIVISION_NAMES = ["england-and-wales", "northern-ireland", "scotland"] as const;
export const API_SUBDIVISION_NAME = {
  "england-and-wales": "england-and-wales",
  "northern-ireland": "northern-ireland",
  scotland: "scotland"
} as const;
export type APISubdivisionName = keyof typeof API_SUBDIVISION_NAME;

export const API_SUBDIVISION_NAME_TO_SUBDIVISION_CODE = {
  "england-and-wales": ["eng", "wls"],
  "northern-ireland": ["nir"],
  scotland: ["sct"]
} as const;

export const SUBDIVISION_CODES = ["eng", "nir", "sct", "wls"] as const;
export const SUBDIVISION_CODE = {
  eng: "eng",
  nir: "nir",
  sct: "sct",
  wls: "wls"
} as const;
export type SubdivisionCode = keyof typeof SUBDIVISION_CODE;

export const SUBDIVISION_NAMES = ["England", "Northern Ireland", "Scotland", "Wales"] as const;
export const SUBDIVISION_NAME = {
  England: "England",
  "Northern Ireland": "Northern Ireland",
  Scotland: "Scotland",
  Wales: "Wales"
} as const;
export type SubdivisionName = keyof typeof SUBDIVISION_NAME;

export const SUBDIVISION_CODE_TO_NAME = {
  eng: "England",
  nir: "Northern Ireland",
  sct: "Scotland",
  wls: "Wales"
} as const;

export const YEARS = ["2023", "2024"] as const;
