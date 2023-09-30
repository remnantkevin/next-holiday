import { API_DIVISION_NAMES, SUBDIVISION_CODES, SUBDIVISION_NAMES } from "./constants";

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

export type SubdivisionCode = (typeof SUBDIVISION_CODES)[number];

export type SubdivisionName = (typeof SUBDIVISION_NAMES)[number];

export type APIDivisionName = (typeof API_DIVISION_NAMES)[number];
