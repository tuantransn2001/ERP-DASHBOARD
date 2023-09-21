import { ObjectLiteral } from "src/ts/type/common";

export const isEmpty = (
  target: ObjectLiteral<never | string> | never[]
): boolean => {
  return target instanceof Array
    ? target.length === 0
    : target === undefined || target === null
    ? true
    : Object.keys(target).length === 0;
};
