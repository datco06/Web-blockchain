import { useRef, useEffect } from 'react';
import {
    SearchOutlined,
    SendOutlined,
    PlusOutlined,
    MessageOutlined
} from '@ant-design/icons';
import './index.less';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/topbar';

import { useModel } from 'umi';
import { MessageSender } from '@/services/freelancer/messages/typing';

const Messages = () => {
    const {
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
    } = useModel('freelancer.messages.index');
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedId, activeConvo?.messages]);

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64Image = event.target?.result as string;
            handleImageUpload(base64Image);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    return (
        <div className='messages-shell'>
            <Sidebar active='messages' appearance='light' />
            <main className='messages-main'>
                <TopBar active='messages' />
                <div className='messages-content-wrapper'>
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
                                        <div key={msg.id} className={`msg ${msg.sender === MessageSender.Me ? 'sent' : 'received'} ${msg.image ? 'has-image' : ''}`}>
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
                                            onChange={onImageChange}
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
                                <p>Choose a buyer from the list to start chatting.</p>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Messages;
