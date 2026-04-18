import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'umi';
import moment from 'moment';
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

import { useModel } from 'umi';
import type { ChatMessage, Conversation } from '@/services/buyer/messages/typing';

const Messages = () => {
    const location = useLocation();
    const [selectedId, setSelectedId] = useState<number>((location.state as any)?.selectedId || 1);
    const [inputText, setInputText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { conversations, setConversations } = useModel('buyer.messages.index');
    
    const [selectedChat, setSelectedChat] = useState<Conversation | null>(conversations[0]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const activeConvo = conversations.find(c => c.id === selectedId);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedId, conversations]);

    useEffect(() => {
        localStorage.setItem('buyer_conversations', JSON.stringify(conversations));
    }, [conversations]);

    const filteredConversations = conversations.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !activeConvo) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Image = event.target?.result as string;
            
            const newMessage: ChatMessage = {
                id: Date.now(),
                image: base64Image,
                sender: 'me',
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
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    return (
        <div className='buyer-shell'>
            <Sidebar active='messages' />
            <main className='buyer-main'>
                <TopBar active='dashboard' />
                <div className='buyer-content messages-content'>
                    <div className='chat-container'>

                        <div className='conversation-list'>
                            <div className='list-header'>
                                <h2>Chats</h2>
                                <div className='search-box'>
                                    <SearchOutlined rev="" />
                                    <input 
                                        type='text' 
                                        placeholder='Search conversations...' 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='conversations'>
                                {filteredConversations.map(convo => (
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

                        {activeConvo ? (
                            <div className='chat-box'>
                                <div className='chat-header'>
                                    <div className='user-info'>
                                        <div className='avatar-small'>{activeConvo.avatar}</div>
                                        <div className='details'>
                                            <h3>{activeConvo.name}</h3>
                                            <span>{getOnlineStatus(activeConvo)}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className='chat-history' ref={scrollRef}>
                                    <div className='date-divider'>
                                        <span>{new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                                    </div>
                                    {activeConvo.messages.map(msg => (
                                        <div key={msg.id} className={`msg ${msg.sender === 'me' ? 'sent' : 'received'} ${msg.image ? 'has-image' : ''}`}>
                                            {msg.image ? (
                                                <img src={msg.image} alt="Sent" className='msg-image' />
                                            ) : (
                                                msg.text
                                            )}
                                            <div className='msg-time'>{msg.time}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className='chat-input-area'>
                                    <div className='input-wrapper'>
                                        <button className='attach-btn' onClick={() => fileInputRef.current?.click()}>
                                            <PlusOutlined rev="" />
                                        </button>
                                        <input 
                                            type='file' 
                                            accept='image/*' 
                                            style={{ display: 'none' }} 
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                        />

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