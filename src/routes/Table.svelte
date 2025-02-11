<script lang="ts">
    import { KZPCategory } from "../utils/KZPEntities";
    import {
        emptyColsIndexes,
        getHeaderTitles,
        mainHeaderCount,
    } from "../utils/PDFExport/TableSettings";

    export let selectedCategories: KZPCategory[];
    const tableHeaders = getHeaderTitles();
</script>

<div>
    {#each selectedCategories as category}
        <table border="1">
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
        width: 100%;
        border-collapse: collapse;
        font-family: "Poppins", sans-serif;
        margin-bottom: 2em;
    }

    th,
    td {
        text-align: left;
        padding: 8px;
        border: 1px solid #2e7d32;
    }

    th {
        background-color: #e8f5e9;
        font-weight: bold;
    }
</style>
