import { PostBookForm } from "@/components";
import { MainLayout } from "@/layout";
import classes from "./post-book.module.css";

export const PostBook = () => {
  return (
    <MainLayout>
      <div className={classes.pageWrapper}>
        <h1>Propose a book</h1>
        <PostBookForm />
      </div>
    </MainLayout>
  );
};

export default PostBook;
