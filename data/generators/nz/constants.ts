import { fromFileUrl } from "https://deno.land/std@0.203.0/path/mod.ts";
import {
  AnniversaryDay,
  HolidayBase,
  ProvinceNames,
  SubdivisionCodeToProvinceNames,
  SubdivisionCodeToSubdivisionName,
  SubdivisionCodes,
  SubdivisionNames,
  Year,
  Years,
} from "./types.ts";

export const GENERATED_DATA_FILE_PATH = fromFileUrl(
  import.meta.resolve("../../generated/nz.json")
);

export const CODE = "nz" as const;

export const NAME = "New Zealand" as const;

export const SUBDIVISION_CODES: SubdivisionCodes = [
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
  "wtc",
];

export const SUBDIVISION_NAMES: SubdivisionNames = [
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
  "West Coast (Te Tai o Poutini)",
];

export const SUBDIVISION_CODE_TO_SUBDIVISION_NAME: SubdivisionCodeToSubdivisionName =
  {
    auk: "Auckland (Tāmaki Makaurau)",
    bop: "Bay of Plenty (Toi Moana)",
    can: "Canterbury (Waitaha)",
    cit: "Chatham Islands Territory (Wharekauri)",
    gis: "Gisborne (Te Tairāwhiti)",
    wgn: "Greater Wellington (Te Pane Matua Taiao)",
    hkb: "Hawke's Bay (Te Matau-a-Māui)",
    mwt: "Manawatū-Whanganui (Manawatū Whanganui)",
    mbh: "Marlborough",
    nsn: "Nelson (Whakatū)",
    ntl: "Northland (Te Taitokerau)",
    ota: "Otaga (Ō Tākou)",
    stl: "Southland (Te Taiao Tonga)",
    tki: "Taranaki",
    tas: "Tasman (Te tai o Aorere)",
    wko: "Waikato",
    wtc: "West Coast (Te Tai o Poutini)",
  };

export const PROVINCE_NAMES: ProvinceNames = [
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
  "Westland",
];

export const SUBDIVISION_CODE_TO_PROVINCE_NAMES: SubdivisionCodeToProvinceNames =
  {
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
    wtc: ["Westland"],
  };

export const YEARS: Years = ["2023", "2024"];

export const HOLIDAY_DATA: Record<Year, HolidayBase[]> = {
  "2023": [
    {
      date: "20230101",
      dateObserved: "20230103",
      name: "New Year's Day",
    },
    {
      date: "20230102",
      name: "Day after New Year's Day",
    },
    {
      date: "20230206",
      name: "Waitangi Day",
    },
    {
      date: "20230407",
      name: "Good Friday",
    },
    {
      date: "20230410",
      name: "Easter Monday",
    },
    {
      date: "20230425",
      name: "ANZAC Day",
    },
    {
      date: "20230605",
      name: "King's Birthday",
    },
    {
      date: "20230714",
      name: "Matariki",
    },
    {
      date: "20231023",
      name: "Labour Day",
    },
    {
      date: "20231225",
      name: "Christmas Day",
    },
    {
      date: "20231226",
      name: "Boxing Day",
    },
  ],
  "2024": [
    {
      date: "20240101",
      name: "New Year's Day",
    },
    {
      date: "20240102",
      name: "Day after New Year's Day",
    },
    {
      date: "20240206",
      name: "Waitangi Day",
    },
    {
      date: "20240329",
      name: "Good Friday",
    },
    {
      date: "20240401",
      name: "Easter Monday",
    },
    {
      date: "20240425",
      name: "ANZAC Day",
    },
    {
      date: "20240603",
      name: "King's Birthday",
    },
    {
      date: "20240628",
      name: "Matariki",
    },
    {
      date: "20241028",
      name: "Labour Day",
    },
    {
      date: "20241225",
      name: "Christmas Day",
    },
    {
      date: "20241226",
      name: "Boxing Day",
    },
  ],
};

export const ANNIVERSARY_DAY_DATA: Record<Year, AnniversaryDay[]> = {
  "2023": [
    {
      date: "20230130",
      name: "Auckland Anniversary Day",
      province: "Auckland",
    },
    {
      date: "20230925",
      name: "South Canterbury Anniversary Day",
      province: "Canterbury (South)",
    },
    {
      date: "20231117",
      name: "Canterbury Anniversary Day",
      province: "Canterbury",
    },
    {
      date: "20231127",
      name: "Chatham Islands Anniversary Day",
      province: "Chatham Islands",
    },
    {
      date: "20231020",
      name: "Hawke's Bay Anniversary Day",
      province: "Hawke's Bay",
    },
    {
      date: "20231030",
      name: "Marlborough Anniversary Day",
      province: "Marlborough",
    },
    {
      date: "20230130",
      name: "Nelson Anniversary Day",
      province: "Nelson",
    },
    {
      date: "20230320",
      name: "Otago Anniversary Day",
      province: "Otago",
    },
    {
      date: "20230411",
      name: "Southland Anniversary Day",
      province: "Southland",
    },
    {
      date: "20230313",
      name: "Taranaki Anniversary Day",
      province: "Taranaki",
    },
    {
      date: "20230123",
      name: "Wellington Anniversary Day",
      province: "Wellington",
    },
    {
      date: "20231204",
      name: "Westland Anniversary Day",
      province: "Westland",
    },
  ],
  "2024": [
    {
      date: "20240129",
      name: "Auckland Anniversary Day",
      province: "Auckland",
    },
    {
      date: "20240923",
      name: "South Canterbury Anniversary Day",
      province: "Canterbury (South)",
    },
    {
      date: "20241115",
      name: "Canterbury Anniversary Day",
      province: "Canterbury",
    },
    {
      date: "20241202",
      name: "Chatham Islands Anniversary Day",
      province: "Chatham Islands",
    },
    {
      date: "20241025",
      name: "Hawke's Bay Anniversary Day",
      province: "Hawke's Bay",
    },
    {
      date: "20241104",
      name: "Marlborough Anniversary Day",
      province: "Marlborough",
    },
    {
      date: "20240129",
      name: "Nelson Anniversary Day",
      province: "Nelson",
    },
    {
      date: "20240325",
      name: "Otago Anniversary Day",
      province: "Otago",
    },
    {
      date: "20240402",
      name: "Southland Anniversary Day",
      province: "Southland",
    },
    {
      date: "20240311",
      name: "Taranaki Anniversary Day",
      province: "Taranaki",
    },
    {
      date: "20240122",
      name: "Wellington Anniversary Day",
      province: "Wellington",
    },
    {
      date: "20241202",
      name: "Westland Anniversary Day",
      province: "Westland",
    },
  ],
};
