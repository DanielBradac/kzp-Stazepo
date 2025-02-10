<script lang="ts">
    import { goto } from "$app/navigation";
    import type { KZPCategory } from "../utils/KZPEntities";
    import Form from "./Form.svelte";
    import Table from "./Table.svelte";
    export let data;

    const categories: KZPCategory[] = data.kzpData.categories;
    let selectedCategories: KZPCategory[] = [];

    function routeToPrint() {
        sessionStorage.setItem(
            "selectedCategories",
            JSON.stringify(selectedCategories),
        );
        window.open("/print", "_blank");
    }
</script>

<h1>KZP - Stazepo</h1>
<div class="mainPage">
    <div class="formSection">
        <div class="formContainer">
            <Form {categories} bind:selectedCategories />
        </div>
        <button class="printButton" onclick={routeToPrint}>Vytisknout</button>
    </div>
    <div class="tableContainer">
        <Table {selectedCategories} />
    </div>
</div>

<style>
    h1 {
        font-family: "Courier New", Courier, monospace;
        text-align: left;
        font-size: 2em;
    }

    .mainPage {
        display: flex;
        gap: 1rem; /* Adds spacing between form and table */
        height: 80vh; /* Set a fixed height for the scroll effect */
    }

    .formSection {
        flex: 0 0 40%; /* Takes 40% of the width */
        display: flex;
        flex-direction: column;
    }

    .formContainer {
        flex: 1; /* Allows it to grow while keeping the button at the bottom */
        overflow: auto; /* Enables scrolling */
        border: 1px solid #ccc; /* Optional: Adds a border for better visibility */
        padding: 1rem;
    }

    .printButton {
        margin-top: 0.5rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    .tableContainer {
        flex: 1; /* Takes the remaining 60% */
        height: 100%; /* Makes it full height */
        overflow: auto; /* Enables scrolling */
        border: 1px solid #ccc; /* Optional: Adds a border for better visibility */
        padding: 1rem;
    }
</style>
