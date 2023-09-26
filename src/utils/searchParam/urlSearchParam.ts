import { ObjectLiteral } from "src/ts/type/common";

export class URLSearchParam {
  public static objToUrlParams(obj: ObjectLiteral<unknown>) {
    const toUrlParams = (obj: ObjectLiteral<unknown>, prefix = "") => {
      let urlParams = "";

      for (const key in obj) {
        let val = obj[key];

        if (val == null) continue;
        if (val == undefined) continue;
        if (val == "") continue;

        if (val instanceof Array) {
          const valToObj: ObjectLiteral<unknown> = {};
          val.forEach((v, i) => {
            valToObj[i] = v;
          });

          val = valToObj;
        }

        const newPrefix = prefix + key;

        if (val instanceof Object) {
          urlParams += toUrlParams(
            val as ObjectLiteral<unknown>,
            newPrefix + "-"
          );
        } else {
          urlParams += newPrefix + "=" + val;
        }

        urlParams += "&";
      }

      urlParams = urlParams.slice(0, -1);

      return urlParams;
    };

    return encodeURI(toUrlParams(obj));
  }
}
