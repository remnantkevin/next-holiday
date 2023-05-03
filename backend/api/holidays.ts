import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// TODO: take in query params: ?country=AU&region=WA
// start with only getting raw github content for au, wa
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log(JSON.stringify({ event }));
  console.log(JSON.stringify({ context }));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, world!" })
  };
};

export { handler };
