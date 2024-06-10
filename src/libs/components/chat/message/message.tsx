"use server";

import type { Message as MessageType } from "@prisma/client";
import clsx from "clsx";
import classes from "./message.module.css";
import { getConnectedUserId } from "@/libs/server-actions";

interface MessageProps {
  message: MessageType;
}

export const Message = async ({ message }: MessageProps) => {
  const connectedUserId = await getConnectedUserId();
  const isConnectedUserMessage = connectedUserId === message.senderId;

  return (
    <p
      className={clsx(
        isConnectedUserMessage
          ? classes.connectedUserMessage
          : classes.requesterMessage,
      )}
    >
      {message.text}
    </p>
  );
};
