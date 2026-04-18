
import { useState } from 'react';
import { rawMessages, rawConversations } from '@/services/buyer/messages';
import type { Message, Conversation } from '@/services/buyer/messages/typing';

export default function useMessagesModel() {
  const [messages, setMessages] = useState<Message[]>(rawMessages);
  const [conversations, setConversations] = useState<Conversation[]>(rawConversations);

  const getUnreadCount = (): number => {
    return messages.filter((m) => m.time.includes('PM') || m.time.includes('AM')).length;
  };

  return {
    messages,
    setMessages,
    conversations,
    setConversations,
    getUnreadCount
  };
}
