<script lang="ts">
    import type { KZPCategory } from "../utils/KZPEntities";
    import { PrintData } from "../utils/PrintData";
    import Form from "./Form.svelte";
    import Table from "./Table.svelte";
    export let data;

    const categories: KZPCategory[] = data.kzpData.categories;
    let selectedCategories: KZPCategory[] = [];
    let header: string = "";

    function routeToPrint() {
        sessionStorage.setItem(
            "printData",
            JSON.stringify(new PrintData(header, selectedCategories)),
        );
        window.open("/print", "_blank");
    }
</script>

<h1>KZP - Stazepo</h1>
<div class="mainPage">
    <div class="formSection">
        <div class="formContainer">
            <Form {categories} bind:selectedCategories bind:header />
        </div>
        <button class="printButton" onclick={routeToPrint}>Vytisknout</button>
    </div>
    <div class="tableContainer">
        <Table {selectedCategories} />
    </div>
</div>

<style>
    :root {
        --primary-color: #2e7d32;
        --secondary-color: #f1f8e9;
        --border-color: #c8e6c9;
        --text-color: #333;
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
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 1rem;
        font-family: "Courier New", Courier, monospace;
    }

    .mainPage {
        display: flex;
        gap: 1.5rem;
        height: 80vh;
    }

    .formSection {
        flex: 0 0 40%;
        display: flex;
        flex-direction: column;
    }

    .formContainer {
        flex: 1;
        overflow: auto;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        background: white;
        padding: 1rem;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }

    .printButton {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        transition: 0.3s;
    }

    .printButton:hover {
        background-color: #1b5e20;
    }

    .tableContainer {
        flex: 1;
        height: 100%;
        overflow: auto;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        background: white;
        padding: 1rem;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    }
</style>
