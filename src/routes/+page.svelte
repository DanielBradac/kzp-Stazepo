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
<Form {categories} bind:selectedCategories />
<Table {selectedCategories} />
<button onclick={routeToPrint}>Vytisknout</button>
