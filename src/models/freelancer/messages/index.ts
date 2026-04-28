import { useState } from 'react';
import moment from 'moment';
import { rawMessages, rawConversations } from '@/services/freelancer/messages';
import type { Message, Conversation, ChatMessage } from '@/services/freelancer/messages/typing';
import { MessageSender } from '@/services/freelancer/messages/typing';

export default function useFreelancerMessagesModel() {
  const [messages, setMessages] = useState<Message[]>(rawMessages);
  const [conversations, setConversations] = useState<Conversation[]>(rawConversations);
  const [selectedId, setSelectedId] = useState<number>(rawConversations[0]?.id || 1);
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const activeConvo = conversations.find(c => c.id === selectedId);

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUnreadCount = (): number => {
    return messages.filter((m) => m.time.includes('PM') || m.time.includes('AM')).length;
  };

  const getOnlineStatus = (convo: Conversation) => {
    if (convo.online) return 'Active now';
    if (!convo.lastActive) return 'Offline';

    const lastActive = moment(convo.lastActive);
    const now = moment();
    const diffMinutes = now.diff(lastActive, 'minutes');
    const diffHours = now.diff(lastActive, 'hours');

    if (diffMinutes < 60) {
      return `Active ${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `Active ${diffHours}h ago`;
    } else {
      return `Last active on ${lastActive.format('MMM D, YYYY')}`;
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !activeConvo) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      text: inputText,
      sender: MessageSender.Me,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedConvos = conversations.map(c => {
      if (c.id === selectedId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMsg: inputText,
          time: 'Just now'
        };
      }
      return c;
    });

    setConversations(updatedConvos);
    setInputText('');
  };

  const handleImageUpload = (base64Image: string) => {
    if (!activeConvo) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      image: base64Image,
      sender: MessageSender.Me,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedConvos = conversations.map(c => {
      if (c.id === selectedId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMsg: 'Sent an image',
          time: 'Just now'
        };
      }
      return c;
    });

    setConversations(updatedConvos);
  };

  return {
    messages,
    setMessages,
    conversations,
    setConversations,
    getUnreadCount,
    selectedId,
    setSelectedId,
    inputText,
    setInputText,
    searchTerm,
    setSearchTerm,
    activeConvo,
    filteredConversations,
    getOnlineStatus,
    handleSendMessage,
    handleImageUpload
  };
}
