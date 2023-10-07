/**
 * dates-manually-captured: false
 */

import { sortBy } from "https://deno.land/std@0.203.0/collections/sort_by.ts";
import type { Meta } from "../../shared/types.ts";
import {
  API_SQL,
  API_URL,
  CODE,
  GENERATED_DATA_FILE_PATH,
  NAME,
  SUBDIVISION_CODES,
  SUBDIVISION_MAPPING,
  SUBDIVISION_NAMES,
  YEARS,
} from "./constants.ts";
import { APIResponseSchema, type Holiday, HolidaySchema } from "./schemas.ts";
import type { Year, Years } from "./types.ts";

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
  return await Promise.all(years.map((year) => getHolidaysForYear(year)))
    .then((it) => it.flat())
    .then((it) => sortBy(it, (holiday) => holiday.sortKey));
}

async function getHolidaysForYear(year: Year): Promise<Holiday[]> {
  const response = await fetch(buildAPIRequestURL(year));
  const responseJSON: unknown = await response.json();

  const {
    result: { records },
  } = APIResponseSchema(responseJSON);

  const holidays = records.map((record) => {
    const subdivisionCode = record.Jurisdiction;
    const subdivisionName = SUBDIVISION_MAPPING[subdivisionCode];
    const date = record.Date;
    const sortKey = `${CODE}-${subdivisionCode}-${date}`;

    return HolidaySchema({
      date,
      description: record.Information,
      moreInfoURL: record["More Information"],
      name: record["Holiday Name"],
      sortKey,
      subdivisionCode,
      subdivisionName,
    });
  });
  return holidays;
}

function buildAPIRequestURL(year: Year): string {
  return `${API_URL}${buildSQLQueryForYear(year)}`;
}

function buildSQLQueryForYear(year: Year): string {
  return `${API_SQL} WHERE "Date" ILIKE '${year}%'`;
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
    mapping: SUBDIVISION_MAPPING,
    count: SUBDIVISION_CODES.length,
  };

  const hasSubdivisionHolidays = true;

  const years = YEARS;

  const moreInfoUrls = ["https://www.australia.gov.au/public-holidays"];

  /**
    For more details on the AU public holidays data:
      - https://data.gov.au/dataset/ds-dga-b1bc6077-dadd-4f61-9f8c-002ab2cdff10
      - https://data.gov.au/data/api/1/util/snippet/api_info.html?resource_id=33673aca-0857-42e5-b8f0-9981b4755686
  */
  const api = {
    url: API_URL,
    sql: API_SQL,
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
