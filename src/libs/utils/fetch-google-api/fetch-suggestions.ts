type fetchSuggestionsProps = {
  title: string;
  author: string;
  newQuery: string;
  type: "author" | "title";
};

const constructQueryUrl = ({
  title,
  author,
  newQuery,
  type,
}: fetchSuggestionsProps) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  let constructedUrl = "https://www.googleapis.com/books/v1/volumes?q=";

  if (author) {
    constructedUrl += `inauthor:${author}+intitle:${newQuery}`;
  } else if (title) {
    constructedUrl += `inauthor:${newQuery}+intitle:${title}`;
  } else {
    constructedUrl += `in${type}:${newQuery}`;
  }
  return constructedUrl + "&printType=books&key=" + apiKey;
};

export const fetchSuggestions = async ({
  title,
  author,
  newQuery,
  type,
}: fetchSuggestionsProps) => {
  const queryUrl = constructQueryUrl({
    title,
    author,
    newQuery,
    type,
  });

  const response = await fetch(queryUrl);
  const books = await response.json();

  if (response.ok) {
    const firstThreeBooks = books.items.slice(0, 3).map((book: any) => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail,
    }));
    return firstThreeBooks;
  } else {
    return [];
  }
};
