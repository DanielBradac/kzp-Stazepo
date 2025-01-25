import { findById, KZPCategory, type KZPSection } from "../utils/KZPEntities";

export function getSelectedCategoriesFromForm(allCaregories: KZPCategory[], selectedCategoriesIds: String[], selectedSectionsIds: String[]): KZPCategory[] {
    const categories: KZPCategory[] = []

    for (const categoryId of selectedCategoriesIds) {
        const targetCategory = findById(categoryId, allCaregories) as KZPCategory | null

        if (targetCategory === null) {
            throw Error(`id ${categoryId} not found.`)
        }

        const sections: KZPSection[] = []
        for (const section of targetCategory.sections) {
            if (selectedSectionsIds.includes(section.id)) {
                sections.push(section)
            }
        }

        categories.push(new KZPCategory(targetCategory.id, targetCategory.name, sections))
    }

    return categories
}