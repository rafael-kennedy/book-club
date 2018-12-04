function transformBookSearch(bookData) {
  const { title, key, author_name, first_publish_year, cover_i } = bookData;
  return {
    title,
    key,
    author: author_name && author_name[0],
    published: first_publish_year,
    cover: cover_i
      ? `https://covers.openlibrary.org/w/id/${cover_i}-S.jpg`
      : null
  };
}

export function transformBookDetail(bookData) {
  //TODO: Figure out why the OL API is flaky about including descriptions
  const description =
    bookData.description && bookData.description && bookData.description.value;
  const descriptionHTML = description
    ? description.replace(/\n/g, "<br/>")
    : "No description provided";
  const coverId = bookData.covers && bookData.covers[0];
  const coverURL = `https://covers.openlibrary.org/w/id/${coverId}-L.jpg`;
  return {
    description: descriptionHTML,
    coverURL
  };
}

export function transformOpenLibraryData(booksPayload) {
  // TODO: Need to deduplicate books somehow, perhaps concatted title + author?
  const booksArray = booksPayload.docs || [];
  return booksArray.map(transformBookSearch).slice(0, 8);
}
