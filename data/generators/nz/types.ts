export type HolidayBase = {
  date: string;
  dateObserved?: string;
  description?: string;
  name: string;
};

export type Holiday = HolidayBase & {
  sortKey: string;
  subdivisionCode: SubdivisionCode;
  subdivisionName: SubdivisionName;
};

export type AnniversaryDay = {
  date: string;
  name: string;
  province: ProvinceName;
};

export type SubdivisionCodes = [
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
];

export type SubdivisionCode = SubdivisionCodes[number];

export type SubdivisionNames = [
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
];

export type SubdivisionName = SubdivisionNames[number];

export type SubdivisionCodeToSubdivisionName = {
  auk: "Auckland (Tāmaki Makaurau)";
  bop: "Bay of Plenty (Toi Moana)";
  can: "Canterbury (Waitaha)";
  cit: "Chatham Islands Territory (Wharekauri)";
  gis: "Gisborne (Te Tairāwhiti)";
  wgn: "Greater Wellington (Te Pane Matua Taiao)";
  hkb: "Hawke's Bay (Te Matau-a-Māui)";
  mwt: "Manawatū-Whanganui (Manawatū Whanganui)";
  mbh: "Marlborough";
  nsn: "Nelson (Whakatū)";
  ntl: "Northland (Te Taitokerau)";
  ota: "Otaga (Ō Tākou)";
  stl: "Southland (Te Taiao Tonga)";
  tki: "Taranaki";
  tas: "Tasman (Te tai o Aorere)";
  wko: "Waikato";
  wtc: "West Coast (Te Tai o Poutini)";
};

export type ProvinceNames = [
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
];

export type ProvinceName = ProvinceNames[number];

export type SubdivisionCodeToProvinceNames = Record<
  SubdivisionCode,
  ProvinceName[]
>;

/** Not used. */
type ProvinceNameToSubdivisionCodes = {
  Auckland: ["auk", "bop", "gis", "ntl", "wko"];
  "Canterbury (South)": ["can"];
  Canterbury: ["can"];
  "Chatham Islands": ["cit"];
  "Hawke's Bay": ["hkb"];
  Marlborough: ["mbh"];
  Nelson: ["nsn", "tas"];
  Otago: ["ota"];
  Southland: ["stl"];
  Taranaki: ["tki"];
  Wellington: ["mwt", "wgn"];
  Westland: ["wtc"];
};

export type Years = ["2023", "2024"];

export type Year = Years[number];
