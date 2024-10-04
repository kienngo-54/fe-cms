import { isArray, isEqual, isObject, transform } from "lodash";

export const jsonStringify = (obj: any) => {
  try {
    if (obj) {
      return JSON.stringify(obj);
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};

export const jsonParse = <T>(objStr: string | undefined) => {
  try {
    if (objStr) {
      return JSON.parse(objStr) as T;
    }
    return undefined;
  } catch (e) {
    return undefined;
  }
};

export const cloneAndDeleteProperty = <T, K extends keyof T>(
  obj: T,
  propToDelete: K
): Omit<T, K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [propToDelete]: _, ...clonedObj } = obj;
  return clonedObj;
};
export default {
  jsonStringify,
  jsonParse,
  cloneAndDeleteProperty,
};

export const differenceObject = (origObj: any, newObj: any): any => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const changes = (newObj: any, origObj: any) => {
    let arrayIndexCounter = 0;
    return transform(newObj, (result: any, value: any, key: string) => {
      if (!isEqual(value, origObj[key])) {
        // eslint-disable-next-line no-plusplus
        const resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
        result[resultKey] =
          isObject(value) && isObject(origObj[key])
            ? changes(value, origObj[key])
            : value;
      }
    });
  };
  return changes(newObj, origObj);
};
