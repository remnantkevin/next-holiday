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

  console.log(JSON.stringify({ context }));
  console.log(JSON.stringify({ "context.request.headers.entries()": context.request.headers.entries() }));

  return new Response("testResponse");
};
