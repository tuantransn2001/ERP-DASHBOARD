import { z } from "zod";

export const UUIDType = z.string().uuid();
export const StringType = z.string();
export const StringArrayType = z.string().array();
