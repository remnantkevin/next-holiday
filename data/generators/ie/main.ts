/**
 * dates-manually-captured: true
 */

import { sortBy } from "https://deno.land/std@0.203.0/collections/sort_by.ts";
import {
  CODE,
  GENERATED_DATA_FILE_PATH,
  HOLIDAY_DATA,
  NAME,
  SUBDIVISION_CODES,
  SUBDIVISION_CODE_TO_NAME_MAPPING,
  SUBDIVISION_NAMES,
  YEARS,
} from "./constants.ts";
import type { Holiday, Years } from "./types.ts";
import { Meta } from "../../shared/types.ts";

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

function getHolidays(years: Years): Holiday[] {
  const holidayData = years.flatMap((year) => HOLIDAY_DATA[year]);
  const holidays = holidayData.map(
    (it): Holiday => ({
      ...it,
      sortKey: `${CODE}-${it.date}`,
    })
  );
  return sortBy(holidays, (it) => it.sortKey);
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

  const hasSubdivisionHolidays = false;

  const years = YEARS;

  const moreInfoUrls = [
    "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/leave-and-holidays/public-holidays-in-ireland",
    "https://www.workplacerelations.ie/en/what_you_should_know/public-holidays",
  ];

  return {
    code,
    name,
    subdivisions,
    hasSubdivisionHolidays,
    years,
    moreInfoUrls,
  };
}
