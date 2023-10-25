/**
 * dates-manually-captured: false
 */

import { sortBy } from "https://deno.land/std@0.203.0/collections/sort_by.ts";
import type { Meta } from "../../../shared/types.ts";
import { getJson } from "../../../shared/utils.ts";
import {
  API_DATE_STRING_REGEX,
  API_SUBDIVISION_NAMES,
  API_SUBDIVISION_NAME_TO_SUBDIVISION_CODE,
  API_URL,
  CODE,
  GENERATED_DATA_FILE_PATH,
  NAME,
  SUBDIVISION_CODES,
  SUBDIVISION_CODE_TO_NAME_MAPPING,
  SUBDIVISION_NAMES,
  YEARS,
} from "./constants.ts";
import { ApiResponseSchema, type ApiEvent } from "./schemas.ts";
import type { Holiday, HolidayBase, Years } from "./types.ts";

// ---------------------------------------------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------------------------------------------

export async function run() {
  const holidays = await getHolidays(YEARS);
  await writeHolidaysToFile(holidays);
}

if (import.meta.main) {
  run().catch((e) => {
    console.error(e);
    Deno.exit(1);
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------------------------------------------------

async function getHolidays(years: Years): Promise<Holiday[]> {
  const [apiResponse] = await getJson(API_URL);

  const result = ApiResponseSchema(apiResponse);

  const holidays = API_SUBDIVISION_NAMES.flatMap((apiDivisionName) => {
    const subdivisionCodes =
      API_SUBDIVISION_NAME_TO_SUBDIVISION_CODE[apiDivisionName];
    const apiEvents = result[apiDivisionName]["events"];

    return subdivisionCodes.flatMap((subdivisionCode) => {
      const baseHolidays = apiEvents.map((apiEvent) =>
        transformApiEvent(apiEvent)
      );
      const baseHolidaysForYears = baseHolidays.filter((baseHoliday) =>
        (years as string[]).includes(baseHoliday.date.slice(0, 4))
      );

      return baseHolidaysForYears.map((baseHoliday) => ({
        ...baseHoliday,
        subdivisionCode,
        subdivisionName: SUBDIVISION_CODE_TO_NAME_MAPPING[subdivisionCode],
        sortKey: `${CODE}-${subdivisionCode}-${baseHoliday.date}`,
      }));
    });
  });

  return sortBy(holidays, (it) => it.sortKey);
}

function transformApiEvent(event: ApiEvent): HolidayBase {
  return {
    date: transformApiEventDate(event.date),
    name: transformApiEventTitle(event.title),
  };
}

function transformApiEventDate(date: string): string {
  const result = date.match(API_DATE_STRING_REGEX);

  if (result?.groups == undefined) {
    throw Error(`Invalid API date string: ${date}`);
  }

  return `${result.groups["year"]}${result.groups["month"]}${result.groups["day"]}`;
}

/** Replace 'RIGHT SINGLE QUOTATION MARK' (U+2019) with plain "'". */
function transformApiEventTitle(title: string): string {
  return title.replaceAll("\u2019", "'");
}

async function writeHolidaysToFile(holidays: Holiday[]): Promise<void> {
  const data = {
    meta: buildMeta() satisfies Meta,
    data: holidays,
  };

  await Deno.writeTextFile(GENERATED_DATA_FILE_PATH, JSON.stringify(data));
}

function buildMeta() {
  const code = CODE;

  const name = NAME;

  const subdivisions = {
    codes: SUBDIVISION_CODES,
    names: SUBDIVISION_NAMES,
    mapping: SUBDIVISION_CODE_TO_NAME_MAPPING,
    count: SUBDIVISION_CODES.length,
  };

  const hasSubdivisionHolidays = true;

  const years = YEARS;

  const moreInfoUrls = ["https://www.gov.uk/bank-holidays"];

  const api = {
    url: API_URL,
  };

  return {
    code,
    name,
    subdivisions,
    hasSubdivisionHolidays,
    years,
    moreInfoUrls,
    api,
  };
}
