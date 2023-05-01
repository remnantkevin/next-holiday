import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// http://localhost:8888/.netlify/functions/function-one
const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello, world!" })
  };
};

export { handler };
