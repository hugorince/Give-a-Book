import { PostBookForm } from "@/libs/components";
import { MainLayout } from "@/libs/layout";

export const PostBook = () => {
  return (
    <MainLayout>
      <h1>Propose a book</h1>
      <PostBookForm />
    </MainLayout>
  );
};

export default PostBook;
