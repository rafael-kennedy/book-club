<template>
  <div>
    <BookDetails
      v-if="selectedBook"
      :book="selectedBook"
      @close="selectedBook = null"
    >
      <template slot="actions">
        <UiButton @click="nominate">
          Nominate this book
        </UiButton>
      </template>
    </BookDetails>
    <UiModal
      ref="suggestions-modal"
      title="Search Results"
    >
      <UiMenu
        :options="suggestions"
        class="suggestion-menu"
        @select="triggerDetail"
      >
        <div
          slot="option"
          slot-scope="{option}"
          class="suggestion-item"
        >
          <img
            v-if="option.cover"
            :src="option.cover"
            height="60px"
          >
          <div class="suggestion-title">
            {{ option.title }}
          </div>
          <div class="suggestion-author">
            {{ option.author }}
          </div>
        </div>
      </UiMenu>
    </UiModal>
    <div class="flex-row">
      <UiTextbox
        v-model="term"
        icon="search"
        @keydown.enter="searchForBooks"
      />
      <UiButton @click="searchForBooks">
        search
      </UiButton>
    </div>
  </div>
</template>

<script>
  import api from '../api'
  import BookDetails from "./book-details.vue";
  export default {
    name: "NominateBooks",
    components: { BookDetails },
    data() {
      return {
        term: '',
        suggestions: [],
        nominations: [],
        selectedBook: null
      }
    },
    mounted() {

    },
    methods: {
      async searchForBooks() {
        this.suggestions = await api.searchBooks(this.term);
        if (this.suggestions.length) {
          this.$refs['suggestions-modal'].open();
        }
      },
      async triggerDetail(bookSuggestion) {
        this.$refs['suggestions-modal'].close();
        this.selectedBook = await api.getBookDetails(bookSuggestion);
      },
      async nominate() {
        const result = await api.createNomination(this.selectedBook);
        debugger;
      }
    }
  };
</script>

<style scoped>
 .suggestion-menu {
   min-width: 100%
 }
  .suggestion-item {
    display: grid;
    grid-template-columns: 60px 1fr 1fr;
    column-gap: 10px;
  }
  .suggestion-title {
    grid-column: 1;
  }
 .suggestion-title {
   grid-column: 2;
 }
</style>
