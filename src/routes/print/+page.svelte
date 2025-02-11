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
        setTimeout("printTimeout", 1000);
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
    :root {
        --primary-color: #000000; /* Black text */
        --secondary-color: #ffffff; /* White background */
        --border-color: #000000; /* Black borders */
        --text-color: #000000;
        --font-family: "Poppins", sans-serif;
    }

    :global(body) {
        font-family: var(--font-family);
        background-color: var(--secondary-color);
        color: var(--text-color);
        margin: 0;
        padding: 2rem;
    }

    h1 {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        color: var(--primary-color);
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 1.5em;
        text-align: center;
        color: var(--primary-color);
    }

    h3 {
        font-size: 1.2em;
        color: var(--primary-color);
    }

    .printPage {
        margin-bottom: 2em;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    .categoryTable {
        width: 100%;
        border-collapse: collapse;
        font-family: var(--font-family);
    }

    .categoryTH,
    .categoryTD {
        text-align: left;
        padding: 4px;
        border: 1px solid var(--border-color);
    }

    button {
        margin-bottom: 2em;
        padding: 0.75rem 1.5rem;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        border: 1px solid var(--border-color);
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
    }

    button:hover {
        background-color: #333;
    }

    @media print {
        .printPage {
            page-break-after: always;
        }

        .printPage:last-child {
            page-break-after: avoid; /* Prevents an extra blank page */
        }

        button {
            display: none;
        }

        @page {
            size: landscape;
        }
    }
</style>
