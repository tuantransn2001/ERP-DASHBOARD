import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { getCustomerByIdApi } from "src/apis/customer/customer";
import LoadingComponent from "src/components/helpers/shimmerLoader";
import { useMyQuery } from "src/hooks/useQuery";
import ErrorScreen from "../error";
import {  Typography } from "@mui/material";
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

const CustomerDetailScreen = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useMyQuery<ICustomerDetail>({
    keyGroup: ["customerById"],
    apiCaller: getCustomerByIdApi(`${id}`),
  });

  if (isError) {
    return <ErrorScreen errorCode={500} />;
  }
  const customer: ICustomerDetail = data?.data.data;

  return (
    <div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <AdminLayout>
          <Box className="md:px-10 px-4" sx={{ maxWidth: "100%" }}>
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
                        fieldName: customer.user_name,
                        placeholder: customer.user_name,
                        label: "Tên khách hàng",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: "gender",
                        placeholder: "--",
                        label: "Giới tính",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: customer.user_phone,
                        placeholder: customer.user_phone,
                        label: "Số điện thoại",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: customer.user_email,
                        placeholder: customer.user_email,
                        label: "Email",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: customer.CustSupp.Staff.User
                          .user_name as string,
                        placeholder: customer.CustSupp.Staff.User.user_name,
                        label: "Nhân viên phụ trách",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: customer.user_code,
                        placeholder: customer.user_code,
                        label: "Mã khách hàng",
                        type: FIELD_TYPE.text,
                      },
                      {
                        fieldName: customer.CustSupp.staff_in_charge_note,
                        placeholder: customer.CustSupp.staff_in_charge_note,
                        label: "Mô tả",
                        type: FIELD_TYPE.text,
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
                      {
                        fieldName: "debt",
                        placeholder: "--",
                        type: FIELD_TYPE.text,
                        label: "Công nợ hiện tại",
                      },
                    ]}
                    isLoading={false}
                    handleOnSubmit={(data) => console.log(data)}
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
