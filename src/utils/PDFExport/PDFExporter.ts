import jsPDF from "jspdf";
import type { KZPCategory } from "../KZPEntities";
import autoTable from "jspdf-autotable";
import { getHeaderTitles } from "./TableSettings";

export function exportPDF(categories: KZPCategory[]) {
    const doc = new jsPDF('landscape')

    for (const category of categories) {
        addSection(doc, category)
    }

    // Save the PDF
    doc.save("table.pdf");
}

function addSection(doc: jsPDF, category: KZPCategory) {
    doc.addPage()
    doc.text(category.name, 14, 10);

    const tableRows = category.sections.map((section) => {
        return [section.id, section.inspectionName, section.regulation, section.frequency, section.performer, section.record]
    })

    autoTable(doc, {
        head: [getHeaderTitles()],
        body: tableRows,
        startY: 20,
        theme: 'grid', // Table style (you can customize this)
        margin: { top: 20, left: 10, right: 10 }, // Margins for the table
        columnStyles: {
            0: { cellWidth: 'auto' },  // Adjust width of title column
            1: { cellWidth: 30 }  // Adjust width of page number column
        }
    });
}