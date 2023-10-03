import * as st from "npm:simple-runtypes";
import { SUBDIVISION_CODES, SUBDIVISION_NAMES } from "./constants.ts";

type HolidayBase = {
  date: string;
  description: string;
  moreInfoURL: string;
  name: string;
  subdivisionCode: SubdivisionCode;
  subdivisionName: SubdivisionName;
};

export type Holiday = HolidayBase & { sortKey: string };

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

type APIRecordSchema = {
  /** Date string of the form `YYYYMMDD` */
  Date: string;
  "Holiday Name": string;
  Information: string;
  "More Information": string;
  Jurisdiction: SubdivisionCode;
};

/** Date string of the form `YYYYMMDD` */
export const DateStringSchema = st.string({
  match: /^(202[3-4])([0-1]\d)([0-3]\d)$/,
});

export const APIRecordSchema = st.record<APIRecordSchema>({
  Date: DateStringSchema,
  "Holiday Name": st.string(),
  Information: st.string(),
  "More Information": st.string(),
  Jurisdiction: st.stringLiteralUnion(...SUBDIVISION_CODES),
});

type APIResponseSchema = {
  help: string;
  success: boolean;
  result: {
    sql: string;
    fields: Array<{ id: string; type: string }>;
    records: APIRecordSchema[];
  };
};

export const APIResponseSchema = st.record<APIResponseSchema>({
  help: st.string(),
  success: st.boolean(),
  result: st.record({
    sql: st.string(),
    fields: st.array(st.record({ id: st.string(), type: st.string() })),
    records: st.array(APIRecordSchema),
  }),
});

export const HolidaySchema = st.record<Holiday>({
  date: DateStringSchema,
  description: st.string(),
  name: st.string(),
  subdivisionCode: st.stringLiteralUnion(...SUBDIVISION_CODES),
  subdivisionName: st.stringLiteralUnion(...SUBDIVISION_NAMES),
  moreInfoURL: st.string(),
  sortKey: st.string(),
});
