import type { Message, Conversation } from './typing';
import { MessageSender } from './typing';

export const rawMessages: Message[] = [
  { name: 'Crypto Venture Capital', time: '12:45 PM', snippet: "The smart contract audit is complete...", avatar: 'CV' },
  { name: 'Sarah (Project Manager)', time: 'Yesterday', snippet: 'Can we move the deadline to next Monday?', avatar: 'SJ' },
  { name: 'Alex Rivera', time: 'Oct 24', snippet: 'I have attached the updated logo files.', avatar: 'AR' },
];

export const rawConversations: Conversation[] = [
  {
    id: 1,
    name: 'Alex Rivera',
    avatar: 'AR',
    lastMsg: 'I have attached the updated logo files.',
    time: '10:45 AM',
    online: true,
    lastActive: new Date().toISOString(),
    messages: [
      { id: 1, text: 'Hello, I saw your job posting for a UI/UX designer.', sender: MessageSender.Me, time: '10:00 AM' },
      { id: 2, text: 'Hi! Yes, we are looking for someone to redesign our landing page.', sender: MessageSender.Them, time: '10:05 AM' },
      { id: 3, text: 'I can definitely help with that. Here is my portfolio.', sender: MessageSender.Me, time: '10:10 AM' },
      { id: 4, text: 'I have attached the updated logo files.', sender: MessageSender.Them, time: '10:45 AM' },
    ]
  },
  {
    id: 2,
    name: 'Sarah (Project Manager)',
    avatar: 'SJ',
    lastMsg: 'Can we move the deadline to next Monday?',
    time: 'Yesterday',
    online: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    messages: [
      { id: 1, text: 'How is the progress on the dashboard?', sender: MessageSender.Them, time: 'Yesterday' },
      { id: 2, text: 'It is going well. I am finishing the widgets now.', sender: MessageSender.Me, time: 'Yesterday' },
      { id: 3, text: 'Can we move the deadline to next Monday?', sender: MessageSender.Them, time: 'Yesterday' },
    ]
  },
  {
    id: 3,
    name: 'Crypto Venture Capital',
    avatar: 'CV',
    lastMsg: 'The smart contract audit is complete...',
    time: 'Monday',
    online: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    messages: [
      { id: 1, text: 'The smart contract audit is complete...', sender: MessageSender.Them, time: 'Monday' },
    ]
  }
];
