export type ExpectTrue<A extends true> = A;

export type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
