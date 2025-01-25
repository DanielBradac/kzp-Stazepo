import { KZPCategory, KZPSection, KZPData } from '../utils/KZPEntities'
import configJson from '$lib/config.json'
import { error as svelteError } from '@sveltejs/kit';


export const load = async () => {
    try {
        const categories: KZPCategory[] = []
        for (const category of configJson) {
            const sections: KZPSection[] = []
            for (const section of category.sections) {
                sections.push(new KZPSection(section.id, section.inspectionName, section.regulation, section.frequency, section.performer, section.record))
            }

            categories.push(new KZPCategory(category.id, category.name, sections))
        }

        return { kzpData: new KZPData(categories) }
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Neznámá chyba'

        console.log(errorMessage)
        return svelteError(500, {
            message: errorMessage
        })
    }
}