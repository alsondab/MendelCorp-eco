import { ProductInputSchema } from "@/lib/validator";
import

export type IProductInput = z.infer<typeof ProductInputSchema>
