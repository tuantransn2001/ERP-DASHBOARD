import * as React from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/system";
import LoadingComponent from "src/components/helpers/shimmerLoader";
import ErrorScreen from "src/screens/error";
import { IUserAddress } from "src/domain/common/common";

interface Props {
  isLoading: boolean;
  isError: boolean;
  data: IUserAddress[];
}

const UserAddress = ({ isLoading, isError, data }: Props) => {
  const columns = React.useMemo<MRT_ColumnDef<IUserAddress>[]>(
    () => [
      {
        accessorKey: "user_specific_address",
        enableClickToCopy: true,
        header: "Địa chỉ",
        muiTableBodyCellCopyButtonProps: ({ cell }) => ({
          className: "row-instance-api",
          id: `${cell.getValue<string>()}-row-instance-api`,
        }),
        size: 350,
      },
      {
        accessorKey: "user_district",
        header: "Quận - huyện",
        enableGlobalFilter: false,
        Cell: ({ cell }) => (
          <div
            className="language-ts"
            style={{
              backgroundColor: "transparent",
              fontSize: "0.9rem",
              margin: 0,
              padding: 0,
              minHeight: "unset",
            }}
          >
            {cell.getValue<string>()}
          </div>
        ),

        size: 350,
      },
      {
        accessorKey: "user_province",
        enableGlobalFilter: false,
        header: "Tỉnh thành phố",
        Cell: ({ cell }) => (
          <div
            className="language-ts"
            style={{
              backgroundColor: "transparent",
              fontSize: "0.9rem",
              margin: 0,
              padding: 0,
              minHeight: "unset",
            }}
          >
            {cell.getValue<string>()}
          </div>
        ),
        size: 344,
      },
    ],
    []
  );

  if (isError) {
    return <ErrorScreen errorCode={500} />;
  }

  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Box className="w-full">
          <MaterialReactTable
            columns={columns}
            data={data}
            enableColumnFilterModes
            enablePagination={false}
            enablePinning
            enableBottomToolbar={false}
          />
        </Box>
      )}
    </div>
  );
};

export default UserAddress;
