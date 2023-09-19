import { z } from "zod";
import { BulkCreateAddressSchema, CreateAddressSchema } from "./address.schema";

export type CreateAddressDTO = z.infer<typeof CreateAddressSchema>;
export type BulkCreateAddressDTO = z.infer<typeof BulkCreateAddressSchema>;
