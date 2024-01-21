"use client";

import React, { useState } from "react";

interface Book {
  title: string;
  image: string;
}

export const PostBook: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  // const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const apiKey = process.env.GOOGLE_API_KEY;

  const handleSearch = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${apiKey}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const firstThreeBooks: Book[] = (data.items || [])
          .slice(0, 3)
          .map((item: any) => ({
            title: item.volumeInfo.title,
          }));
        setSuggestions(firstThreeBooks);
        console.log(firstThreeBooks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setSearchInput(newQuery);

    if (newQuery.length >= 3) {
      handleSearch();
    } else {
      setSuggestions([]);
    }
  };

  // const handleSuggestionClick = (suggestion: Book) => {
  //   setSelectedBook(suggestion);
  // };

  return (
    <div>
      <h1>Search Books</h1>
      <input
        type="text"
        placeholder="Enter book title"
        value={searchInput}
        onChange={handleInputChange}
      />
      {suggestions && (
        <div>
          {suggestions.map((suggestion, index) => (
            <div key={index}>{suggestion.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostBook;
