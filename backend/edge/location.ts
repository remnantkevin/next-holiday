import type { Config, Context } from "netlify:edge";

export default (request: Request, context: Context) => {
  console.log({ request });
  console.log({ context });
  return Response.json({
    testEvent: true,
    countryCode: context.geo.country?.code,
    countryName: context.geo.country?.name,
    subdivisionCode: context.geo.subdivision?.code,
    subdivisionName: context.geo.subdivision?.name
  });
};

export const config: Config = {
  path: "/location"
};
