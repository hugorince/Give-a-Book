"use client";

import React, { useState, useEffect } from "react";

interface Book {
  title: string;
  image: string;
}

export const PostBook: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const apiKey = process.env.GOOGLE_API_KEY;

  const handleSearch = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const firstThreeBooks: Book[] = (data.items || [])
          .slice(0, 3)
          .map((item: any) => ({
            title: item.volumeInfo.title,
            image: item.volumeInfo.imageLinks.thumbnail,
          }));
        setSuggestions(firstThreeBooks);
        console.log(firstThreeBooks);
        setShowDropdown(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowDropdown(false);
  };

  const handleSuggestionClick = (suggestion: Book) => {
    setQuery(suggestion.title);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (query.length >= 3 && suggestions.length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, suggestions]);

  return (
    <div>
      <h1>Search Books</h1>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Enter book title"
        value={query}
        onChange={handleInputChange}
      />
      {/* Search button */}
      <button onClick={handleSearch}>Search</button>

      {/* Dropdown */}
      {showDropdown && (
        <div>
          {suggestions.map((suggestion, index) => (
            <div key={index}>
              <div onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.title}
              </div>
              <img src={suggestion.image} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostBook;
