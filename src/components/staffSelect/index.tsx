import LoadingComponent from "src/components/helpers/shimmerLoader";
import { getAllStaffApi } from "src/apis/staff/staff";
import { useMyQuery } from "src/hooks/useQuery";
import { GetAllStaffPayload, IStaff } from "src/domain/staff/staff";
import { SetState } from "src/ts/type/common";
interface Props<D> {
  dataGetter: SetState<D>;
}

export default function StaffSelect<D>({ dataGetter }: Props<D>) {
  const getAllStaffData: GetAllStaffPayload = {
    page_number: 1,
    page_size: 100,
  };
  const { data, isLoading } = useMyQuery({
    keyGroup: ["staff"],
    apiCaller: getAllStaffApi(getAllStaffData),
  });

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        Nhân viên phụ trách
      </label>

      <select
        onChange={(e) =>
          dataGetter((prev) => ({ ...prev, staff_id: e.target.value }))
        }
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      >
        {data?.data.data.map((staff: IStaff) => (
          <option value={staff.id}>{staff.user_name}</option>
        ))}
      </select>
    </div>
  );
}
