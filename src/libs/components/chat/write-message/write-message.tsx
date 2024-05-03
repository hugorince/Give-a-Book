"use client";

import { Button, Textarea } from "@/libs/ui-components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendMessage } from "@/libs/database";
import { useRouter } from "next/navigation";

const messageSchema = z.object({
  message: z.string(),
});

interface WriteMessageProps {
  chatId: number;
}

export const WriteMessage = ({ chatId }: WriteMessageProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof messageSchema>) => {
    const message = values.message;
    sendMessage(message, chatId);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea label="write message" {...register("message")} />
      <Button type="submit" fullWidth>
        Send message
      </Button>
    </form>
  );
};
