import { useState, useRef, useEffect } from 'react';
import {
    SearchOutlined,
    SendOutlined,
    PlusOutlined,
    MoreOutlined,
    PhoneOutlined,
    VideoCameraOutlined,
    MessageOutlined,
    SmileOutlined
} from '@ant-design/icons';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../components/topbar';

interface Message {
    id: number;
    text: string;
    sender: 'me' | 'them';
    time: string;
}

interface Conversation {
    id: number;
    name: string;
    avatar: string;
    lastMsg: string;
    time: string;
    online: boolean;
    messages: Message[];
}

const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 1,
        name: 'Alex Rivera',
        avatar: 'AR',
        lastMsg: 'mình đã nhắn r bn nhé',
        time: '10:45 AM',
        online: true,
        messages: [
            { id: 1, text: 'bạn tuyển đồng đội làm aff đúng không ạ', sender: 'me', time: '10:00 AM' },
            { id: 2, text: 'mình cũng đang tìm hiểu bạn có thể cho mình tham gia cùng với ạ', sender: 'me', time: '10:01 AM' },
            { id: 3, text: 'B nhắn zalo mình nha 0775.601.652', sender: 'them', time: '10:05 AM' },
            { id: 4, text: 'mình đã nhắn r bn nhé', sender: 'me', time: '10:45 AM' },
        ]
    },
    {
        id: 2,
        name: 'Taylor Chen',
        avatar: 'TC',
        lastMsg: 'The project roadmap looks great!',
        time: 'Yesterday',
        online: false,
        messages: [
            { id: 1, text: 'Hey, have you seen the new technical requirements?', sender: 'them', time: 'Yesterday' },
            { id: 2, text: 'Yes, looking at them now. The project roadmap looks great!', sender: 'me', time: 'Yesterday' },
        ]
    },
    {
        id: 3,
        name: 'Jordan Smith',
        avatar: 'JS',
        lastMsg: 'Can we schedule a call for tomorrow?',
        time: '9:30 AM',
        online: true,
        messages: [
            { id: 1, text: 'Can we schedule a call for tomorrow?', sender: 'them', time: '9:30 AM' },
        ]
    }
];

const Messages = () => {
    const [selectedId, setSelectedId] = useState<number>(1);
    const [inputText, setInputText] = useState('');
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const scrollRef = useRef<HTMLDivElement>(null);

    const activeConvo = conversations.find(c => c.id === selectedId);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedId, conversations]);

    const handleSendMessage = () => {
        if (!inputText.trim() || !activeConvo) return;

        const newMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'me',
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

    return (
        <div className='buyer-shell'>
            <Sidebar active='messages' />
            <main className='buyer-main'>
                <TopBar active='dashboard' />
                <div className='buyer-content messages-content'>
                    <div className='chat-container'>

                        {/* LEFT: CONVERSATION LIST */}
                        <div className='conversation-list'>
                            <div className='list-header'>
                                <h2>Chats</h2>
                                <div className='search-box'>
                                    <SearchOutlined rev="" />
                                    <input type='text' placeholder='Search conversations...' />
                                </div>
                            </div>
                            <div className='conversations'>
                                {conversations.map(convo => (
                                    <div
                                        key={convo.id}
                                        className={`convo-item ${selectedId === convo.id ? 'active' : ''}`}
                                        onClick={() => setSelectedId(convo.id)}
                                    >
                                        <div className='avatar-box'>
                                            <div className='item-avatar'>{convo.avatar}</div>
                                            <div className={`status-dot ${convo.online ? '' : 'offline'}`} />
                                        </div>
                                        <div className='info'>
                                            <div className='name-row'>
                                                <span className='name'>{convo.name}</span>
                                                <span className='time'>{convo.time}</span>
                                            </div>
                                            <div className='last-msg'>{convo.lastMsg}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: CHAT BOX */}
                        {activeConvo ? (
                            <div className='chat-box'>
                                <div className='chat-header'>
                                    <div className='user-info'>
                                        <div className='avatar-small'>{activeConvo.avatar}</div>
                                        <div className='details'>
                                            <h3>{activeConvo.name}</h3>
                                            <span>{activeConvo.online ? 'Active now' : 'Offline'}</span>
                                        </div>
                                    </div>
                                    <div className='header-actions'>
                                        <button><PhoneOutlined rev="" /></button>
                                        <button><VideoCameraOutlined rev="" /></button>

                                    </div>
                                </div>

                                <div className='chat-history' ref={scrollRef}>
                                    <div className='date-divider'>
                                        <span>TODAY</span>
                                    </div>
                                    {activeConvo.messages.map(msg => (
                                        <div key={msg.id} className={`msg ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                                            {msg.text}
                                            <div className='msg-time'>{msg.time}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className='chat-input-area'>
                                    <div className='input-wrapper'>
                                        <button className='attach-btn'><PlusOutlined rev="" /></button>

                                        <input
                                            type='text'
                                            placeholder='Type a message...'
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        />
                                        <button className='send-btn' onClick={handleSendMessage}>
                                            <SendOutlined rev="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='no-chat-selected'>
                                <div className='placeholder-icon'>
                                    <MessageOutlined rev="" />
                                </div>
                                <h3>Select a conversation</h3>
                                <p>Choose a freelancer from the list to start chatting.</p>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Messages;