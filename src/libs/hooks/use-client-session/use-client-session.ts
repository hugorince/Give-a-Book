import { useSession } from "next-auth/react";

export const useClientSession = () => {
  const { data: session } = useSession();

  const connectedUserId = session && parseInt(session.user.id);

  return { connectedUserId };
};
