
export interface Message {
  name: string;
  time: string;
  snippet: string;
  avatar: string;
}

export enum MessageSender {
  Me = 'me',
  Them = 'them',
}

export interface ChatMessage {
  id: number;
  text?: string;
  image?: string;
  sender: MessageSender;
  time: string;
}

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
  online: boolean;
  lastActive?: string;
  messages: ChatMessage[];
}
