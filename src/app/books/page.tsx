import { BooksCardContainer, FilterBooks } from "@/components";
import { MainLayout } from "@/layout";
import classes from "./books.module.css";

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
      <div className={classes.pageWrapper}>
        <FilterBooks />
        <BooksCardContainer searchParams={searchParams} />
      </div>
    </MainLayout>
  );
};

export default Books;
