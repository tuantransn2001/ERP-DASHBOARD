import LoadingComponent from "src/components/helpers/shimmerLoader";
import { getVietNamProvinceApi } from "src/apis/province/province";
import { useMyQuery } from "src/hooks/useQuery";
import { IDistrict, IProvince } from "./shared/province.interface";
import * as React from "react";
import { SetState } from "src/ts/type/common";
import TextField from "../helpers/form/Text";
import { FIELD_TYPE } from "../helpers/form/shared/form.interface";

interface Props<D> {
  dataGetter: SetState<D>;
}

export default function ProvinceSelect<D>({ dataGetter }: Props<D>) {
  const [selectedProvince, setSelectedProvince] = React.useState<string>("");
  const { data, isLoading } = useMyQuery({
    keyGroup: ["province"],
    apiCaller: getVietNamProvinceApi(3),
  });

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <div className="relative w-full mb-3 flex justify-between gap-2">
      <div className="w-6/12">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Chọn Tỉnh/Thành phố
        </label>
        <select
          onChange={(e) => {
            setSelectedProvince(e.target.value);
            dataGetter((prev: D) => ({
              ...prev,
              user_province: e.target.value,
            }));
          }}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        >
          {data?.data.map((province: IProvince) => (
            <option value={province.name}>{province.name}</option>
          ))}
        </select>
      </div>
      <div className="w-6/12">
        <label
          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
          htmlFor="grid-password"
        >
          Chọn Quận/Huyện
        </label>
        <select
          onChange={(e) =>
            dataGetter((prev: D) => ({
              ...prev,
              user_district: e.target.value,
            }))
          }
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        >
          {selectedProvince ? (
            data?.data
              .find((province: IProvince) => province.name === selectedProvince)
              .districts.map((district: IDistrict) => (
                <option value={district.name}>{district.name}</option>
              ))
          ) : (
            <option value="empty">Chọn Quận/Huyện</option>
          )}
        </select>
      </div>
      <div>
        <TextField
          field={{
            fieldName: "user_specific_address",
            type: FIELD_TYPE.text,
            placeholder: "Nhập số nhà,quận,huyện",
            label: "Địa chỉ cụ thể",
          }}
          onChange={(e) =>
            dataGetter((prev: D) => ({
              ...prev,
              user_specific_address: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
}
