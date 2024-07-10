import type { PageProps } from "../../../../.next/types/app/page";
import { getBookingInfos } from "@/actions";
import { MainLayout } from "@/layout";
import { Chat } from "@/components";

const ChatPage = async ({ params }: PageProps) => {
  const booking = await getBookingInfos(parseInt(params.id));

  if (!booking) return null;

  const book = booking.book;

  if (!book) return null;

  const messages = booking.messages;

  return (
    <MainLayout>
      <h1>{book.title}</h1>
      <div>{messages && <Chat messages={messages} />}</div>
    </MainLayout>
  );
};

export default ChatPage;
