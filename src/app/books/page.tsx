import type { PageProps } from "@/types";
import { BooksCardContainer, FilterBooks } from "@/components";
import { MainLayout } from "@/layout";
import classes from "./books.module.css";

const Books = async ({ searchParams }: PageProps) => {
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
