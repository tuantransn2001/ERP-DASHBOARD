import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from "./shared/customer.interface";
import {
  CreateCustomerSchema,
  UpdateCustomerSchema,
} from "./shared/customer.schema";

export const handleValidateCustomerDTO = (dto: CreateCustomerDTO) => {
  try {
    const parse = CreateCustomerSchema.parse(dto);
    return parse;
  } catch (err) {
    return err;
  }
};
export const handleValidateUpdateCustomerDTO = (dto: UpdateCustomerDTO) => {
  try {
    const parse = UpdateCustomerSchema.parse(dto);
    return parse;
  } catch (err) {
    return err;
  }
};
