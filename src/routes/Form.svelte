<script lang="ts">
  import { findById, type KZPCategory } from "../utils/KZPEntities";
  import { getSelectedCategoriesFromForm } from "./Form";

  export let categories: KZPCategory[];
  export let selectedCategories: KZPCategory[];

  let form: HTMLFormElement;

  $: if (form) {
    updateSelectedCategories();
  }

  function updateSelectedCategories() {
    const formData = new FormData(form);
    selectedCategories = getSelectedCategoriesFromForm(
      categories,
      formData.getAll("name") as string[],
      formData.getAll("inspectionName") as string[],
    );
  }
</script>

<form method="POST" bind:this={form} onchange={updateSelectedCategories}>
  {#each categories as category}
    <label>
      <input type="checkbox" name="name" value={category.id} />
      {category.id}. {category.name}
    </label><br />

    {#if findById(category.id, selectedCategories) !== null}
      <ul>
        {#each category.sections as section}
          <label>
            <input type="checkbox" name="inspectionName" value={section.id} />
            {section.id}. {section.inspectionName}
          </label><br />
        {/each}
      </ul>
    {/if}
  {/each}
</form>

<style>
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 100%;
    white-space: normal;
    word-break: break-word;
  }
</style>
