import * as React from "react";
import {
  MaterialReactTable,
  MRT_RowSelectionState,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import {
  Button,
  Link as MuiLink,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ICustomer } from "src/domain/customer/customer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { multipleDeleteCustomerApi } from "src/apis/customer/customer";
import toast from "src/helpers/toast/toast";
import { ToastContainer } from "react-toastify";

interface Props {
  onlyProps?: Set<keyof MRT_Row>;
  rows: ICustomer[];
}

const CustomerTable = ({ onlyProps, rows }: Props) => {
  const [rowSelection, setRowSelection] = React.useState<MRT_RowSelectionState>(
    {}
  );

  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const columns = React.useMemo<MRT_ColumnDef<ICustomer>[]>(
    () => [
      {
        accessorKey: "user_name",
        enableClickToCopy: true,
        header: "Tên khách hàng",
        muiTableBodyCellCopyButtonProps: ({ cell }) => ({
          className: "row-instance-api",
          id: `${cell.getValue<string>()}-row-instance-api`,
        }),
        size: 150,
      },
      {
        accessorKey: "user_code",
        header: "Mã khách hàng",
        enableGlobalFilter: false,
        Cell: ({ cell, row }) => (
          <a href={`customer/${row.original.id}`}>
            <MuiLink
              target={
                cell.getValue<string>().startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel="noopener"
            >
              {row.original?.user_code}
            </MuiLink>
          </a>
        ),

        size: 100,
      },
      {
        accessorKey: "user_phone",
        disableFilters: true,
        enableGlobalFilter: false,
        header: "Số điện thoại",
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
        accessorKey: "CustSupp.status",
        disableFilters: true,
        enableGlobalFilter: false,
        header: "Trạng thái",
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
        accessorKey: "createdAt",
        disableFilters: true,
        enableGlobalFilter: false,
        header: "Ngày khởi tạo",
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

  const [columnPinning, setColumnPinning] = React.useState({});

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if (isDesktop) {
        setColumnPinning({
          left: ["mrt-row-expand", "mrt-row-numbers", "rowInstanceAPI"],
          right: ["link"],
        });
      } else {
        setColumnPinning({});
      }
    }
  }, [isDesktop]);

  const data = React.useMemo(() => {
    return rows;
  }, [rows]);

  const handleDeleteCustomer = React.useCallback(async () => {
    try {
      const selectedIndexList = Object.keys(rowSelection).reduce(
        (ids: string[], index: string) => {
          const selectedCustomer = rows[+index];

          ids.push(selectedCustomer?.id);

          return ids;
        },
        []
      );

      const { status } = await multipleDeleteCustomerApi(selectedIndexList);

      if (status === 200) {
        toast.success({
          title: "Customer deleted successfully!!",
          action: {
            text: "reload",
            onClick: () => {
              window.location.reload();
            },
          },
        });
      } else {
        toast.error({
          title: "Customer deleted fail!!",
          action: {
            text: "retry",
          },
        });
      }
    } catch (err) {
      console.log("handleDeleteCustomer", err);
    }
  }, [rowSelection, rows]);

  return (
    <>
      <ToastContainer />
      <Button
        component="label"
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={() => navigate("/app/dashboard/customer/create")}
      >
        Thêm khách hàng
      </Button>
      <Button
        component="label"
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteCustomer}
      >
        Xóa khách hàng
      </Button>
      <MaterialReactTable
        columns={columns}
        data={data}
        displayColumnDefOptions={{
          "mrt-row-numbers": {
            size: 10,
          },
          "mrt-row-expand": {
            size: 10,
          },
        }}
        enableColumnActions={!onlyProps}
        enableColumnFilterModes
        enablePagination={false}
        enablePinning
        enableRowSelection
        enableBottomToolbar={false}
        enableTopToolbar={!onlyProps}
        initialState={{
          columnVisibility: { description: false },
          density: "compact",
          showGlobalFilter: true,
          sorting: [{ id: "rowInstanceAPI", desc: false }],
        }}
        muiSearchTextFieldProps={{
          placeholder: "Tìm kiếm trong khách hàng",
          sx: {
            marginBottom: "20px",
            minWidth: "18rem",
            "& input": {
              padding: "10px 0",
            },
          },
          variant: "outlined",
        }}
        muiTablePaperProps={{
          sx: { mb: "1.5rem" },
          id: onlyProps
            ? "relevant-row-instance-apis-table"
            : "row-instance-apis-table",
        }}
        positionGlobalFilter="left"
        renderDetailPanel={({ row }) => (
          <Typography
            color={row.original.id ? "secondary.main" : "text.secondary"}
          >
            {row.original.id || "No Description Provided... Yet..."}
          </Typography>
        )}
        onColumnPinningChange={setColumnPinning}
        onRowSelectionChange={setRowSelection}
        state={{ columnPinning, rowSelection }}
      />
    </>
  );
};

export default CustomerTable;
