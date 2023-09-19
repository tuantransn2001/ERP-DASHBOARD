import { convertZodValidateErrorToString } from "src/services/httpService/helpers";
import { ZodError } from "zod";

import { CreateCustomerDTO } from "./shared/customer.interface";
import { CreateCustomerSchema } from "./shared/customer.schema";

export const handleValidateCustomerDTO = (dto: CreateCustomerDTO) => {
  try {
    const parse = CreateCustomerSchema.parse(dto);
    return parse;
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(convertZodValidateErrorToString(err));
    }
  }
};
