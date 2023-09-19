import LoadingComponent from "src/components/helpers/shimmerLoader";
import { getAllTagApi } from "src/apis/tag/tag";
import { useMyQuery } from "src/hooks/useQuery";
import { GetAllTagPayload, ITag } from "src/domain/tag/tag";
import { SetState } from "src/ts/type/common";

interface Props<D> {
  dataGetter: SetState<D>;
}

export default function TagSelect<D>({ dataGetter }: Props<D>) {
  const getAllStaffData: GetAllTagPayload = {
    page_number: 1,
    page_size: 100,
  };
  const { data, isLoading } = useMyQuery({
    keyGroup: ["tag"],
    apiCaller: getAllTagApi(getAllStaffData),
  });

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        Tags
      </label>

      <select
        onChange={(e) =>
          dataGetter((prev) => ({ ...prev, tag_id: e.target.value }))
        }
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      >
        {data?.data.data.map((tag: ITag) => (
          <option value={tag.id}>{tag.tag_title}</option>
        ))}
      </select>
    </div>
  );
}
