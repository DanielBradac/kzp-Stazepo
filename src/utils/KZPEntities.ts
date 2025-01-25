
export class KZPData {
    categories: KZPCategory[]

    public constructor(categories: KZPCategory[]) {
        this.categories = categories
        checkDuplcity(categories)
    }
}

export class KZPCategory {
    id: string
    name: string
    sections: KZPSection[]

    public constructor(id: string, name: string, sections: KZPSection[]) {
        this.id = id.trim()
        this.name = name.trim()
        this.sections = sections

        this.checkCategoryIdFormat(id)
        for (const section of sections) {
            this.checkSectionIdFormat(section.id, this.id)
        }

        checkDuplcity(sections)
    }

    private checkCategoryIdFormat(id: string) {
        if (id.length == 0) {
            throw Error(`id cannot be empty.`)
        }

        if (isNaN(Number(id))) {
            throw Error(`id ${id} is in invalid format.`)
        }
    }

    private checkSectionIdFormat(id: string, prefix: string) {
        if (id.length == 0) {
            throw Error(`id cannot be empty.`)
        }

        const regex = new RegExp(`^${prefix}\\.\\d+$`);
        if (!regex.test(id)) {
            throw Error(`id ${id} is in invalid format.`)
        }
    }
}

export class KZPSection {
    id: string
    inspectionName: string
    regulation: string
    frequency: string
    performer: string
    record: string


    public constructor(id: string, inspectionName: string, regulation: string, frequency: string, performer: string, record: string) {
        this.id = id.trim()
        this.inspectionName = inspectionName.trim()
        this.regulation = regulation.trim()
        this.frequency = frequency.trim()
        this.performer = performer.trim()
        this.record = record.trim()
    }
}

export function findById(id: String, data: KZPCategory[] | KZPSection[]): KZPCategory | KZPSection | null {
    for (const entry of data) {
        if (entry.id === id) {
            return entry
        }
    }
    return null
}

function checkDuplcity(data: KZPCategory[] | KZPSection[]) {
    const ids = new Map<string, boolean>();
    for (const entry of data) {
        if (ids.has(entry.id)) {
            throw Error(`id ${entry.id} is duplcite`)
        }
        ids.set(entry.id, true)
    }
}