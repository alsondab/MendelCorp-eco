import { ProductInputSchema } from "@/lib/validator";

export type IProductInput = z.infer<typeof ProductInputSchema>
