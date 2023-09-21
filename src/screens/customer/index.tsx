import AdminLayout from "src/layouts/admin";
import { Helmet } from "react-helmet";
import { useMyQuery } from "src/hooks/useQuery";
import { getAllCustomerApi } from "src/apis/customer/customer";
import { GetAllCustomerPayload } from "src/domain/customer/customer";
import LoadingComponent from "src/components/helpers/shimmerLoader";
import CustomerTable from "src/screens/customer/table";
import ErrorScreen from "../error";

const CustomerScreen = () => {
  const getAllCustomerData: GetAllCustomerPayload = {
    page_number: 1,
    page_size: 10,
  };
  const { data, isLoading, isError } = useMyQuery({
    keyGroup: ["customer"],
    apiCaller: getAllCustomerApi(getAllCustomerData),
  });

  if (isError) {
    return <ErrorScreen errorCode={500} />;
  }

  return (
    <>
      <Helmet>
        <title>Customers</title>
      </Helmet>
      <AdminLayout>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="mt-21">
            <CustomerTable rows={data?.data.data} />
          </div>
        )}
      </AdminLayout>
    </>
  );
};
export default CustomerScreen;
