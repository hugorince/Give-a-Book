import { PostBookForm } from "@/libs/components";
import { MainLayout } from "@/libs/layout";
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
