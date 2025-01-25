<script lang="ts">
    import { page } from "$app/state";
    const error = page.error;
</script>

<h1>Error: {error?.message || "Neznámá chyba"}</h1>
