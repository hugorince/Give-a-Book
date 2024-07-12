import { PostBookForm } from "@/components";
import { MainLayout } from "@/layout";
import classes from "./post-book.module.css";

const PostBook = () => {
  return (
    <MainLayout>
      <div className={classes.pageWrapper}>
        <h1>Propose a book</h1>
        <p>Please provide the author, a title and description</p>
        <PostBookForm />
      </div>
    </MainLayout>
  );
};

export default PostBook;
