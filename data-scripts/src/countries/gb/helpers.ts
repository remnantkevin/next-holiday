import { fetchJSON, sortKeyComparator } from "../../shared/utils";
import {
  SUBDIVISION_CODES,
  SUBDIVISION_NAMES,
  API_SUBDIVISION_NAMES,
  API_SUBDIVISION_NAME_TO_SUBDIVISION_CODE,
  YEARS,
  SUBDIVISION_CODE_TO_NAME
} from "./constants";
import { APIDateStringRegex, APIEvent, APIResponseSchema } from "./schema";
import type { Holiday, HolidayBase, SubdivisionCode, SubdivisionName } from "./types";

// export function createSubdivisionMapping() {
//   return Object.fromEntries(
//     SUBDIVISION_CODES.map((code, index) => [code, SUBDIVISION_NAMES[index]])
//   ) as Record<SubdivisionCode, SubdivisionName>;
// }

function transformAPIDate(apiDateString: string): string {
  const result = apiDateString.match(APIDateStringRegex);

  if (result?.groups == undefined) {
    throw Error(`Invalid API date string: ${apiDateString}`);
  }

  return `${result.groups["year"]}${result.groups["month"]}${result.groups["day"]}`;
}

function transformAPIEvent(event: APIEvent): HolidayBase {
  return {
    date: transformAPIDate(event.date),
    name: event.title.replaceAll("\u2019", "'")
  };
}

async function getHolidays(countryCode: string, apiURL: string): Promise<Holiday[]> {
  const apiResponse = await fetchJSON(apiURL);

  const result = APIResponseSchema(apiResponse);

  const holidays = API_SUBDIVISION_NAMES.flatMap((apiDivisionName) => {
    const subdivisionCodes = API_SUBDIVISION_NAME_TO_SUBDIVISION_CODE[apiDivisionName];
    const apiEvents = result[apiDivisionName]["events"];

    return subdivisionCodes.flatMap((subdivisionCode) => {
      const baseHolidays = apiEvents.map((apiEvent) => transformAPIEvent(apiEvent));
      const baseHolidaysForYears = baseHolidays.filter((baseHoliday) =>
        (YEARS as readonly string[]).includes(baseHoliday.date.slice(0, 4))
      );

      return baseHolidaysForYears.map((baseHoliday) => ({
        ...baseHoliday,
        subdivisionCode,
        subdivisionName: SUBDIVISION_CODE_TO_NAME[subdivisionCode],
        sortKey: `${countryCode}-${subdivisionCode}-${baseHoliday.date}`
      }));
    });
  });

  return holidays.sort(sortKeyComparator);

  // const holidays = records.map((record) => {
  //   const subdivisionCode = record.Jurisdiction;
  //   const subdivisionName = AU.subdivisions[subdivisionCode];
  //   const date = record.Date;
  //   const sortKey = `${AU.code}-${subdivisionCode}-${date}`;

  //   return HolidaySchema({
  //     date,
  //     description: record.Information,
  //     moreInfoURL: record["More Information"],
  //     name: record["Holiday Name"],
  //     sortKey,
  //     subdivisionCode,
  //     subdivisionName
  //   });
  // });
  // return holidays;
}

// async function getHolidays(years: readonly Year[]): Promise<Holiday[]> {
//   return (await Promise.all(Object.values(years).map((year) => getHolidaysForYear(year))))
//     .flat()
//     .sort((a, b) => (a.sortKey > b.sortKey ? 1 : -1));
// }

async function writeHolidaysToFile(holidays: Holiday[]): Promise<void> {
  const fileContents = {
    country: {
      code: GB.code,
      name: GB.name
    },
    subdivisions: {
      codes: SUBDIVISION_CODES,
      names: SUBDIVISION_NAMES,
      mapping: GB.subdivisions,
      count: SUBDIVISION_CODES.length
    },
    hasSubdivisionHolidays: GB.hasSubdivisionHolidays,
    years: YEARS,
    moreInfoURL: GB.moreInfoURL,
    holidays
  };

  await fs.writeFile(`data/${fileContents.country.code}.json`, JSON.stringify(fileContents));
}
