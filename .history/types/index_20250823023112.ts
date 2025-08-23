import { ProductInputSchema } from "@/lib/validator";
i

export type IProductInput = z.infer<typeof ProductInputSchema>
