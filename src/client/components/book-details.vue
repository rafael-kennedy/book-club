<template>
  <UiModal
    ref="details-modal"
    :title="book.title"
    style="max-height: 60vh;"
    @close="$emit('close');"
  >
    <div class="flex-column">
      <img :src="book.coverURL" />
      <div v-html="book.description" />
      <slot name="actions" />
    </div>
  </UiModal>
</template>

<script>
export default {
  name: "BookDetails",
  props: {
    book: { type: Object, required: true }
  },
  mounted() {
    this.$refs["details-modal"].open();
  }
};
</script>

<style scoped></style>
