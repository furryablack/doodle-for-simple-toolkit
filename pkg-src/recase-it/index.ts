import { camelCase } from "camel-case";
import { pascalCase } from "pascal-case";

export function recaseIt(input: string): string {
  const charAt = input.charAt(0);
  const innerCase = charAt === charAt.toUpperCase() ? pascalCase : camelCase;
  return innerCase(input);
}