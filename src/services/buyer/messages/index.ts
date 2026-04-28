
import type { Message, Conversation } from './typing';
import { MessageSender } from './typing';

export const rawMessages: Message[] = [
  { name: 'Sarah Jenkins', time: '12:45 PM',  snippet: "I've uploaded the latest wireframes...", avatar: 'SJ' },
  { name: 'Alex Thompson', time: 'Yesterday', snippet: 'The proposal looks good. Can we schedule a call?', avatar: 'AT' },
  { name: 'Michael Chen',  time: 'Oct 24',    snippet: 'Payment received. Thank you for the swift approval.', avatar: 'MC' },
];

export const rawConversations: Conversation[] = [
    {
        id: 1,
        name: 'Alex Rivera',
        avatar: 'AR',
        lastMsg: 'mình đã nhắn r bn nhé',
        time: '10:45 AM',
        online: true,
        lastActive: new Date().toISOString(),
        messages: [
            { id: 1, text: 'bạn tuyển đồng đội làm aff đúng không ạ', sender: MessageSender.Me, time: '10:00 AM' },
            { id: 2, text: 'mình cũng đang tìm hiểu bạn có thể cho mình tham gia cùng với ạ', sender: MessageSender.Me, time: '10:01 AM' },
            { id: 3, text: 'B nhắn zalo mình nha 0775.601.652', sender: MessageSender.Them, time: '10:05 AM' },
            { id: 4, text: 'mình đã nhắn r bn nhé', sender: MessageSender.Me, time: '10:45 AM' },
        ]
    },
    {
        id: 2,
        name: 'Taylor Chen',
        avatar: 'TC',
        lastMsg: 'The project roadmap looks great!',
        time: 'Yesterday',
        online: false,
        lastActive: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        messages: [
            { id: 1, text: 'Hey, have you seen the new technical requirements?', sender: MessageSender.Them, time: 'Yesterday' },
            { id: 2, text: 'Yes, looking at them now. The project roadmap looks great!', sender: MessageSender.Me, time: 'Yesterday' },
        ]
    },
    {
        id: 3,
        name: 'Jordan Smith',
        avatar: 'JS',
        lastMsg: 'Can we schedule a call for tomorrow?',
        time: '9:30 AM',
        online: false,
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        messages: [
            { id: 1, text: 'Can we schedule a call for tomorrow?', sender: MessageSender.Them, time: '9:30 AM' },
        ]
    }
];
