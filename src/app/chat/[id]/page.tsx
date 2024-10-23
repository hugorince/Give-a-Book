import type { PageProps } from "@/types";
import { getBookingInfos } from "@/actions";
import { MainLayout } from "@/layout";
import { Chat } from "@/components";
import classes from "./page.module.css";

const ChatPage = async ({ params }: PageProps) => {
  const booking = await getBookingInfos(parseInt(params.id));

  if (!booking?.book || !booking?.chat?.id) return null;

  const book = booking?.book;
  const messages = booking?.messages;

  return (
    <MainLayout>
      <div className={classes.pageContainer}>
        <Chat
          messages={messages}
          title={book.title}
          userChat={booking.userChat}
          chatId={booking.chat.id}
        />
      </div>
    </MainLayout>
  );
};

export default ChatPage;
