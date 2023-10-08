export type HolidayBase = {
  date: string;
  description?: string;
  name: string;
};

export type Holiday = HolidayBase & { sortKey: string };

export type SubdivisionCodes = ["c", "l", "m", "u"];

export type SubdivisionCode = SubdivisionCodes[number];

export type SubdivisionNames = [
  "Connaught (Connacht)",
  "Leinster (Laighin)",
  "Munster (An Mhumhain)",
  "Ulster (Ulaidh)"
];

export type SubdivisionName = SubdivisionNames[number];

export type SubdivisionCodeToNameMapping = {
  c: "Connaught (Connacht)";
  l: "Leinster (Laighin)";
  m: "Munster (An Mhumhain)";
  u: "Ulster (Ulaidh)";
};

export type Years = ["2023", "2024"];

export type Year = Years[number];
