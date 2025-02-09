<script lang="ts">
    import { onMount } from "svelte";
    import type { KZPCategory } from "../../utils/KZPEntities";
    import {
        emptyColsIndexes,
        getHeaderTitles,
        mainHeaderCount,
    } from "../../utils/PDFExport/TableSettings";

    let selectedCategories: KZPCategory[];
    let tablesContainer: HTMLDivElement;
    const tableHeaders = getHeaderTitles();

    onMount(() => {
        const data = sessionStorage.getItem("selectedCategories");
        if (data) {
            selectedCategories = JSON.parse(data);
        } else {
            throw Error("Couldn't read selected catgegories.");
        }
        window.print();
    });

    function onPrintButton() {
        window.print();
    }
</script>

<button onclick={onPrintButton}>Vytisknout</button>

<p>Table of contents TODO</p>

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

    @media print {
        button {
            display: none;
        }

        table {
            page-break-after: always;
        }

        p {
            page-break-after: always;
        }

        @page {
            size: landscape;
        }
    }
</style>
