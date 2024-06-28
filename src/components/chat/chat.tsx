"use server";

import type { Message as MessageType } from "@prisma/client";
import { Message } from "../message";
import { WriteMessage } from "../write-message";
import classes from "./chat.module.css";

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
