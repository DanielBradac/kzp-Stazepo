
export class KPZCategory {
    id: number
    name: string
    sections: KPZSection[]

    public constructor(id: number, name: string, sections: KPZSection[]) {
        this.id = id
        this.name = name
        this.sections = sections
    }

}

export class KPZSection {
    id: number
    inspectionName: string
    regulation: string
    frequency: string
    performer: string
    record: string

    public constructor(id: number, inspectionName: string, regulation: string, frequency: string, performer: string, record: string) {
        this.id = id
        this.inspectionName = inspectionName
        this.regulation = regulation
        this.frequency = frequency
        this.performer = performer
        this.record = record
    }
}