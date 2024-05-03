"use server";

import { authOptions } from "@/libs/auth/auth";
import type { Message as MessageType } from "@prisma/client";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import classes from "./message.module.css";

interface MessageProps {
  message: MessageType;
}

export const Message = async ({ message }: MessageProps) => {
  const user = await getServerSession(authOptions);

  if (!user) return null;

  const connectedUserId = parseInt(user?.user.id);
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
