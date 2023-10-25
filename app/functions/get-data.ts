// import { Context } from "https://edge.netlify.com";

// export default (request: Request, context: Context) => {
//   console.log(JSON.stringify({ request }));
//   console.log(JSON.stringify({ context }));

//   return Response.json({
//     testEvent: true,
//     countryCode: context.geo.country?.code,
//     countryName: context.geo.country?.name,
//     subdivisionCode: context.geo.subdivision?.code,
//     subdivisionName: context.geo.subdivision?.name,
//   });
// };

// interface Env {
//   KV: KVNamespace;
// }

export const onRequest: PagesFunction = async (context) => {
  // const value = await context.env.KV.get("example");

  // console.log({ context });
  // console.log({ "param keys": Object.keys(context.params) });
  // console.log({ "env keys": Object.keys(context.env) });
  // console.log({ "data keys": Object.keys(context.data) });
  // console.log({ "context.request.cf": context.request.cf });
  // console.log({ "context.request.headers.entries()": Object.fromEntries(context.request.headers.entries()) });

  const countryCode = context.request.cf?.country ?? "";
  const subdivisionCode = context.request.cf?.regionCode ?? "";
  const subdivisionName = context.request.cf?.region ?? "";

  return Response.json({
    countryCode,
    subdivisionCode,
    subdivisionName,
  });
};
