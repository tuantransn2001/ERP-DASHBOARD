import { z } from "zod";
import { BulkCreateAddressSchema } from "../../address/shared/address.schema";
import { StringArrayType, StringType } from "../../common/common.schema";

export const CreateCustomerSchema = z.object({
  user_name: StringType,
  user_email: StringType,
  user_phone: StringType,
  staff_id: StringType,
  staff_in_charge_note: StringType,
  tags: StringArrayType,
  address_list: BulkCreateAddressSchema,
});
