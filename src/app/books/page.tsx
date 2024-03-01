import { BooksCardWrapper, FilterBooks } from "@/libs/components";
import { MainLayout } from "@/libs/layout";

interface ParamsProps {
  [key: string]: string;
}

export const Books = async ({
  searchParams,
}: {
  searchParams: ParamsProps;
}) => {
  return (
    <MainLayout>
      <FilterBooks />
      <BooksCardWrapper searchParams={searchParams} />
    </MainLayout>
  );
};

export default Books;
