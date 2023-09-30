import { ExpectTrue, IsEqual } from "../../shared/types";
import { API_DIVISION_NAME, SUBDIVISION_CODE, SUBDIVISION_CODES } from "./constants";
import { APIDivisionName } from "./types";

type TestAPIDivisionNamesMatch = ExpectTrue<
  IsEqual<{ [k in APIDivisionName]: k }, typeof API_DIVISION_NAME>
>;

type TestSubdivisionCodesMatch = ExpectTrue<
  IsEqual<{ [v in (typeof SUBDIVISION_CODES)[number]]: v }, typeof SUBDIVISION_CODE>
>;
