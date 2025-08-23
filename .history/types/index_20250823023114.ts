import { ProductInputSchema } from "@/lib/validator";
in

export type IProductInput = z.infer<typeof ProductInputSchema>
