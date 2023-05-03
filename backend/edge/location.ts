import type { Config, Context } from "netlify:edge";

export default (request: Request, context: Context) => {
  console.log(JSON.stringify({ request }));
  console.log(JSON.stringify({ context }));
  return new Response("Hello, World!", {
    headers: { "content-type": "text/html" }
  });
};

export const config: Config = {
  path: "/location"
};
