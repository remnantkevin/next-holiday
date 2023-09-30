import * as fs from "node:fs/promises";

export const DATES_MANUALLY_CAPTURED = true;

// ---------------------------------------------------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------------------------------------------------

type HolidayBase = {
  date: string;
  description?: string;
  name: string;
};

type Holiday = HolidayBase & { sortKey: string };

type SubdivisionCode = (typeof SUBDIVISION_CODES)[number];

type SubdivisionName = (typeof SUBDIVISION_NAMES)[number];

type Year = (typeof YEARS)[number];

// ---------------------------------------------------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------------------------------------------------

const SUBDIVISION_CODES = ["c", "l", "m", "u"] as const;

const SUBDIVISION_NAMES = [
  "Connaught (Connacht)",
  "Leinster (Laighin)",
  "Munster (An Mhumhain)",
  "Ulster (Ulaidh)"
] as const;

const YEARS = ["2023", "2024"] as const;

const IE = {
  code: "ie",
  name: "Ireland",
  subdivisions: createSubdivisionMapping(),
  hasSubdivisionHolidays: false,
  years: YEARS,
  moreInfoURL:
    "https://www.citizensinformation.ie/en/employment/employment-rights-and-conditions/leave-and-holidays/public-holidays-in-ireland",
  moreInfoURL2: "https://www.workplacerelations.ie/en/what_you_should_know/public-holidays"
} as const;

const HOLIDAY_DATA: Record<Year, HolidayBase[]> = {
  "2023": [
    {
      date: "20230101",
      name: "New Year's Day"
    },
    {
      date: "20230206",
      name: "Saint Brigid's Day",
      description:
        "First Monday in February, or 1 February if the date falls on a Friday. Introduced as a public holiday in 2023."
    },
    {
      date: "20230317",
      name: "Saint Patrick's Day"
    },
    {
      date: "20230410",
      name: "Easter Monday"
    },
    {
      date: "20230501",
      name: "May Day",
      description: "First Monday in May"
    },
    {
      date: "20230605",
      name: "June Holiday",
      description: "First Monday in June"
    },
    {
      date: "20230807",
      name: "August Holiday",
      description: "First Monday in August"
    },
    {
      date: "20231030",
      name: "October Holiday",
      description: "Last Monday in October"
    },
    {
      date: "20231225",
      name: "Christmas Day"
    },
    {
      date: "20231226",
      name: "Saint Stephen's Day"
    }
  ],
  "2024": [
    {
      date: "20240101",
      name: "New Year's Day"
    },
    {
      date: "20240205",
      name: "Saint Brigid's Day",
      description:
        "First Monday in February, or 1 February if the date falls on a Friday. Introduced as a public holiday in 2023."
    },
    {
      date: "20240317",
      name: "Saint Patrick's Day"
    },
    {
      date: "20240401",
      name: "Easter Monday"
    },
    {
      date: "20240506",
      name: "May Day",
      description: "First Monday in May"
    },
    {
      date: "20240603",
      name: "June Holiday",
      description: "First Monday in June"
    },
    {
      date: "20240805",
      name: "August Holiday",
      description: "First Monday in August"
    },
    {
      date: "20241028",
      name: "October Holiday",
      description: "Last Monday in October"
    },
    {
      date: "20241225",
      name: "Christmas Day"
    },
    {
      date: "20241226",
      name: "Saint Stephen's Day"
    }
  ]
};

// ---------------------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function createSubdivisionMapping() {
  return Object.fromEntries(
    SUBDIVISION_CODES.map((code, index) => [code, SUBDIVISION_NAMES[index]])
  ) as Record<SubdivisionCode, SubdivisionName>;
}

function getHolidays(): Holiday[] {
  const holidays = [...HOLIDAY_DATA["2023"], ...HOLIDAY_DATA["2024"]];
  return holidays
    .map((h) => ({
      ...h,
      sortKey: `${IE.code}-${h.date}`
    }))
    .sort((a, b) => (a.sortKey > b.sortKey ? 1 : -1));
}

async function writeHolidaysToFile(holidays: Holiday[]): Promise<void> {
  const fileContents = {
    country: {
      code: IE.code,
      name: IE.name
    },
    subdivisions: {
      codes: SUBDIVISION_CODES,
      names: SUBDIVISION_NAMES,
      mapping: IE.subdivisions,
      count: SUBDIVISION_CODES.length
    },
    hasSubdivisionHolidays: IE.hasSubdivisionHolidays,
    years: YEARS,
    moreInfoURL: IE.moreInfoURL,
    moreInfoURL2: IE.moreInfoURL2,
    holidays
  };

  await fs.writeFile(`data/${fileContents.country.code}.json`, JSON.stringify(fileContents));
}

// ---------------------------------------------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------------------------------------------

async function run() {
  const holidays = getHolidays();
  await writeHolidaysToFile(holidays);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
