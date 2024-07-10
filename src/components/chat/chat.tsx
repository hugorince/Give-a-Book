"use server";

import type { Message as MessageType } from "@prisma/client";
import { Message } from "../message";
import { WriteMessage } from "../write-message";
import classes from "./chat.module.css";

interface ChatProps {
  messages: MessageType[];
  title: string;
  userName: string | null | undefined;
}

export const Chat = ({ messages, title, userName }: ChatProps) => {
  const chatId = messages[0].chatId;
  const reverseMessages = messages.reverse();

  return (
    <div className={classes.chatContainer}>
      <div className={classes.contactContainer}>
        <p className={classes.userName}>{userName}</p>
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
