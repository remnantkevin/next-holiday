export type Meta = {
  code: string;
  name: string;
  subdivisions: {
    codes: string[];
    names: string[];
    mapping: Record<string, string>;
    count: number;
  };
  hasSubdivisionHolidays: boolean;
  years: string[];
  moreInfoUrls: string[];
  api?: {
    // url: string;
    [key: string]: string;
  };
};
