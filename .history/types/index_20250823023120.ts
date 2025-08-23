import { ProductInputSchema } from "@/lib/validator";
im

export type IProductInput = z.infer<typeof ProductInputSchema>
