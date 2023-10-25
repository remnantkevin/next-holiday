import type { Context } from "npm:@netlify/edge-functions";
// import {
//   ALLOWED_COUNTRY_CODES,
//   COUNTRY_CODE_HEADER_NAME,
//   DATA_VERSION,
//   ERROR_RESPONSE_TYPE,
//   SUBDIVISION_CODE_HEADER_NAME,
// } from "../../../shared/constants.ts";

const ALLOWED_COUNTRY_CODES = ["au", "gb", "ie", "nz", "za"];

const COUNTRY_CODE_HEADER_NAME = "Next-Holiday-Country-Code";
const SUBDIVISION_CODE_HEADER_NAME = "Next-Holiday-Subdivision-Code";

const DATA_VERSION = "e051ea82d8cbbb08ce8ff694b5eb7686074485af";

const ERROR_RESPONSE_TYPE = {
  NoCountryCode: "NoCountryCode",
} as const;

const DEFAULT_SUBDIVISION_CODE: Record<string, string> = {
  au: "act",
  gb: "eng",
  ie: "c",
  nz: "auk",
  za: "ec",
};

export default async (request: Request, context: Context) => {
  console.log(JSON.stringify({ request }));
  console.log(JSON.stringify({ context }));

  const queryStringParams = getQueryStringParams(request);
  const [countryCode, countryCodeProvidedInParams] = getCountryCode(queryStringParams, context.geo);

  if (!countryCode) {
    return Response.json(
      {
        type: ERROR_RESPONSE_TYPE.NoCountryCode,
        message: "No valid country code found.",
      },
      {
        status: 400,
      }
    );
  }

  const subdivisionCodeRaw = getSubdivisionCode(queryStringParams, context.geo, countryCodeProvidedInParams);
  const subdivisionCode = subdivisionCodeRaw ? subdivisionCodeRaw.toLowerCase() : "";

  const dataResponse = await fetch(createDataUrl(countryCode));

  return new Response(dataResponse.body, {
    headers: {
      "Content-Encoding": "gzip",
      "Content-Type": "application/json",
      [COUNTRY_CODE_HEADER_NAME]: countryCode,
      [SUBDIVISION_CODE_HEADER_NAME]: subdivisionCode,
    },
  });
};

/**
 * A country code in URL params takes precedence over a country code in the geographic context of a request.
 * This is because a country code in the URL params is explicitly specified by the frontend and allows the
 * frontend to get holiday data for different countries, not just the one where the request originated.
 * Returning `undefined` means no valid country code could be found.
 */
function getCountryCode(
  queryStringParams: Record<string, string>,
  geo: Context["geo"]
): [string | undefined, string | undefined] {
  if (queryStringParams.countryCode) {
    return [getAllowedCountryCode(queryStringParams.countryCode), getAllowedCountryCode(queryStringParams.countryCode)];
  }

  return [getAllowedCountryCode(geo.country?.code ?? ""), undefined];
}

function getAllowedCountryCode(code: string): string | undefined {
  return ALLOWED_COUNTRY_CODES.find((it) => it === code.toLowerCase());
}

function getSubdivisionCode(
  queryStringParams: Record<string, string>,
  geo: Context["geo"],
  countryCodeProvidedInParams: string | undefined
): string | undefined {
  if (countryCodeProvidedInParams) {
    if (queryStringParams.subdivisionCode) {
      return queryStringParams.subdivisionCode;
    } else {
      return getDefaultSubdivisionCode(countryCodeProvidedInParams);
    }
  } else {
    return geo.subdivision?.code;
  }
}

function getDefaultSubdivisionCode(countryCode: string): string | undefined {
  return DEFAULT_SUBDIVISION_CODE[countryCode];
}

function getQueryStringParams(request: Request): Record<string, string> {
  return Object.fromEntries(new URL(request.url).searchParams);
}

function createDataUrl(countryCode: string): string {
  return `https://cdn.jsdelivr.net/gh/remnantkevin/next-holiday@${DATA_VERSION}/data/generated/${countryCode.toLowerCase()}.json.gz`;
}
