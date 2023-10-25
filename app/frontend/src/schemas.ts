import * as st from "simple-runtypes";
import type { Meta } from "../../../shared/types";

const StringArraySchema = st.array(st.string());
const StringRecordSchema = st.dictionary(st.string(), st.string());
const OptionalStringSchema = st.optional(st.string());

const MetaSchema = st.record<Meta>({
  code: st.string(),
  name: st.string(),
  subdivisions: st.record({
    codes: StringArraySchema,
    names: StringArraySchema,
    mapping: StringRecordSchema,
    count: st.number(),
  }),
  hasSubdivisionHolidays: st.boolean(),
  years: StringArraySchema,
  moreInfoUrls: StringArraySchema,
  // api: st.optional(
  //   st.intersection(st.record({ url: st.string() }), StringRecordSchema)
  // ),
  api: st.optional(StringRecordSchema),
});

export type Holiday = {
  date: string;
  dateObserved?: string;
  description?: string;
  name: string;
  subdivisionCode?: string;
  subdivisionName?: string;
  moreInfoURL?: string;
  sortKey: string;
};

const HolidaySchema = st.record<Holiday>({
  date: st.string(),
  name: st.string(),
  sortKey: st.string(),
  dateObserved: OptionalStringSchema,
  description: OptionalStringSchema,
  subdivisionCode: OptionalStringSchema,
  subdivisionName: OptionalStringSchema,
  moreInfoURL: OptionalStringSchema,
});

export type HolidayResponse = {
  meta: Meta;
  data: Holiday[];
};

export const HolidayResponseSchema = st.record<HolidayResponse>({
  meta: MetaSchema,
  data: st.array(HolidaySchema),
});

export type ErrorResponse = {
  type: "NoCountryCode";
  message: string;
};

export const ErrorResponseSchema = st.record<ErrorResponse>({
  type: st.stringLiteralUnion("NoCountryCode"),
  message: st.string(),
});
