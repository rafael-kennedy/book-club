<template>
  <div>
    <BookDetails
      v-if="selectedBook"
      :book="selectedBook"
      @close="selectedBook = null;"
    >
      <template v-if="!nominations.includes(selectedBook)" slot="actions">
        <UiButton @click="nominate"> Nominate this book </UiButton>
      </template>
    </BookDetails>
    <UiModal ref="suggestions-modal" title="Search Results">
      <UiMenu
        :options="suggestions"
        class="suggestion-menu"
        :keys="{ label: 'title' }"
        @select="triggerSuggestionDetail"
      >
        <template slot="option" slot-scope="{ option }">
          <BookDetailLineItem :book="option" />
        </template>
      </UiMenu>
    </UiModal>
    <div class="flex-row search-bar">
      <UiTextbox
        v-model="term"
        icon="search"
        data-test="nominations-search-box"
        @keydown.enter="searchForBooks"
      />
      <UiButton @click="searchForBooks"> search </UiButton>
    </div>
    <h2>Books you've nominated</h2>
    <div class="padded">
      <BookDetailLineItem
        v-for="book in nominations"
        :key="book._id"
        :book="book"
        @click="triggerDetail(book);"
      />
    </div>
  </div>
</template>

<script>
import api from "../api";
import BookDetails from "./book-details.vue";
import BookDetailLineItem from "./book-details-line-item.vue";

export default {
  name: "NominateBooks",
  components: { BookDetailLineItem, BookDetails },
  inject: ["alert"],
  data() {
    return {
      term: "",
      suggestions: [],
      nominations: [],
      selectedBook: null
    };
  },
  async mounted() {
    this.loadNominations();
  },
  methods: {
    async loadNominations() {
      this.nominations = await api.getMyNominations();
    },
    async searchForBooks() {
      this.suggestions = await api.searchBooks(this.term);
      if (this.suggestions.length) {
        this.$refs["suggestions-modal"].open();
      }
    },
    async triggerSuggestionDetail(bookSuggestion) {
      this.$refs["suggestions-modal"].close();
      this.selectedBook = await api.getBookDetails(bookSuggestion);
    },
    async nominate() {
      this.nominations = await api
        .createNomination(this.selectedBook)
        .catch(error => {
          this.alert(error.message);
        });
      this.loadNominations();
    },
    triggerDetail(book) {
      this.selectedBook = book;
    }
  }
};
</script>

<style scoped>
.search-bar {
  width: 90%;
  justify-content: space-evenly;
}
.suggestion-menu {
  min-width: 100%;
}
</style>
