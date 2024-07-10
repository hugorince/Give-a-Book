"use server";

import type { Message as MessageType } from "@prisma/client";
import { Message } from "../message";
import { Link } from "@/ui-kit";
import { WriteMessage } from "../write-message";
import classes from "./chat.module.css";
import { capitalize } from "@/utils";

interface ChatProps {
  messages: MessageType[];
  title: string;
  userChat: {
    username: string | null | undefined;
    id: number | undefined;
  };
}

export const Chat = ({ messages, title, userChat }: ChatProps) => {
  const chatId = messages[0].chatId;
  const reverseMessages = messages.reverse();

  return (
    <div className={classes.chatContainer}>
      <div className={classes.contactContainer}>
        {userChat.username && (
          <Link variant="unstyled" href={`/user/${userChat.id}`}>
            {capitalize(userChat.username)}
          </Link>
        )}
        <p className={classes.bookTitle}>{title}</p>
      </div>
      <div className={classes.messagesContainer}>
        {reverseMessages.map((message, key) => (
          <Message key={key} message={message} />
        ))}
      </div>
      <WriteMessage chatId={chatId} />
    </div>
  );
};
