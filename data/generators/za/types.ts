export type HolidayBase = {
  date: string;
  dateObserved?: string;
  description?: string;
  name: string;
};

export type Holiday = HolidayBase & { sortKey: string };

export type SubdivisionCodes = [
  "ec",
  "fs",
  "gp",
  "kzn",
  "lp",
  "mp",
  "nw",
  "nc",
  "wc"
];

export type SubdivisionCode = SubdivisionCodes[number];

export type SubdivisionNames = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape"
];

export type SubdivisionName = SubdivisionNames[number];

export type SubdivisionMapping = {
  ec: "Eastern Cape";
  fs: "Free State";
  gp: "Gauteng";
  kzn: "KwaZulu-Natal";
  lp: "Limpopo";
  mp: "Mpumalanga";
  nw: "North West";
  nc: "Northern Cape";
  wc: "Western Cape";
};

export type Years = ["2023", "2024"];

export type Year = Years[number];
