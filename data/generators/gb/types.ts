export type HolidayBase = {
  date: string;
  description?: string;
  moreInfoURL?: string;
  name: string;
};

export type Holiday = HolidayBase & {
  subdivisionCode: SubdivisionCode;
  subdivisionName: SubdivisionName;
  sortKey: string;
};

export type ApiSubdivisionNames = [
  "england-and-wales",
  "northern-ireland",
  "scotland"
];

export type ApiSubdivisionName = ApiSubdivisionNames[number];

export type ApiSubdivisionNameToSubdivisionCode = {
  "england-and-wales": ["eng", "wls"];
  "northern-ireland": ["nir"];
  scotland: ["sct"];
};

export type SubdivisionNames = [
  "England",
  "Northern Ireland",
  "Scotland",
  "Wales"
];

export type SubdivisionName = SubdivisionNames[number];

export type SubdivisionCodes = ["eng", "nir", "sct", "wls"];

export type SubdivisionCode = SubdivisionCodes[number];

export type SubdivisionCodeToNameMapping = {
  eng: "England";
  nir: "Northern Ireland";
  sct: "Scotland";
  wls: "Wales";
};

export type Years = ["2023", "2024"];

export type Year = Years[number];
