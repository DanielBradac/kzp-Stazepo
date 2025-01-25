<script lang="ts">
  let { categories } = $props();
</script>

<form method="POST">
  {#each categories as category}
    <label>
      <input type="checkbox" name="name" value="4" />
      {category.name}
    </label><br />
    <ul>
      {#each category.sections as section}
        <label>
          <input type="checkbox" name="inspectionName" value="4" />
          {section.inspectionName}
        </label><br />
      {/each}
    </ul>
  {/each}
</form>
