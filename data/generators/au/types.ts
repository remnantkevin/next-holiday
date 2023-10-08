export type SubdivisionNames = [
  "Australian Capital Territory",
  "New South Wales",
  "Northern Territory",
  "Queensland",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia"
];

export type SubdivisionName = SubdivisionNames[number];

export type SubdivisionCodes = [
  "act",
  "nsw",
  "nt",
  "qld",
  "sa",
  "tas",
  "vic",
  "wa"
];

export type SubdivisionCode = SubdivisionCodes[number];

export type SubdivisionMapping = {
  act: "Australian Capital Territory";
  nsw: "New South Wales";
  nt: "Northern Territory";
  qld: "Queensland";
  sa: "South Australia";
  tas: "Tasmania";
  vic: "Victoria";
  wa: "Western Australia";
};

export type Years = ["2023", "2024"];

export type Year = Years[number];
