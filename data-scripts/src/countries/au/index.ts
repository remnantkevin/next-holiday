import * as st from "simple-runtypes";
import * as fs from "node:fs/promises";

export const DATES_MANUALLY_CAPTURED = false;

// ---------------------------------------------------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------------------------------------------------

type HolidayBase = {
  date: string;
  description: string;
  moreInfoURL: string;
  name: string;
  subdivisionCode: SubdivisionCode;
  subdivisionName: SubdivisionName;
};

type Holiday = HolidayBase & { sortKey: string };

type SubdivisionCode = (typeof SUBDIVISION_CODES)[number];

type SubdivisionName = (typeof SUBDIVISION_NAMES)[number];

type Year = (typeof YEARS)[number];

// ---------------------------------------------------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------------------------------------------------

const SUBDIVISION_CODES = ["act", "nsw", "nt", "qld", "sa", "tas", "vic", "wa"] as const;

const SUBDIVISION_NAMES = [
  "Australian Capital Territory",
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia"
] as const;

const YEARS = ["2023", "2024"] as const;

const AU = {
  code: "au",
  name: "Australia",
  subdivisions: Object.fromEntries(
    SUBDIVISION_CODES.map((code, index) => [code, SUBDIVISION_NAMES[index]])
  ) as Record<SubdivisionCode, SubdivisionName>,
  hasSubdivisionHolidays: true,
  years: YEARS,
  moreInfoURL: "https://www.australia.gov.au/public-holidays",
  /**
    For more details on the AU public holidays data:
      - https://data.gov.au/dataset/ds-dga-b1bc6077-dadd-4f61-9f8c-002ab2cdff10
      - https://data.gov.au/data/api/1/util/snippet/api_info.html?resource_id=33673aca-0857-42e5-b8f0-9981b4755686
  */
  api: {
    url: "https://data.gov.au/data/api/3/action/datastore_search_sql?sql=",
    sql: `SELECT "Date", "Holiday Name", "Information", "More Information", "Jurisdiction" FROM "33673aca-0857-42e5-b8f0-9981b4755686"`
  }
} as const;

// ---------------------------------------------------------------------------------------------------------------------
// SCHEMA
// ---------------------------------------------------------------------------------------------------------------------

/** Date string of the form YYYYMMDD */
const DateStringSchema = st.string({ match: /^(202[3-4])([0-1]\d)([0-3]\d)$/ });

const APIRecordSchema = st.record({
  Date: DateStringSchema,
  "Holiday Name": st.string(),
  Information: st.string(),
  "More Information": st.string(),
  Jurisdiction: st.stringLiteralUnion(...SUBDIVISION_CODES)
});

const APIResponseSchema = st.record({
  help: st.string(),
  success: st.boolean(),
  result: st.record({
    sql: st.string(),
    fields: st.array(st.record({ id: st.string(), type: st.string() })),
    records: st.array(APIRecordSchema)
  })
});

const HolidaySchema: st.Runtype<Holiday> = st.record({
  date: DateStringSchema,
  description: st.string(),
  name: st.string(),
  subdivisionCode: st.stringLiteralUnion(...SUBDIVISION_CODES),
  subdivisionName: st.stringLiteralUnion(...SUBDIVISION_NAMES),
  moreInfoURL: st.string(),
  sortKey: st.string()
});

// ---------------------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function buildSQLQueryForYear(year: Year): string {
  return `${AU.api.sql} WHERE "Date" ILIKE '${year}%'`;
}

function buildAPIRequestURL(year: Year): string {
  return `${AU.api.url}${buildSQLQueryForYear(year)}`;
}

async function getHolidaysForYear(year: Year): Promise<Holiday[]> {
  const response = await fetch(buildAPIRequestURL(year));
  const responseJSON: unknown = await response.json();

  const {
    result: { records }
  } = APIResponseSchema(responseJSON);

  const holidays = records.map((record) => {
    const subdivisionCode = record.Jurisdiction;
    const subdivisionName = AU.subdivisions[subdivisionCode];
    const date = record.Date;
    const sortKey = `${AU.code}-${subdivisionCode}-${date}`;

    return HolidaySchema({
      date,
      description: record.Information,
      moreInfoURL: record["More Information"],
      name: record["Holiday Name"],
      sortKey,
      subdivisionCode,
      subdivisionName
    });
  });
  return holidays;
}

async function getHolidays(years: readonly Year[]): Promise<Holiday[]> {
  return (await Promise.all(Object.values(years).map((year) => getHolidaysForYear(year))))
    .flat()
    .sort((a, b) => (a.sortKey > b.sortKey ? 1 : -1));
}

async function writeHolidaysToFile(holidays: Holiday[]): Promise<void> {
  const fileContents = {
    country: {
      code: AU.code,
      name: AU.name
    },
    subdivisions: {
      codes: SUBDIVISION_CODES,
      names: SUBDIVISION_NAMES,
      mapping: AU.subdivisions,
      count: SUBDIVISION_CODES.length
    },
    hasSubdivisionHolidays: AU.hasSubdivisionHolidays,
    years: YEARS,
    moreInfoURL: AU.moreInfoURL,
    holidays
  };

  await fs.writeFile(`data/${fileContents.country.code}.json`, JSON.stringify(fileContents));
}

// ---------------------------------------------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------------------------------------------

async function run() {
  const holidays = await getHolidays(YEARS);
  await writeHolidaysToFile(holidays);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
