import { SUBDIVISION_CODE_TO_NAME, YEARS } from "./constants";

/** DATES_MANUALLY_CAPTURED = false */

const GB = {
  code: "gb",
  name: "United Kingdom of Great Britain and Northern Ireland",
  subdivisions: SUBDIVISION_CODE_TO_NAME,
  hasSubdivisionHolidays: true,
  years: YEARS,
  moreInfoURL: "https://www.gov.uk/bank-holidays",
  api: {
    url: "https://www.gov.uk/bank-holidays.json"
  }
} as const;

// ---------------------------------------------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------------------------------------------

async function run() {
  const holidays = await getHolidays();
  await writeHolidaysToFile(holidays);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
