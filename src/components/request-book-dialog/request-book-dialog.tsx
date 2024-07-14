import { Button, Textarea, useDialog } from "@/ui-kit";
import classes from "./request-book-dialog.module.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface RequestBookDialogProps {
  proceed: (message: string) => Promise<void>;
  user?: string | null | undefined;
}

const messageSchema = z.object({
  message: z.string().optional(),
});

export const RequestBookDialog = ({
  proceed,
  user,
}: RequestBookDialogProps) => {
  const { closeDialog } = useDialog();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = (values: z.infer<typeof messageSchema>) => {
    if (values.message) proceed(values.message);
  };

  return (
    <form className={classes.dialogContainer} onSubmit={handleSubmit(onSubmit)}>
      <h2>Are you sure you want to request this book ?</h2>
      <Textarea
        placeholder={user ? `write a message to ${user}` : "write a message"}
        rows={4}
        label="request book message"
        {...register("message")}
      />
      <div className={classes.actionButtons}>
        <Button type="button" variant="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button type="submit">Proceed</Button>
      </div>
    </form>
  );
};
