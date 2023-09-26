import { getAllBranchApi } from "src/apis/branch/branch";
import { GetAllBranchPayload, IBranch } from "src/domain/branch/branch";
import { useMyQuery } from "src/hooks/useQuery";
import MySelect from "../helpers/dropDown";
import LoadingComponent from "../helpers/shimmerLoader";
import ErrorScreen from "src/screens/error";
import { AxiosError } from "axios";

const AdminNavbar = () => {
  const getAllBranchData: GetAllBranchPayload = {
    page_number: 1,
    page_size: 3,
  };
  const { data, isLoading, isError, error } = useMyQuery<IBranch[]>({
    keyGroup: ["branches"],
    apiCaller: getAllBranchApi(getAllBranchData),
  });

  if (isLoading) return <LoadingComponent />;

  if (isError) {
    const err = error as AxiosError;
    return <ErrorScreen errorCode={Number(err.response?.status)} />;
  }

  const branches = data?.data?.data as IBranch[];

  const options = branches.map((branch) => ({
    value: branch.id,
    label: branch.agency_branch_name,
    disable: branch.isDelete,
  }));
  return (
    <>
      <div className="h-20"></div>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center py-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-blueGray-600 text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>

          <MySelect options={options} placeholder={"Chọn chi nhánh"} />
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>
          {/* User */}
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default AdminNavbar;
