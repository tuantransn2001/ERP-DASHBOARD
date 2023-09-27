import Grid from "@mui/material/Grid";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCustomerByIdApi,
  updateCustomerApi,
} from "src/apis/customer/customer";
import LoadingComponent from "src/components/helpers/shimmerLoader";
import { useMyQuery } from "src/hooks/useQuery";
import ErrorScreen from "../error";
import { Typography } from "@mui/material";
import AdminLayout from "src/layouts/admin";
import { Box } from "@mui/system";
import { ICustomerDetail } from "src/domain/customer/customer";
import MyForm from "src/components/helpers/form";
import { FIELD_TYPE } from "src/components/helpers/form/shared/form.interface";
import MultipleSelect from "src/components/helpers/form/MultipleSelect";
import MyTabs from "src/components/helpers/tab";
import UserDebt from "src/components/additionInformation/debt";
import UserAddress from "src/components/additionInformation/address";
import MyButton from "src/components/helpers/button";
import { getAllStaffApi } from "src/apis/staff/staff";
import { GetAllStaffPayload, IStaff } from "src/domain/staff/staff";
import { handleToastOnServerError } from "src/services/httpService/helpers";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import { UpdateCustomerDTO } from "src/utils/postApiBodyCheck/customer/shared/customer.interface";
import { handleValidateUpdateCustomerDTO } from "src/utils/postApiBodyCheck/customer/customer";
import toast from "src/helpers/toast/toast";
import { ToastContainer } from "react-toastify";

const CustomerDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, isError } = useMyQuery<ICustomerDetail>({
    keyGroup: ["customerById"],
    apiCaller: getCustomerByIdApi(`${id}`),
  });

  const { data: staffData } = useMyQuery<IStaff[]>({
    keyGroup: ["staffs"],
    apiCaller: getAllStaffApi({
      page_number: 1,
      page_size: 100,
    } as GetAllStaffPayload),
  });

  if (isError) {
    return <ErrorScreen errorCode={500} />;
  }
  const customer: ICustomerDetail = data?.data.data;
  const staffs: IStaff[] = staffData?.data.data;

  const handleUpdateCustomer = async (data: UpdateCustomerDTO) => {
    try {
      const updateData = handleValidateUpdateCustomerDTO({
        ...data,
        id,
      }) as UpdateCustomerDTO;

      const updateCustomerResult = await updateCustomerApi(updateData);

      const isSuccess = updateCustomerResult.status === 200;

      if (isSuccess) {
        toast.success({
          title: updateCustomerResult?.data.message,
          action: {
            text: "Back to home",
            onClick: () => navigate("/app/dashboard"),
          },
        });
      }
    } catch (err) {
      handleToastOnServerError(err as ZodError | AxiosError);
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <AdminLayout>
          <ToastContainer />
          <Box className="px-4" sx={{ maxWidth: "100%" }}>
            <Box className="mb-3 flex justify-between">
              <Box>
                <Typography>{customer.user_name}</Typography>
                <Typography>{customer.CustSupp.status}</Typography>
              </Box>
              <Box>
                <MyButton>Cập nhật thay đổi</MyButton>
              </Box>
            </Box>

            <Box className="mb-3">
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  <Box className="mb-6">
                    <Typography>Thông tin chung</Typography>
                  </Box>
                  <MyForm
                    fields={[
                      {
                        fieldName: "user_name",
                        placeholder: customer.user_name,
                        label: "Tên khách hàng",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: "user_phone",
                        placeholder: customer.user_phone,
                        label: "Số điện thoại",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: "user_email",
                        placeholder: customer.user_email,
                        label: "Email",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: customer.CustSupp.Staff.User
                          .user_name as string,
                        placeholder: "Change to dropdown",
                        label: "Nhân viên phụ trách",
                        type: FIELD_TYPE.select,
                        options: staffs.map((staff) => ({
                          label: staff.user_name,
                          value: staff.Staff.id,
                        })),
                      },
                      {
                        fieldName: "user_code",
                        placeholder: customer.user_code,
                        label: "Mã khách hàng",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: "staff_in_charge_note",
                        placeholder: customer.CustSupp.staff_in_charge_note,
                        label: "Mô tả",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: "status",
                        placeholder: customer.CustSupp.status,
                        label: "Trạng thái",
                        type: FIELD_TYPE.select,
                        options: [
                          {
                            label: "Đang làm việc",
                            value: "Đang làm việc",
                          },
                          {
                            label: "Đã nghỉ việc",
                            value: "Đã nghỉ việc",
                          },
                        ],
                      },
                    ]}
                    isLoading={false}
                    handleOnSubmit={handleUpdateCustomer}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box className="mb-6">
                    <Typography>Thông tin mua hàng</Typography>
                  </Box>
                  <MyForm
                    fields={[
                      {
                        fieldName: "payment_total",
                        placeholder: "--",
                        type: FIELD_TYPE.text,
                        label: "Tổng chi tiêu",
                      },
                      {
                        fieldName: "order_total",
                        placeholder: "--",
                        type: FIELD_TYPE.text,
                        label: "Tổng số lượng đơn hàng",
                      },
                      {
                        fieldName: "last_day_buy",
                        placeholder: "--",
                        type: FIELD_TYPE.text,
                        label: "Ngày cuối mua hàng",
                      },
                      {
                        fieldName: "product_amount_total_refund",
                        placeholder: "--",
                        type: FIELD_TYPE.text,
                        label: "Tổng số lượng sản phẩm hoàn trả",
                      },
                    ]}
                    isLoading={false}
                    handleOnSubmit={(data) => console.log(data)}
                  />
                  <MultipleSelect
                    title="Tags"
                    options={[{ label: "customer", value: "customer 1" }]}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <MyTabs
                  data={[
                    {
                      label: "Địa chỉ",
                      Component: (
                        <UserAddress
                          data={customer.UserAddresses}
                          isLoading={isLoading}
                          isError={isError}
                        />
                      ),
                    },
                    {
                      label: "Công nợ",
                      Component: <UserDebt id={customer.id} />,
                    },
                  ]}
                />
              </Grid>
            </Box>
          </Box>
        </AdminLayout>
      )}
    </div>
  );
};
export default CustomerDetailScreen;
