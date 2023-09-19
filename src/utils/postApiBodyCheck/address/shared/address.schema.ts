import { z } from "zod";
import { StringType } from "../../common/common.schema";

export const CreateAddressSchema = z.object({
  user_province: StringType,
  user_district: StringType,
  user_specific_address: StringType,
});

export const BulkCreateAddressSchema = CreateAddressSchema.array();
