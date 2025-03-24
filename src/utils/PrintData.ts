import type { KZPCategory } from "./KZPEntities"

export class PrintData {
    header: string
    categories: KZPCategory[]

    public constructor(header: string, categories: KZPCategory[]) {
        this.header = header.trim()
        this.categories = categories
    }
}