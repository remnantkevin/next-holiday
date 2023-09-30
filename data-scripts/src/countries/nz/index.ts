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

type Holiday = HolidayBase & {
  sortKey: string;
  subdivisionCode: SubdivisionCode;
  subdivisionName: SubdivisionName;
};

type AnniversaryDay = {
  date: string;
  name: string;
  province: ProvinceName;
};

type SubdivisionCode = (typeof SUBDIVISION_CODES)[number];

type SubdivisionName = (typeof SUBDIVISION_NAMES)[number];

type ProvinceName = (typeof PROVINCE_NAMES)[number];

type Year = (typeof YEARS)[number];

// ---------------------------------------------------------------------------------------------------------------------
// CONSTANTS
// ---------------------------------------------------------------------------------------------------------------------

const SUBDIVISION_CODES = [
  "auk",
  "bop",
  "can",
  "cit",
  "gis",
  "wgn",
  "hkb",
  "mwt",
  "mbh",
  "nsn",
  "ntl",
  "ota",
  "stl",
  "tki",
  "tas",
  "wko",
  "wtc"
] as const;

const SUBDIVISION_NAMES = [
  "Auckland (Tāmaki Makaurau)",
  "Bay of Plenty (Toi Moana)",
  "Canterbury (Waitaha)",
  "Chatham Islands Territory (Wharekauri)",
  "Gisborne (Te Tairāwhiti)",
  "Greater Wellington (Te Pane Matua Taiao)",
  "Hawke's Bay (Te Matau-a-Māui)",
  "Manawatū-Whanganui (Manawatū Whanganui)",
  "Marlborough",
  "Nelson (Whakatū)",
  "Northland (Te Taitokerau)",
  "Otaga (Ō Tākou)",
  "Southland (Te Taiao Tonga)",
  "Taranaki",
  "Tasman (Te tai o Aorere)",
  "Waikato",
  "West Coast (Te Tai o Poutini)"
] as const;

const PROVINCE_NAMES = [
  "Auckland",
  "Canterbury (South)",
  "Canterbury",
  "Chatham Islands",
  "Hawke's Bay",
  "Marlborough",
  "Nelson",
  "Otago",
  "Southland",
  "Taranaki",
  "Wellington",
  "Westland"
] as const;

// const PROVINCE_TO_SUBDIVISION: Record<ProvinceName, SubdivisionCode[]> = {
//   Auckland: ["auk", "bop", "gis", "ntl", "wko"],
//   "Canterbury (South)": ["can"],
//   Canterbury: ["can"],
//   "Chatham Islands": ["cit"],
//   "Hawke's Bay": ["hkb"],
//   Marlborough: ["mbh"],
//   Nelson: ["nsn", "tas"],
//   Otago: ["ota"],
//   Southland: ["stl"],
//   Taranaki: ["tki"],
//   Wellington: ["mwt", "wgn"],
//   Westland: ["wtc"]
// };

const SUBDIVISION_TO_PROVINCE: Record<SubdivisionCode, ProvinceName[]> = {
  auk: ["Auckland"],
  bop: ["Auckland"],
  gis: ["Auckland"],
  ntl: ["Auckland"],
  wko: ["Auckland"],
  can: ["Canterbury (South)", "Canterbury"],
  cit: ["Chatham Islands"],
  hkb: ["Hawke's Bay"],
  mbh: ["Marlborough"],
  nsn: ["Nelson"],
  tas: ["Nelson"],
  ota: ["Otago"],
  stl: ["Southland"],
  tki: ["Taranaki"],
  mwt: ["Wellington"],
  wgn: ["Wellington"],
  wtc: ["Westland"]
};

const YEARS = ["2023", "2024"] as const;

const NZ = {
  code: "nz",
  name: "New Zealand",
  subdivisions: createSubdivisionMapping(),
  hasSubdivisionHolidays: true,
  years: YEARS,
  moreInfoURL:
    "https://www.employment.govt.nz/leave-and-holidays/public-holidays/public-holidays-and-anniversary-dates"
} as const;

const HOLIDAY_DATA: Record<Year, HolidayBase[]> = {
  "2023": [
    {
      date: "20230101",
      dateObserved: "20230103",
      name: "New Year's Day"
    },
    {
      date: "20230102",
      name: "Day after New Year's Day"
    },
    {
      date: "20230206",
      name: "Waitangi Day"
    },
    {
      date: "20230407",
      name: "Good Friday"
    },
    {
      date: "20230410",
      name: "Easter Monday"
    },
    {
      date: "20230425",
      name: "ANZAC Day"
    },
    {
      date: "20230605",
      name: "King's Birthday"
    },
    {
      date: "20230714",
      name: "Matariki"
    },
    {
      date: "20231023",
      name: "Labour Day"
    },
    {
      date: "20231225",
      name: "Christmas Day"
    },
    {
      date: "20231226",
      name: "Boxing Day"
    }
  ],
  "2024": [
    {
      date: "20240101",
      name: "New Year's Day"
    },
    {
      date: "20240102",
      name: "Day after New Year's Day"
    },
    {
      date: "20240206",
      name: "Waitangi Day"
    },
    {
      date: "20240329",
      name: "Good Friday"
    },
    {
      date: "20240401",
      name: "Easter Monday"
    },
    {
      date: "20240425",
      name: "ANZAC Day"
    },
    {
      date: "20240603",
      name: "King's Birthday"
    },
    {
      date: "20240628",
      name: "Matariki"
    },
    {
      date: "20241028",
      name: "Labour Day"
    },
    {
      date: "20241225",
      name: "Christmas Day"
    },
    {
      date: "20241226",
      name: "Boxing Day"
    }
  ]
};

const ANNIVERSARY_DAY_DATA: Record<Year, AnniversaryDay[]> = {
  "2023": [
    {
      date: "20230130",
      name: "Auckland Anniversary Day",
      province: "Auckland"
    },
    {
      date: "20230925",
      name: "South Canterbury Anniversary Day",
      province: "Canterbury (South)"
    },
    {
      date: "20231117",
      name: "Canterbury Anniversary Day",
      province: "Canterbury"
    },
    {
      date: "20231127",
      name: "Chatham Islands Anniversary Day",
      province: "Chatham Islands"
    },
    {
      date: "20231020",
      name: "Hawke's Bay Anniversary Day",
      province: "Hawke's Bay"
    },
    {
      date: "20231030",
      name: "Marlborough Anniversary Day",
      province: "Marlborough"
    },
    {
      date: "20230130",
      name: "Nelson Anniversary Day",
      province: "Nelson"
    },
    {
      date: "20230320",
      name: "Otago Anniversary Day",
      province: "Otago"
    },
    {
      date: "20230411",
      name: "Southland Anniversary Day",
      province: "Southland"
    },
    {
      date: "20230313",
      name: "Taranaki Anniversary Day",
      province: "Taranaki"
    },
    {
      date: "20230123",
      name: "Wellington Anniversary Day",
      province: "Wellington"
    },
    {
      date: "20231204",
      name: "Westland Anniversary Day",
      province: "Westland"
    }
  ],
  "2024": [
    {
      date: "20240129",
      name: "Auckland Anniversary Day",
      province: "Auckland"
    },
    {
      date: "20240923",
      name: "South Canterbury Anniversary Day",
      province: "Canterbury (South)"
    },
    {
      date: "20241115",
      name: "Canterbury Anniversary Day",
      province: "Canterbury"
    },
    {
      date: "20241202",
      name: "Chatham Islands Anniversary Day",
      province: "Chatham Islands"
    },
    {
      date: "20241025",
      name: "Hawke's Bay Anniversary Day",
      province: "Hawke's Bay"
    },
    {
      date: "20241104",
      name: "Marlborough Anniversary Day",
      province: "Marlborough"
    },
    {
      date: "20240129",
      name: "Nelson Anniversary Day",
      province: "Nelson"
    },
    {
      date: "20240325",
      name: "Otago Anniversary Day",
      province: "Otago"
    },
    {
      date: "20240402",
      name: "Southland Anniversary Day",
      province: "Southland"
    },
    {
      date: "20240311",
      name: "Taranaki Anniversary Day",
      province: "Taranaki"
    },
    {
      date: "20240122",
      name: "Wellington Anniversary Day",
      province: "Wellington"
    },
    {
      date: "20241202",
      name: "Westland Anniversary Day",
      province: "Westland"
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

function createSortKey(
  countryCode: string,
  subdivisionCode: string,
  day: { date: string }
): string {
  return `${countryCode}-${subdivisionCode}-${day.date}`;
}

function getHolidays(): Holiday[] {
  return YEARS.map((year) => {
    const nationalHolidays = HOLIDAY_DATA[year];
    const allAnniversaryDays = ANNIVERSARY_DAY_DATA[year];

    return SUBDIVISION_CODES.map((subdivisionCode) => {
      const subdivisionNationalHolidays: Holiday[] = nationalHolidays.map((nationalHoliday) => ({
        ...nationalHoliday,
        subdivisionCode,
        subdivisionName: NZ.subdivisions[subdivisionCode],
        sortKey: createSortKey(NZ.code, subdivisionCode, nationalHoliday)
      }));

      const provincesForSubdivision = SUBDIVISION_TO_PROVINCE[subdivisionCode];
      const anniversaryDaysForProvinces = allAnniversaryDays.filter((anniversaryDay) =>
        provincesForSubdivision.includes(anniversaryDay.province)
      );
      const anniversaryHolidays: Holiday[] = anniversaryDaysForProvinces.map((anniversaryDay) => ({
        date: anniversaryDay.date,
        name: anniversaryDay.name,
        subdivisionCode,
        subdivisionName: NZ.subdivisions[subdivisionCode],
        sortKey: createSortKey(NZ.code, subdivisionCode, anniversaryDay)
      }));

      return [...subdivisionNationalHolidays, ...anniversaryHolidays];
    });
  })
    .flat(2)
    .sort((a, b) => (a.sortKey > b.sortKey ? 1 : -1));
}

async function writeHolidaysToFile(holidays: Holiday[]): Promise<void> {
  const fileContents = {
    country: {
      code: NZ.code,
      name: NZ.name
    },
    subdivisions: {
      codes: SUBDIVISION_CODES,
      names: SUBDIVISION_NAMES,
      mapping: NZ.subdivisions,
      count: SUBDIVISION_CODES.length
    },
    hasSubdivisionHolidays: NZ.hasSubdivisionHolidays,
    years: YEARS,
    moreInfoURL: NZ.moreInfoURL,
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
