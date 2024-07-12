import type { PageProps } from "@/types";
import { getBookingInfos } from "@/actions";
import { MainLayout } from "@/layout";
import { Chat } from "@/components";
import classes from "./page.module.css";

const ChatPage = async ({ params }: PageProps) => {
  const booking = await getBookingInfos(parseInt(params.id));

  if (!booking?.book) return null;

  const book = booking.book;

  if (!book) return null;

  const messages = booking.messages;

  return (
    <MainLayout>
      <div className={classes.pageContainer}>
        {messages && (
          <Chat
            messages={messages}
            title={book.title}
            userChat={booking.userChat}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default ChatPage;
