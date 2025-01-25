<script lang="ts">
    import type { KPZCategory } from "../utils/KPZEntities";
    import Form from "./Form.svelte";
    export let data;
    const categories: KPZCategory[] = data.categories;
</script>

<h1>KPZ - Stazepo</h1>
<Form {categories} />
