import { fromFileUrl } from "https://deno.land/std@0.203.0/path/mod.ts";
import type {
  ApiSubdivisionNameToSubdivisionCode,
  ApiSubdivisionNames,
  SubdivisionCodeToNameMapping,
  SubdivisionCodes,
  SubdivisionNames,
  Years,
} from "./types.ts";

export const GENERATED_DATA_FILE_PATH = fromFileUrl(
  import.meta.resolve("../../generated/gb.json")
);

export const CODE = "gb" as const;

export const NAME =
  "United Kingdom of Great Britain and Northern Ireland" as const;

export const API_DATE_STRING_REGEX =
  /^(?<year>\d{4})-(?<month>[0-1]\d)-(?<day>[0-3]\d)$/;

export const API_SUBDIVISION_NAMES: ApiSubdivisionNames = [
  "england-and-wales",
  "northern-ireland",
  "scotland",
];

export const API_SUBDIVISION_NAME_TO_SUBDIVISION_CODE: ApiSubdivisionNameToSubdivisionCode =
  {
    "england-and-wales": ["eng", "wls"],
    "northern-ireland": ["nir"],
    scotland: ["sct"],
  };

export const SUBDIVISION_CODES: SubdivisionCodes = ["eng", "nir", "sct", "wls"];

export const SUBDIVISION_NAMES: SubdivisionNames = [
  "England",
  "Northern Ireland",
  "Scotland",
  "Wales",
];

export const SUBDIVISION_CODE_TO_NAME_MAPPING: SubdivisionCodeToNameMapping = {
  eng: "England",
  nir: "Northern Ireland",
  sct: "Scotland",
  wls: "Wales",
};

export const YEARS: Years = ["2023", "2024"];

export const API_URL = "https://www.gov.uk/bank-holidays.json";
