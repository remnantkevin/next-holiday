import {
  ALLOWED_COUNTRY_CODES,
  COUNTRY_CODE_HEADER_NAME,
  DATA_VERSION,
  DEFAULT_SUBDIVISION_CODE,
  ERROR_RESPONSE_TYPE,
  SUBDIVISION_CODE_HEADER_NAME,
} from "../../shared/constants";

export const onRequest: PagesFunction = async (context) => {
  const [geolocationCountryCode, geolocationSubdivisionCode] = getGeolocationCodes(context.request.cf);

  const queryStringParams = getQueryStringParams(context.request);
  const [countryCode, paramsCountryCode] = getCountryCode(queryStringParams, geolocationCountryCode);

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

  const subdivisionCodeRaw = getSubdivisionCode(queryStringParams, geolocationSubdivisionCode, paramsCountryCode);
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

function getGeolocationCodes(cloudflareRequestProperties: CfProperties<unknown> | undefined): [string, string] {
  let geolocationCountryCode = "";
  if (cloudflareRequestProperties?.country && typeof cloudflareRequestProperties?.country === "string") {
    geolocationCountryCode = cloudflareRequestProperties.country;
  }

  let geolocationSubdivisionCode = "";
  if (cloudflareRequestProperties?.regionCode && typeof cloudflareRequestProperties?.regionCode === "string") {
    geolocationSubdivisionCode = cloudflareRequestProperties?.regionCode;
  }

  return [geolocationCountryCode, geolocationSubdivisionCode];
}

/**
 * A country code in URL params takes precedence over a country code in the geographic context of a request.
 * This is because a country code in the URL params is explicitly specified by the frontend and allows the
 * frontend to get holiday data for different countries, not just the one where the request originated.
 * Returning `undefined` means no valid country code could be found.
 */
function getCountryCode(
  queryStringParams: Record<string, string>,
  geolocationCountryCode: string
): [string | undefined, string | undefined] {
  if (queryStringParams.countryCode) {
    return [getAllowedCountryCode(queryStringParams.countryCode), getAllowedCountryCode(queryStringParams.countryCode)];
  }

  return [getAllowedCountryCode(geolocationCountryCode), undefined];
}

function getAllowedCountryCode(code: string): string | undefined {
  return ALLOWED_COUNTRY_CODES.find((it) => it === code.toLowerCase());
}

function getSubdivisionCode(
  queryStringParams: Record<string, string>,
  geolocationSubdivisionCode: string,
  paramsCountryCode: string | undefined
): string | undefined {
  if (paramsCountryCode && queryStringParams.subdivisionCode) {
    return queryStringParams.subdivisionCode;
  } else if (paramsCountryCode) {
    return getDefaultSubdivisionCode(paramsCountryCode);
  } else {
    return geolocationSubdivisionCode;
  }
}

function getDefaultSubdivisionCode(countryCode: string): string | undefined {
  return DEFAULT_SUBDIVISION_CODE[countryCode];
}

function getQueryStringParams(request: Request): Record<string, string> {
  return Object.fromEntries(new URL(request.url).searchParams);
}

function createDataUrl(countryCode: string): string {
  return `https://cdn.jsdelivr.net/gh/remnantkevin/next-holiday@${DATA_VERSION}/data/generated/${countryCode.toLowerCase()}.json`;
}
