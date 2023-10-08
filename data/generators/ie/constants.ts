import { fromFileUrl } from "https://deno.land/std@0.203.0/path/mod.ts";
import type {
  HolidayBase,
  SubdivisionCodeToNameMapping,
  SubdivisionCodes,
  SubdivisionNames,
  Year,
  Years,
} from "./types.ts";

export const GENERATED_DATA_FILE_PATH = fromFileUrl(
  import.meta.resolve("../../generated/ie.json")
);

export const CODE = "ie" as const;

export const NAME = "Ireland" as const;

export const SUBDIVISION_CODES: SubdivisionCodes = ["c", "l", "m", "u"];

export const SUBDIVISION_NAMES: SubdivisionNames = [
  "Connaught (Connacht)",
  "Leinster (Laighin)",
  "Munster (An Mhumhain)",
  "Ulster (Ulaidh)",
];

export const SUBDIVISION_CODE_TO_NAME_MAPPING: SubdivisionCodeToNameMapping = {
  c: "Connaught (Connacht)",
  l: "Leinster (Laighin)",
  m: "Munster (An Mhumhain)",
  u: "Ulster (Ulaidh)",
};

export const YEARS: Years = ["2023", "2024"];

export const HOLIDAY_DATA: Record<Year, HolidayBase[]> = {
  "2023": [
    {
      date: "20230101",
      name: "New Year's Day",
    },
    {
      date: "20230206",
      name: "Saint Brigid's Day",
      description:
        "First Monday in February, or 1 February if the date falls on a Friday. Introduced as a public holiday in 2023.",
    },
    {
      date: "20230317",
      name: "Saint Patrick's Day",
    },
    {
      date: "20230410",
      name: "Easter Monday",
    },
    {
      date: "20230501",
      name: "May Day",
      description: "First Monday in May",
    },
    {
      date: "20230605",
      name: "June Holiday",
      description: "First Monday in June",
    },
    {
      date: "20230807",
      name: "August Holiday",
      description: "First Monday in August",
    },
    {
      date: "20231030",
      name: "October Holiday",
      description: "Last Monday in October",
    },
    {
      date: "20231225",
      name: "Christmas Day",
    },
    {
      date: "20231226",
      name: "Saint Stephen's Day",
    },
  ],
  "2024": [
    {
      date: "20240101",
      name: "New Year's Day",
    },
    {
      date: "20240205",
      name: "Saint Brigid's Day",
      description:
        "First Monday in February, or 1 February if the date falls on a Friday. Introduced as a public holiday in 2023.",
    },
    {
      date: "20240317",
      name: "Saint Patrick's Day",
    },
    {
      date: "20240401",
      name: "Easter Monday",
    },
    {
      date: "20240506",
      name: "May Day",
      description: "First Monday in May",
    },
    {
      date: "20240603",
      name: "June Holiday",
      description: "First Monday in June",
    },
    {
      date: "20240805",
      name: "August Holiday",
      description: "First Monday in August",
    },
    {
      date: "20241028",
      name: "October Holiday",
      description: "Last Monday in October",
    },
    {
      date: "20241225",
      name: "Christmas Day",
    },
    {
      date: "20241226",
      name: "Saint Stephen's Day",
    },
  ],
};
