import { fromFileUrl } from "https://deno.land/std@0.203.0/path/mod.ts";
import type {
  SubdivisionCodes,
  SubdivisionMapping,
  SubdivisionNames,
  Years,
} from "./types.ts";

export const GENERATED_DATA_FILE_PATH = fromFileUrl(
  import.meta.resolve("../../generated/au.json")
);

export const CODE = "au" as const;

export const NAME = "Australia" as const;

export const SUBDIVISION_CODES: SubdivisionCodes = [
  "act",
  "nsw",
  "nt",
  "qld",
  "sa",
  "tas",
  "vic",
  "wa",
];

export const SUBDIVISION_NAMES: SubdivisionNames = [
  "Australian Capital Territory",
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
];

export const SUBDIVISION_MAPPING: SubdivisionMapping = {
  act: "Australian Capital Territory",
  nsw: "New South Wales",
  nt: "Northern Territory",
  qld: "Queensland",
  sa: "South Australia",
  tas: "Tasmania",
  vic: "Victoria",
  wa: "Western Australia",
};

export const YEARS: Years = ["2023", "2024"];

export const API_URL =
  "https://data.gov.au/data/api/3/action/datastore_search_sql?sql=";

export const API_SQL = `SELECT "Date", "Holiday Name", "Information", "More Information", "Jurisdiction" FROM "33673aca-0857-42e5-b8f0-9981b4755686"`;
