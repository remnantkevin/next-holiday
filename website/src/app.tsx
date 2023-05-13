import "./app.css";

const LOCALE = "en-AU" as const;
const TODAY = getDayDate(new Date());
// const pluralRules = new Intl.PluralRules(LOCALE, { type: "cardinal" });
const fullDateFormatter = new Intl.DateTimeFormat(LOCALE, { dateStyle: "full" });
const relativeDateFormatter = new Intl.RelativeTimeFormat(LOCALE, {
  localeMatcher: "best fit",
  numeric: "auto",
  style: "long"
});

// function pluralize(amount: number, singular: string, plural: string): string {
//   const word = pluralRules.select(amount) === "one" ? singular : plural;
//   return `${amount} ${word}`;
// }

// function spreadDate(date: Date): [number, number, number] {
//   return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
// }

function getDayDate(date: Date): Date;
function getDayDate(year: number, month: number, day: number): Date;
function getDayDate(dateOrYear: Date | number, month?: number, day?: number): Date {
  if (isDate(dateOrYear)) {
    return new Date(dateOrYear.getFullYear(), dateOrYear.getMonth(), dateOrYear.getDate());
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return new Date(dateOrYear, month! - 1, day);
}

// function isNumber(v: unknown): v is number {
//   return typeof v === "number";
// }

function isDate(v: unknown): v is Date {
  return v instanceof Date;
}

function getFullDateStr(date: Date): string;
function getFullDateStr(year: number, month: number, day: number): string;
function getFullDateStr(dateOrYear: Date | number, month?: number, day?: number): string {
  if (isDate(dateOrYear)) {
    return fullDateFormatter.format(dateOrYear);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return fullDateFormatter.format(getDayDate(dateOrYear, month!, day!));
}

function getDistanceInDays(from: Date, to: Date): number {
  return Math.floor((to.getTime() - from.getTime()) / 1000 / 3600 / 24);
}

function getRelativeDaysStr(from: Date, to: Date): string {
  return relativeDateFormatter.format(getDistanceInDays(from, to), "day");
}

// TODO: Remove dummy data
const holidayName = "Easter Monday";
const holidayCountryName = "Australia";
const holidaySubdivisionName = "Western Australia";
const holidayDate = getDayDate(2023, 5, 19);

export function App() {
  return (
    <>
      <div>
        <p>{getFullDateStr(holidayDate)}</p>
        <p>{holidayName}</p>
        <p>{getRelativeDaysStr(TODAY, holidayDate)}</p>
      </div>
      <p>is the next public holiday</p>
      <p>
        in {holidaySubdivisionName}, {holidayCountryName}
      </p>
    </>
  );
}
