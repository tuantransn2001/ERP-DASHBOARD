import AdminLayout from "src/layouts/admin";
import { Helmet } from "react-helmet";
import { useMyQuery } from "src/hooks/useQuery";
import { getAllCustomerApi } from "src/apis/customer/customer";
import { GetAllCustomerPayload } from "src/domain/customer/customer";
import LoadingComponent from "src/components/helpers/shimmerLoader";
import CustomerTable from "src/screens/customer/table";

const CustomerScreen = () => {
  const getAllCustomerData: GetAllCustomerPayload = {
    page_number: 1,
    page_size: 10,
  };
  const { data, isLoading, isError, error } = useMyQuery({
    keyGroup: ["customer"],
    apiCaller: getAllCustomerApi(getAllCustomerData),
  });

  if (isError) {
    console.log({ error });
    return <div>handle error</div>;
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
