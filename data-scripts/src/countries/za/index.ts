import * as fs from "node:fs/promises";

export const DATES_MANUALLY_CAPTURED = true;

// ---------------------------------------------------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------------------------------------------------

type HolidayBase = {
  date: string;
  dateObserved?: string;
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

const SUBDIVISION_CODES = ["ec", "fs", "gp", "kzn", "lp", "mp", "nw", "nc", "wc"] as const;

const SUBDIVISION_NAMES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape"
] as const;

const YEARS = ["2023", "2024"] as const;

const ZA = {
  code: "za",
  name: "South Africa",
  subdivisions: createSubdivisionMapping(),
  hasSubdivisionHolidays: false,
  years: YEARS,
  moreInfoURL: "https://www.gov.za/about-sa/public-holidays"
} as const;

const HOLIDAY_DATA: Record<Year, HolidayBase[]> = {
  "2023": [
    {
      date: "20230101",
      dateObserved: "20230102",
      name: "New Year's Day"
    },
    {
      date: "20230321",
      name: "Human Rights Day",
      description:
        "Human Rights Day commemorates 21 March 1960, the day of the Sharpeville massacre."
    },
    {
      date: "20230407",
      name: "Good Friday"
    },
    {
      date: "20230410",
      name: "Family Day"
    },
    {
      date: "20230427",
      name: "Freedom Day",
      description:
        "Freedom Day commemorates the first democratic elections held in South Africa on 27 April 1994."
    },
    {
      date: "20230501",
      name: "Workers' Day"
    },
    {
      date: "20230616",
      name: "Youth Day",
      description:
        "Youth Day commemorates 16 June 1976, the day of the Soweto youth uprising against descriminatory education policies."
    },
    {
      date: "20230809",
      name: "National Women's Day",
      description:
        "National Women's Day commemorates 9 August 1956 when women participated in a national march to petition against descriminatory pass laws."
    },
    {
      date: "20230924",
      dateObserved: "20230925",
      name: "Heritage Day",
      description:
        "Heritage Day celebrates the cultural wealth of South Africa, remembering the heritage of the many cultures that make up the population of South Africa."
    },
    {
      date: "20231216",
      name: "Day of Reconciliation",
      description: "The Day of Reconciliation promotes reconciliation and national unity."
    },
    {
      date: "20231225",
      name: "Christmas Day"
    },
    {
      date: "20231226",
      name: "Day of Goodwill"
    }
  ],
  "2024": [
    {
      date: "20240101",
      name: "New Year's Day"
    },
    {
      date: "20240321",
      name: "Human Rights Day",
      description:
        "Human Rights Day commemorates 21 March 1960, the day of the Sharpeville massacre."
    },
    {
      date: "20240329",
      name: "Good Friday"
    },
    {
      date: "20240401",
      name: "Family Day"
    },
    {
      date: "20240427",
      name: "Freedom Day",
      description:
        "Freedom Day commemorates the first democratic elections held in South Africa on 27 April 1994."
    },
    {
      date: "20240501",
      name: "Workers' Day"
    },
    {
      date: "20240616",
      dateObserved: "20240617",
      name: "Youth Day",
      description:
        "Youth Day commemorates 16 June 1976, the day of the Soweto youth uprising against descriminatory education policies."
    },
    {
      date: "20240809",
      name: "National Women's Day",
      description:
        "National Women's Day commemorates 9 August 1956 when women participated in a national march to petition against descriminatory pass laws."
    },
    {
      date: "20240924",
      name: "Heritage Day",
      description:
        "Heritage Day recognises and celebrates the cultural wealth of South Africa, remembering the cultural heritage of the many cultures that make up the population of South Africa."
    },
    {
      date: "20241216",
      name: "Day of Reconciliation",
      description: "The Day of Reconciliation promotes reconciliation and national unity."
    },
    {
      date: "20241225",
      name: "Christmas Day"
    },
    {
      date: "20241226",
      name: "Day of Goodwill"
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
      sortKey: `${ZA.code}-${h.date}`
    }))
    .sort((a, b) => (a.sortKey > b.sortKey ? 1 : -1));
}

async function writeHolidaysToFile(holidays: Holiday[]): Promise<void> {
  const fileContents = {
    country: {
      code: ZA.code,
      name: ZA.name
    },
    subdivisions: {
      codes: SUBDIVISION_CODES,
      names: SUBDIVISION_NAMES,
      mapping: ZA.subdivisions,
      count: SUBDIVISION_CODES.length
    },
    hasSubdivisionHolidays: ZA.hasSubdivisionHolidays,
    years: YEARS,
    moreInfoURL: ZA.moreInfoURL,
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
