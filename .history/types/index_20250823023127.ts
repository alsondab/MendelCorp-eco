import { ProductInputSchema } from "@/lib/validator";
import z

export type IProductInput = z.infer<typeof ProductInputSchema>
