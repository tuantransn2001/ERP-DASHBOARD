import { z } from "zod";
import { CreateCustomerSchema } from "./customer.schema";

export type CreateCustomerDTO = z.infer<typeof CreateCustomerSchema>;
