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
  extends Omit<CreateCustomerDTO, "address_list" | "tags" | "staff_id"> {
  tag_id: string;
  user_province: string;
  user_district: string;
  user_specific_address: string;
  staff_id: string;
}

const CreateCustomerScreen = () => {
  const navigate = useNavigate();
  const [createCustomerData, setCreateCustomerData] =
    React.useState<FormCreateMainCustomerDTO | null>(null);
  const { handleSubmit, register } = useForm<FormCreateMainCustomerDTO>();

  const handleOnSubmit = async (data: FormCreateMainCustomerDTO) => {
    setCreateCustomerData((prev) => ({ ...prev, ...data }));

    if (createCustomerData) {
      const {
        tag_id,
        user_province,
        user_district,
        user_specific_address,
        ...rest
      } = createCustomerData as FormCreateMainCustomerDTO;
      const createCustomerDto: CreateCustomerDTO = {
        ...rest,
        tags: [tag_id],
        address_list: [{ user_province, user_district, user_specific_address }],
      };
      try {
        const data = handleValidateCustomerDTO(
          createCustomerDto
        ) as CreateCustomerDTO;

        const { status } = await createCustomerApi(data);

        if (status === 200) {
          toast.success({
            title: "Tạo mói khách hàng thành công!",
            action: {
              text: "Quay lại danh sách khách hàng!",
              onClick: () => {
                navigate("/app/dashboard/customers");
              },
            },
          });
        }
        if (status === 409) {
          toast.warning({
            title: "Dữ liệu bị trùng!",
            action: {
              text: "Thử lại!",
              onClick: () => {
                window.location.reload();
              },
            },
          });
        }
      } catch (err) {
        toast.error({
          title: "Tạo mới khách hàng thất bại!",
          action: {
            text: "Thử lại!",
            onClick: () => {
              window.location.reload();
            },
          },
        });
      }
    }
  };

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
            <ProvinceSelect dataGetter={setCreateCustomerData} />
            <StaffSelect dataGetter={setCreateCustomerData} />
            <TagSelect dataGetter={setCreateCustomerData} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </AdminLayout>
    </>
  );
};
export default CreateCustomerScreen;
