import { z } from "zod";
import { CreateCustomerSchema, UpdateCustomerSchema } from "./customer.schema";

export type CreateCustomerDTO = z.infer<typeof CreateCustomerSchema>;
export type UpdateCustomerDTO = z.infer<typeof UpdateCustomerSchema>;
