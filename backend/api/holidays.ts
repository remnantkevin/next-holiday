import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// TODO: take in query params: ?country=AU&region=WA
// start with only getting raw github content for au, wa
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log({ event });
  console.log({ context });
  return {
    statusCode: 200,
    body: JSON.stringify({
      countryCode: event.queryStringParameters?.["countryCode"],
      subdivisionCode: event.queryStringParameters?.["subdivisionCode"]
    })
  };
};

export { handler };
