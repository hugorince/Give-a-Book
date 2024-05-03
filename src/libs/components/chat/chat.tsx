"use server";

import { Message as MessageType } from "@prisma/client";
import { Message } from "./message";
import classes from "./chat.module.css";
import { WriteMessage } from "./write-message";

interface ChatProps {
  messages: MessageType[];
}

export const Chat = ({ messages }: ChatProps) => {
  const chatId = messages[0].chatId;

  return (
    <div className={classes.chatContainer}>
      <div className={classes.messageContainer}>
        {messages.map((message, key) => (
          <Message key={key} message={message} />
        ))}
      </div>
      <WriteMessage chatId={chatId} />
    </div>
  );
};
