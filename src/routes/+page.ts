import { KPZCategory, KPZSection } from '../utils/KPZEntities';
import configJson from '$lib/config.json';


export const load = async () => {
    try {
        let categories: KPZCategory[] = []
        for (let category of configJson) {
            let sections: KPZSection[] = []
            for (let section of category.sections) {
                sections.push(new KPZSection(section.id, section.inspectionName, section.regulation, section.frequency, section.performer, section.record))
            }

            categories.push(new KPZCategory(category.id, category.name, sections))
        }

        return { categories: categories }
    } catch (error) {
        console.error('Error reading config data:', error)
        return { categories: [] }
    }
}