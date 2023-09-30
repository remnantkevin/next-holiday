import { Context } from "https://edge.netlify.com/v1/index.ts";

export default (request: Request, context: Context) => {
  console.log(JSON.stringify({ request }));
  console.log(JSON.stringify({ context }));

  return Response.json({
    testEvent: true,
    countryCode: context.geo.country?.code,
    countryName: context.geo.country?.name,
    subdivisionCode: context.geo.subdivision?.code,
    subdivisionName: context.geo.subdivision?.name,
  });
};
