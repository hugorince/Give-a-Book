import { BookCard } from "@/libs/components";
import { MainLayout } from "@/libs/layout";
import { getBookById } from "@/libs/utils";

export const BookPage = async ({ params }: { params: { id: string } }) => {
  const book = await getBookById(params.id);

  return <MainLayout>{book && <BookCard data={book} />}</MainLayout>;
};

export default BookPage;
