import { BooksCardWrapper } from "@/libs/components";
import { MainLayout } from "@/libs/layout";

interface ParamsProps {
  [key: string]: string;
}

export const Books = async ({ searchParams }: ParamsProps) => {
  return (
    <MainLayout>
      <BooksCardWrapper searchParams={searchParams} />
    </MainLayout>
  );
};

export default Books;
