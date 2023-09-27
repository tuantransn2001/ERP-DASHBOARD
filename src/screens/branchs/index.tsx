import * as React from "react";
import { getAllBranchApi } from "src/apis/branch/branch";
import MyForm from "src/components/helpers/form";
import {
  FIELD_TYPE,
  IField,
} from "src/components/helpers/form/shared/form.interface";
import MyModal from "src/components/helpers/modal";
import LoadingComponent from "src/components/helpers/shimmerLoader";
import { GetAllBranchPayload, IBranch } from "src/domain/branch/branch";
import { useMyQuery } from "src/hooks/useQuery";
import AdminLayout from "src/layouts/admin";
import ErrorScreen from "../error";
import AgencyBranchTable from "./table";

const AgencyBranchScreen = () => {
  const [selectedBranch, setSelectedBranch] = React.useState<IBranch | null>(
    null
  );
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const getAllBranchData: GetAllBranchPayload = {
    page_size: 3,
    page_number: 1,
  };

  const { data, isLoading, isError } = useMyQuery<IBranch[]>({
    keyGroup: ["branch"],
    apiCaller: getAllBranchApi(getAllBranchData),
  });

  const agencyBranches: IBranch[] = data?.data.data;

  if (isError) {
    return <ErrorScreen errorCode={500} />;
  }

  //   ({
  //     label: selectedBranch[key] as string,
  // placeholder?: "description";
  // fieldName: key;
  // type: FIELD_TYPE.text;
  //   })

  const renderFields = () =>
    selectedBranch
      ? Object.keys(selectedBranch as IBranch).map((key: unknown) => {
          // const currentBranch = selectedBranch as IBranch;

          return {
            // label: currentBranch[key as keyof IBranch],
            label: key,
            placeholder: `Enter ${key}`,
            fieldName: key,
            type: FIELD_TYPE.text,
          };
        })
      : [];
  console.log(renderFields());
  return (
    <AdminLayout>
      <MyModal isVisible={isVisible} setIsVisible={setIsVisible}>
        <MyForm<IField>
          fields={renderFields() as IField[]}
          handleOnSubmit={(data) => console.log(data)}
          isLoading={false}
        />
      </MyModal>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <AgencyBranchTable
          setIsVisible={setIsVisible}
          setSelectedBranch={setSelectedBranch}
          rows={agencyBranches}
        />
      )}
    </AdminLayout>
  );
};
export default AgencyBranchScreen;
