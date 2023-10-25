import { getJson } from "../../shared/utils";
import { COUNTRY_CODE_HEADER_NAME, SUBDIVISION_CODE_HEADER_NAME } from "../../shared/constants";
import { ErrorResponseSchema, type ErrorResponse, HolidayResponseSchema, type HolidayResponse } from "./schemas";

export async function getHolidayData(
  countryCode?: string,
  subdivisionCode?: string
): Promise<
  | {
      success: true;
      headers: { countryCode: string; subdivisionCode: string };
      data: HolidayResponse;
    }
  | { success: false; data: ErrorResponse }
> {
  const searchParams = new URLSearchParams();
  if (countryCode) {
    searchParams.set("countryCode", countryCode);

    if (subdivisionCode) {
      searchParams.set("subdivisionCode", subdivisionCode);
    }
  }
  let searchParamsString = searchParams.toString();
  searchParamsString = searchParamsString ? `?${searchParamsString}` : "";

  const url = `/api/get-data${searchParamsString}`;

  const [rawData, rawResponse] = await getJson(url);

  if (!rawResponse.ok) {
    const data = ErrorResponseSchema(rawData);
    return {
      success: false,
      data,
    };
  }

  const data = HolidayResponseSchema(rawData);
  const headers = parseHolidayHeaders(rawResponse.headers);

  return {
    success: true,
    headers,
    data,
  };
}

function parseHolidayHeaders(headers: Headers): {
  countryCode: string;
  subdivisionCode: string;
} {
  const countryCode = headers.get(COUNTRY_CODE_HEADER_NAME) ?? "";
  const subdivisionCode = headers.get(SUBDIVISION_CODE_HEADER_NAME) ?? "";

  return { countryCode, subdivisionCode };
}
