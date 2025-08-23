import { ProductInputSchema } from "@/lib/validator";
import z from "zod";
import { IProduct } from "@/lib/db/models/product.model";

export type IProductInput = z.infer<typeof ProductInputSchema>
export type Data = {
  products: IProductInput[]
  headerMenus: {
    name: string
    href: string
  }[]
  carousels: {
    image: string
    url: string
    title: string
    buttonCaption: string
    isPublished: boolean
  }[]
}

export type IProduct = IProduct