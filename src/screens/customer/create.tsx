import { WrapperComponent } from "src/ts/type/common";
import FormControl from "src/components/helpers/form";
import { IField } from "src/components/helpers/form/shared/form.interface";
import AdminLayout from "src/layouts/admin";
interface Props extends WrapperComponent {}

const fields: IField[] = [
  {
    fieldName: "user_name",
    type: "text",
    placeholder: "Nhập tên khách hàng",
    label: "Tên khách hàng",
  },
  {
    fieldName: "user_email",
    type: "text",
    placeholder: "Nhập địa chỉ email",
    label: "Địa chỉ email",
  },
  {
    fieldName: "user_phone",
    type: "text",
    placeholder: "Nhập số điện thoại",
    label: "Số điện thoại",
  },
  {
    fieldName: "user_address",
    type: "text",
    placeholder: "Nhập địa chỉ cụ thể,quận,huyện...",
    label: "Địa chỉ",
  },
];

const CreateCustomerScreen = (props: Props) => {
  return (
    <AdminLayout>
      <FormControl
        fields={fields}
        submitAction="Lưu khách hàng mới"
        onSubmit={() => console.log("thêm khách hàng mới")}
      />
    </AdminLayout>
  );
};
export default CreateCustomerScreen;
