/**
 * dates-manually-captured: true
 */

import { sortBy } from "https://deno.land/std@0.203.0/collections/sort_by.ts";
import type { Meta } from "../../../shared/types.ts";
import {
  ANNIVERSARY_DAY_DATA,
  CODE,
  GENERATED_DATA_FILE_PATH,
  HOLIDAY_DATA,
  NAME,
  SUBDIVISION_CODES,
  SUBDIVISION_CODE_TO_PROVINCE_NAMES,
  SUBDIVISION_CODE_TO_SUBDIVISION_NAME,
  SUBDIVISION_NAMES,
  YEARS,
} from "./constants.ts";
import type { Holiday, Years } from "./types.ts";

// ---------------------------------------------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------------------------------------------

export async function run() {
  const holidays = getHolidays(YEARS);
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

function createSortKey(
  countryCode: string,
  subdivisionCode: string,
  day: { date: string }
): string {
  return `${countryCode}-${subdivisionCode}-${day.date}`;
}

function getHolidays(years: Years): Holiday[] {
  return sortBy(
    years
      .map((year) => {
        const nationalHolidays = HOLIDAY_DATA[year];
        const allAnniversaryDays = ANNIVERSARY_DAY_DATA[year];

        return SUBDIVISION_CODES.map((subdivisionCode) => {
          const subdivisionNationalHolidays: Holiday[] = nationalHolidays.map(
            (nationalHoliday) => ({
              ...nationalHoliday,
              subdivisionCode,
              subdivisionName:
                SUBDIVISION_CODE_TO_SUBDIVISION_NAME[subdivisionCode],
              sortKey: createSortKey(CODE, subdivisionCode, nationalHoliday),
            })
          );

          const provincesForSubdivision =
            SUBDIVISION_CODE_TO_PROVINCE_NAMES[subdivisionCode];
          const anniversaryDaysForProvinces = allAnniversaryDays.filter(
            (anniversaryDay) =>
              provincesForSubdivision.includes(anniversaryDay.province)
          );
          const anniversaryHolidays: Holiday[] =
            anniversaryDaysForProvinces.map((anniversaryDay) => ({
              date: anniversaryDay.date,
              name: anniversaryDay.name,
              subdivisionCode,
              subdivisionName:
                SUBDIVISION_CODE_TO_SUBDIVISION_NAME[subdivisionCode],
              sortKey: createSortKey(CODE, subdivisionCode, anniversaryDay),
            }));

          return [...subdivisionNationalHolidays, ...anniversaryHolidays];
        });
      })
      .flat(2),
    (it) => it.sortKey
  );
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
    mapping: SUBDIVISION_CODE_TO_SUBDIVISION_NAME,
    count: SUBDIVISION_CODES.length,
  };

  const hasSubdivisionHolidays = true;

  const years = YEARS;

  const moreInfoUrls = [
    "https://www.employment.govt.nz/leave-and-holidays/public-holidays/public-holidays-and-anniversary-dates",
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
