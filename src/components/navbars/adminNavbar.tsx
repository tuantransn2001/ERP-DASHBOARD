import * as React from "react";
import user1 from "src/assets/images/user/avatar-1.jpg";
import { getAllBranchApi } from "src/apis/branch/branch";
import { GetAllBranchPayload, IBranch } from "src/domain/branch/branch";
import { useMyQuery } from "src/hooks/useQuery";
import MySelect from "../helpers/dropDown";
import LoadingComponent from "../helpers/shimmerLoader";
import ErrorScreen from "src/screens/error";
import { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const AdminNavbar = () => {
  const [isShowDropdown, setIsShowDropdown] = React.useState<boolean>(false);

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
    <nav className="top-20 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center py-4">
      <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap">
        {/* Brand */}

        <MySelect options={options} placeholder={"Chọn chi nhánh"} />
        {/* Form */}

        <div className="flex align-center">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute w-full h-full flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
              />
            </div>
          </form>

          {/* User */}

          <div className="relative ml-2">
            <img
              id="avatarButton"
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              className="w-12 h-12 rounded-full cursor-pointer"
              src={user1}
              alt="User dropdown"
              onClick={() => setIsShowDropdown((prev) => !prev)}
            />
            {/* Dropdown menu */}
            <div
              id="userDropdown"
              className={`${
                isShowDropdown ? "block" : "hidden"
              } absolute top-[calc(100) + 20px] right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="avatarButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
