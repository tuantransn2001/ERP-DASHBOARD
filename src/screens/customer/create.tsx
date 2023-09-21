import {
  IField,
  FIELD_TYPE,
} from "src/components/helpers/form/shared/form.interface";
import { useForm } from "react-hook-form";
import AdminLayout from "src/layouts/admin";
import { CreateCustomerDTO } from "src/utils/postApiBodyCheck/customer/shared/customer.interface";
import TextField from "src/components/helpers/form/Text";
import SelectField from "src/components/helpers/form/Select";
import ProvinceSelect from "src/components/provinceSelect";
import StaffSelect from "src/components/staffSelect";
import TagSelect from "src/components/tagSelect";
import * as React from "react";
import { handleValidateCustomerDTO } from "src/utils/postApiBodyCheck/customer/customer";
import { createCustomerApi } from "src/apis/customer/customer";
import toast from "src/helpers/toast/toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleToastOnServerError } from "src/services/httpService/helpers";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import MyButton from "src/components/helpers/button";

const fields: IField[] = [
  {
    fieldName: "user_name",
    type: FIELD_TYPE.text,
    placeholder: "Nhập tên khách hàng",
    label: "Tên khách hàng",
  },
  {
    fieldName: "user_email",
    type: FIELD_TYPE.text,
    placeholder: "Nhập địa chỉ email",
    label: "Địa chỉ email",
  },
  {
    fieldName: "user_phone",
    type: FIELD_TYPE.text,
    placeholder: "Nhập số điện thoại",
    label: "Số điện thoại",
  },
  {
    fieldName: "staff_in_charge_note",
    type: FIELD_TYPE.text,
    placeholder: "",
    label: "Mô tả",
  },
];

interface FormCreateMainCustomerDTO
  extends Omit<CreateCustomerDTO, "address_list" | "tags" | "staff_id"> {}

interface FormCreateAdditionCustomerDTO {
  tag_id: string;
  user_province: string;
  user_district: string;
  user_specific_address: string;
  staff_id: string;
}

const CreateCustomerScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [createMainCustomerData, setCreateMainCustomerData] =
    React.useState<FormCreateMainCustomerDTO | null>(null);

  const [createAdditionCustomerData, setCreateAdditionCustomerData] =
    React.useState<FormCreateAdditionCustomerDTO | null>(null);
  const { handleSubmit, register } = useForm<FormCreateMainCustomerDTO>();

  const handleCreateCustomer = React.useCallback(async () => {
    setIsLoading(true);
    try {
      if (createMainCustomerData && createMainCustomerData) {
        const data = handleValidateCustomerDTO({
          ...createMainCustomerData,
          staff_id: createAdditionCustomerData?.staff_id as string,
          tags: [createAdditionCustomerData?.tag_id as string],
          address_list: [
            {
              user_province:
                createAdditionCustomerData?.user_province as string,
              user_district:
                createAdditionCustomerData?.user_district as string,
              user_specific_address:
                createAdditionCustomerData?.user_specific_address as string,
            },
          ],
        });
        const { status } = await createCustomerApi(data as CreateCustomerDTO);

        if (status === 200) {
          toast.success({
            title: "Tạo khách hàng thành công",
            action: {
              text: "Quay lại danh sách khách hàng",
              onClick: () => navigate("/app/dashboard/customers"),
            },
          });
          setIsLoading(false);
        }
      } else {
        // ? Handle case warning field is required
        toast.warning({
          title: "Opps!! Bạn phải nhập đầy đủ thông tin",
          action: {
            text: "Thử lại",
          },
        });
        setIsLoading(false);
      }
    } catch (err) {
      handleToastOnServerError(err as ZodError | AxiosError);
      setIsLoading(false);
    }
  }, [createAdditionCustomerData, createMainCustomerData, navigate]);

  const handleOnSubmit = React.useCallback(
    async (data: FormCreateMainCustomerDTO) => {
      setCreateMainCustomerData((prev) => ({ ...prev, ...data }));
      await handleCreateCustomer();
    },
    [handleCreateCustomer]
  );

  return (
    <>
      <ToastContainer />
      <AdminLayout>
        <div className="md:px-10 px-4">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            {fields.map((field, i) => {
              switch (field.type) {
                case FIELD_TYPE.text:
                case FIELD_TYPE.password: {
                  return (
                    <TextField field={field} register={register} key={i} />
                  );
                }
                case FIELD_TYPE.select: {
                  return (
                    <SelectField field={field} register={register} key={i} />
                  );
                }
                default: {
                  return (
                    <TextField field={field} register={register} key={i} />
                  );
                }
              }
            })}
            <ProvinceSelect dataGetter={setCreateAdditionCustomerData} />
            <StaffSelect dataGetter={setCreateAdditionCustomerData} />
            <TagSelect dataGetter={setCreateAdditionCustomerData} />
            <MyButton isLoading={isLoading}>Submit</MyButton>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};
export default CreateCustomerScreen;
