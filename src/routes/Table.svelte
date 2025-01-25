<script lang="ts">
    import { KZPCategory } from "../utils/KZPEntities";
    import {
        emptyColsIndexes,
        getHeaderTitles,
        mainHeaderCount,
    } from "../utils/PDFExport/TableSettings";

    export let selectedCategories: KZPCategory[];
    const tableHeaders = getHeaderTitles();

    let tablesContainer: HTMLDivElement;

    function handlePrint() {
        // Hide everything except tablesContainer
        const bodyContent = document.body.innerHTML;
        const contentToPrint = tablesContainer.innerHTML;

        document.body.innerHTML = contentToPrint;

        // Trigger the print dialog
        window.print();

        // After printing, restore the original page content
        document.body.innerHTML = bodyContent;
    }
</script>

<button onclick={handlePrint}>Vytisknout</button>

<div bind:this={tablesContainer}>
    {#each selectedCategories as category}
        <table class="table-pagebreak" border="1">
            <thead>
                <tr>
                    <th colspan={tableHeaders.length}>
                        {category.id}. {category.name}
                    </th>
                </tr>
                <tr>
                    <th colspan={mainHeaderCount}>Název firmy: STAZEPO a.s.</th>
                    <th colspan={tableHeaders.length - mainHeaderCount}>
                        Technické podklady: platné ČSN normy
                    </th>
                </tr>
                <tr>
                    {#each tableHeaders as header}
                        <th>{header}</th>
                    {/each}
                </tr>
            </thead>

            <tbody>
                {#each category.sections as section}
                    <tr>
                        <td>{section.id}</td>
                        <td>{section.inspectionName}</td>
                        <td>{section.regulation}</td>
                        <td>{section.frequency}</td>
                        <td>{section.performer}</td>
                        <td>{section.record}</td>
                        {#each Array.from( { length: emptyColsIndexes.length }, ) as _}
                            <td></td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    {/each}
</div>

<style>
    table {
        width: 100%; /* Uniform table width */
        table-layout: fixed;
        border-collapse: collapse;
        font-family: "Times New Roman", Times, serif;
        text-wrap: auto;
    }

    th,
    td {
        text-align: left;
        padding: 8px;
        border: 1px solid #ddd;
    }

    th {
        background-color: #f4f4f4;
    }

    @media print {
        button {
            display: none;
        }

        table {
            page-break-inside: avoid;
            page-break-after: always;
        }

        @page {
            size: landscape;
        }
    }
</style>
