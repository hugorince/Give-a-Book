import { SearchTextInput } from "./search-text-input";

export const PostBook = () => {
  return (
    <div>
      <h1>Search Books</h1>
      <SearchTextInput type="title" />
      <SearchTextInput type="authors" />
    </div>
  );
};

export default PostBook;
