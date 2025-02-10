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

<div class="printPage">
    <h1>Kontrolní a zkušební plán</h1>
    <h2>(DÍLČÍ ČÁST PLÁNU KVALITY STAVBY)</h2>
    <h3>OBSAH:</h3>

    <table>
        <tbody>
            {#each selectedCategories as category}
                <tr>
                    <td>{category.id}.</td>
                    <td>{category.name}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
<button onclick={onPrintButton}>Vytisknout</button>

<div bind:this={tablesContainer}>
    {#each selectedCategories as category}
        <div class="printPage">
            <table class="categoryTable" border="1">
                <thead>
                    <tr>
                        <th class="categoryTH" colspan={tableHeaders.length}>
                            {category.id}. {category.name}
                        </th>
                    </tr>
                    <tr>
                        <th class="categoryTH" colspan={mainHeaderCount}
                            >Název firmy: STAZEPO a.s.</th
                        >
                        <th
                            class="categoryTH"
                            colspan={tableHeaders.length - mainHeaderCount}
                        >
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
                            <td class="categoryTD">{section.id}</td>
                            <td class="categoryTD">{section.inspectionName}</td>
                            <td class="categoryTD">{section.regulation}</td>
                            <td class="categoryTD">{section.frequency}</td>
                            <td class="categoryTD">{section.performer}</td>
                            <td class="categoryTD">{section.record}</td>
                            {#each Array.from( { length: emptyColsIndexes.length }, ) as _}
                                <td class="categoryTD"></td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
            Zápis jen v případě zjištění neshody.
        </div>
    {/each}
</div>

<style>
    .categoryTable {
        width: 100%; /* Uniform table width */
        border-collapse: collapse;
        font-family: "Times New Roman", Times, serif;
        text-wrap: auto;
    }

    .categoryTH,
    .categoryTD {
        text-align: left;
        padding: 4px;
        border: 1px solid #000000;
    }

    h1 {
        text-align: center;
        font-size: 2em;
    }

    h2 {
        text-align: center;
        font-size: 1.5em;
    }

    h3 {
        font-size: 1.2em;
    }

    .printPage {
        margin-bottom: 2em;
    }

    button {
        margin-bottom: 2em;
    }

    @media print {
        .printPage {
            page-break-after: always;
        }

        button {
            display: none;
        }

        @page {
            size: landscape;
        }
    }
</style>
