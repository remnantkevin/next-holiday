import * as rt from "simple-runtypes";
import { API_SUBDIVISION_NAME } from "./constants";

/** Date string of the form YYYY-MM-DD */
export const APIDateStringRegex = /^(?<year>\d{4})-(?<month>[0-1]\d)-(?<day>[0-3]\d)$/;
export const APIDateStringSchema = rt.string({ match: APIDateStringRegex });

export const APIEventSchema = rt.record({
  /** Name of the holiday. */
  title: rt.string(),
  /** If the observed date is different to the actual date, only the observed date has a corresponding event. */
  date: APIDateStringSchema,
  notes: rt.string(),
  /** Whether or not an image of bunting is shown on the gov.uk bank holidays webpage. */
  bunting: rt.boolean()
});
export type APIEvent = ReturnType<typeof APIEventSchema>;

export const APIResponseSchema = rt.record({
  [API_SUBDIVISION_NAME["england-and-wales"]]: rt.record({
    division: rt.literal(API_SUBDIVISION_NAME["england-and-wales"]),
    events: rt.array(APIEventSchema)
  }),
  [API_SUBDIVISION_NAME["northern-ireland"]]: rt.record({
    division: rt.literal(API_SUBDIVISION_NAME["northern-ireland"]),
    events: rt.array(APIEventSchema)
  }),
  [API_SUBDIVISION_NAME.scotland]: rt.record({
    division: rt.literal(API_SUBDIVISION_NAME.scotland),
    events: rt.array(APIEventSchema)
  })
});
