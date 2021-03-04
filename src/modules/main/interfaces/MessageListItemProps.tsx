import { AuthStateUser } from "./AuthStateUser";
import { Message } from "./Message";

export interface MessageListItemProps {
  message: Message;
  user: AuthStateUser;
}
