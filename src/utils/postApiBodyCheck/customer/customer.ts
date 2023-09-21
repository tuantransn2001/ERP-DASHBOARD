import { CreateCustomerDTO } from "./shared/customer.interface";
import { CreateCustomerSchema } from "./shared/customer.schema";

export const handleValidateCustomerDTO = (dto: CreateCustomerDTO) => {
  try {
    const parse = CreateCustomerSchema.parse(dto);
    return parse;
  } catch (err) {
    return err;
  }
};
