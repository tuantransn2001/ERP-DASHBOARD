import { IDebt } from "src/domain/debt/debt";
import { getAllChangeLogsApi } from "src/apis/debt/debt";
import * as React from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { Box } from "@mui/system";
import LoadingComponent from "src/components/helpers/shimmerLoader";
import ErrorScreen from "src/screens/error";
import { useMyQuery } from "src/hooks/useQuery";

interface Props {
  id: string;
}

const UserDebt = ({ id }: Props) => {
  const columns = React.useMemo<MRT_ColumnDef<IDebt>[]>(
    () => [
      {
        accessorKey: "createdAt",
        enableClickToCopy: true,
        header: "Ngày tạo",
        muiTableBodyCellCopyButtonProps: ({ cell }) => ({
          className: "row-instance-api",
          id: `${cell.getValue<string>()}-row-instance-api`,
        }),
        size: 150,
      },
      {
        accessorKey: "updatedAt",
        header: "Ngày ghi nhận",
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

        size: 100,
      },
      {
        accessorKey: "action",
        enableGlobalFilter: false,
        header: "Hành động",
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
      },
      {
        accessorKey: "debt_note",
        disableFilters: true,
        enableGlobalFilter: false,
        header: "Ghi chú",
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
      },
      {
        accessorKey: "change_debt",
        disableFilters: true,
        enableGlobalFilter: false,
        header: "Giá trị thay đổi",
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
      },
      {
        accessorKey: "debt_amount",
        disableFilters: true,
        enableGlobalFilter: false,
        header: "Tổng công nợ",
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
      },
    ],
    []
  );
  const { data, isLoading, isError } = useMyQuery<IDebt[]>({
    keyGroup: ["customerDebtApi"],
    apiCaller: getAllChangeLogsApi(`${id}`),
  });
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
            data={data?.data.data}
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

export default UserDebt;
