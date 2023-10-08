import * as st from "npm:simple-runtypes";
import { API_DATE_STRING_REGEX } from "./constants.ts";

export type ApiEvent = {
  /** Name of the holiday. */
  title: string;
  /**
   * Date string of the form `YYYY-MM-DD`.
   *
   * If the observed date is different to the actual date, only the observed date has a corresponding event.
   */
  date: string;
  notes: string;
  /** Whether or not an image of bunting is shown on the gov.uk bank holidays webpage. */
  bunting: boolean;
};

/** Date string of the form `YYYY-MM-DD`. */
export const ApiDateStringSchema = st.string({
  match: API_DATE_STRING_REGEX,
});

export const ApiEventSchema = st.record<ApiEvent>({
  title: st.string(),
  date: ApiDateStringSchema,
  notes: st.string(),
  bunting: st.boolean(),
});

export type ApiResponse = {
  "england-and-wales": {
    division: "england-and-wales";
    events: ApiEvent[];
  };
  "northern-ireland": {
    division: "northern-ireland";
    events: ApiEvent[];
  };
  scotland: {
    division: "scotland";
    events: ApiEvent[];
  };
};

export const ApiResponseSchema = st.record<ApiResponse>({
  "england-and-wales": st.record({
    division: st.literal("england-and-wales"),
    events: st.array(ApiEventSchema),
  }),
  "northern-ireland": st.record({
    division: st.literal("northern-ireland"),
    events: st.array(ApiEventSchema),
  }),
  scotland: st.record({
    division: st.literal("scotland"),
    events: st.array(ApiEventSchema),
  }),
});
