<template>
  <div class="suggestion-item" @click="$emit('click');">
    <img v-if="book.cover" :src="book.cover" height="60px" />
    <div class="suggestion-title">{{ book.title }}</div>
    <div class="suggestion-author">{{ book.author }}</div>
  </div>
</template>
<script>
export default {
  name: "BookDetailLineItem",
  props: { book: { type: Object, required: true } }
};
</script>
<style scoped>
.suggestion-item {
  display: grid;
  grid-template-columns: 60px 1fr 1fr;
  column-gap: 10px;
  margin-top: 1em;
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: aliceblue;
}

.suggestion-title {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.suggestion-author {
  grid-column: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
