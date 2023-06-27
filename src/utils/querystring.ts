import qs from "query-string";

export const stringify = (payload: Record<string, any>): string =>
  qs.stringify(payload).replace(/&[^=&]+=(?=&|$)/g, "");
