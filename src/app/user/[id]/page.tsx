import { BooksCardWrapper } from "@/libs/components";
import { MainLayout } from "@/libs/layout";

export const UserPage = ({ params }: { params: { id: string } }) => {
  return (
    <MainLayout>
      <BooksCardWrapper userId={params.id} />
    </MainLayout>
  );
};

export default UserPage;
