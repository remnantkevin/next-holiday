import { fromFileUrl } from "https://deno.land/std@0.203.0/path/mod.ts";
import type {
  HolidayBase,
  SubdivisionCodes,
  SubdivisionMapping,
  SubdivisionNames,
  Year,
  Years,
} from "./types.ts";

export const GENERATED_DATA_FILE_PATH = fromFileUrl(
  import.meta.resolve("../../generated/za.json")
);

export const CODE = "za" as const;

export const NAME = "South Africa" as const;

export const SUBDIVISION_CODES: SubdivisionCodes = [
  "ec",
  "fs",
  "gp",
  "kzn",
  "lp",
  "mp",
  "nw",
  "nc",
  "wc",
];

export const SUBDIVISION_NAMES: SubdivisionNames = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

export const SUBDIVISION_MAPPING: SubdivisionMapping = {
  ec: "Eastern Cape",
  fs: "Free State",
  gp: "Gauteng",
  kzn: "KwaZulu-Natal",
  lp: "Limpopo",
  mp: "Mpumalanga",
  nw: "North West",
  nc: "Northern Cape",
  wc: "Western Cape",
};

export const YEARS: Years = ["2023", "2024"];

export const HOLIDAY_DATA: Record<Year, HolidayBase[]> = {
  "2023": [
    {
      date: "20230101",
      dateObserved: "20230102",
      name: "New Year's Day",
    },
    {
      date: "20230321",
      name: "Human Rights Day",
      description:
        "Human Rights Day commemorates 21 March 1960, the day of the Sharpeville massacre.",
    },
    {
      date: "20230407",
      name: "Good Friday",
    },
    {
      date: "20230410",
      name: "Family Day",
    },
    {
      date: "20230427",
      name: "Freedom Day",
      description:
        "Freedom Day commemorates the first democratic elections held in South Africa on 27 April 1994.",
    },
    {
      date: "20230501",
      name: "Workers' Day",
    },
    {
      date: "20230616",
      name: "Youth Day",
      description:
        "Youth Day commemorates 16 June 1976, the day of the Soweto youth uprising against descriminatory education policies.",
    },
    {
      date: "20230809",
      name: "National Women's Day",
      description:
        "National Women's Day commemorates 9 August 1956 when women participated in a national march to petition against descriminatory pass laws.",
    },
    {
      date: "20230924",
      dateObserved: "20230925",
      name: "Heritage Day",
      description:
        "Heritage Day celebrates the cultural wealth of South Africa, remembering the heritage of the many cultures that make up the population of South Africa.",
    },
    {
      date: "20231216",
      name: "Day of Reconciliation",
      description:
        "The Day of Reconciliation promotes reconciliation and national unity.",
    },
    {
      date: "20231225",
      name: "Christmas Day",
    },
    {
      date: "20231226",
      name: "Day of Goodwill",
    },
  ],
  "2024": [
    {
      date: "20240101",
      name: "New Year's Day",
    },
    {
      date: "20240321",
      name: "Human Rights Day",
      description:
        "Human Rights Day commemorates 21 March 1960, the day of the Sharpeville massacre.",
    },
    {
      date: "20240329",
      name: "Good Friday",
    },
    {
      date: "20240401",
      name: "Family Day",
    },
    {
      date: "20240427",
      name: "Freedom Day",
      description:
        "Freedom Day commemorates the first democratic elections held in South Africa on 27 April 1994.",
    },
    {
      date: "20240501",
      name: "Workers' Day",
    },
    {
      date: "20240616",
      dateObserved: "20240617",
      name: "Youth Day",
      description:
        "Youth Day commemorates 16 June 1976, the day of the Soweto youth uprising against descriminatory education policies.",
    },
    {
      date: "20240809",
      name: "National Women's Day",
      description:
        "National Women's Day commemorates 9 August 1956 when women participated in a national march to petition against descriminatory pass laws.",
    },
    {
      date: "20240924",
      name: "Heritage Day",
      description:
        "Heritage Day recognises and celebrates the cultural wealth of South Africa, remembering the cultural heritage of the many cultures that make up the population of South Africa.",
    },
    {
      date: "20241216",
      name: "Day of Reconciliation",
      description:
        "The Day of Reconciliation promotes reconciliation and national unity.",
    },
    {
      date: "20241225",
      name: "Christmas Day",
    },
    {
      date: "20241226",
      name: "Day of Goodwill",
    },
  ],
};
