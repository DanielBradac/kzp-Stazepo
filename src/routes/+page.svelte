<script lang="ts">
    import type { KZPCategory } from "../utils/KZPEntities";
    import Form from "./Form.svelte";
    export let data;
    const categories: KZPCategory[] = data.kzpData.categories;
</script>

<h1>KZP - Stazepo</h1>
<Form {categories} />
