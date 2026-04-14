import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { Button, message } from 'antd';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../components/topbar';

const Profile = () => {
    const [loading, setloading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [FormValues, setFormValues] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Bio: ''
    });

    const [Url, setUrl] = useState<string | undefined>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFilePicker = () => {
        if (!isEditing) return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                message.error('Image must be smaller than 2MB!');
                return;
            }
            const url = URL.createObjectURL(file);
            setUrl(url);
            message.success('Avatar updated successfully!');
        }
    };

    const handleInputChange = (field: 'Name' | 'Email' | 'Phone' | 'Bio') =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { value } = event.target;
            setFormValues((prev) => ({ ...prev, [field]: value }));
        };

    const handleSave = () => {
        message.success('Profile information saved successfully!');
        setIsEditing(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isEditing) {
            handleSave();
        }
    };
    

    const blueBtnStyle = { backgroundColor: '#0f7bff', borderColor: '#0f7bff', color: '#fff', boxShadow: '0 4px 12px rgba(15, 123, 255, 0.3)' };

    return (
        <div className='profile-shell'>
            <aside className='profile-sidebar'>
                <Sidebar active='profile' />
            </aside>
            <main className='profile-main'>
                <TopBar active='profile' />

                <div className='profile-content'>
                    <div className="profile-header">
                        <div>
                            <h2>Profile Settings</h2>
                            <p className="subtitle">Manage your account and contact details</p>
                        </div>
                        <div className="actions">
                            {!isEditing ? (
                                <Button type="primary" onClick={() => setIsEditing(true)} style={blueBtnStyle} className="dynamic-btn">
                                    Edit Profile
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={() => setIsEditing(false)} style={{ marginRight: 15, borderRadius: 8 }}>Cancel</Button>
                                    <Button type="primary" onClick={handleSave} style={blueBtnStyle} className="dynamic-btn">
                                        Save Changes
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <form className='contact-form' onSubmit={handleSubmit}>
                        <div className="profile-banner">
                            <div className="banner-overlay"></div>
                        </div>

                        <div className="form-body">
                            <div className="avatar-section">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    disabled={!isEditing}
                                />
                                <div
                                    onClick={triggerFilePicker}
                                    className={`avatar-preview ${isEditing ? 'editable' : ''}`}
                                    style={{
                                        background: Url ? `url(${Url}) center/cover` : '#fff',
                                        cursor: isEditing ? 'pointer' : 'default',
                                    }}
                                >
                                    {!Url && <span className="empty-avatar-text">Upload</span>}
                                    {isEditing && (
                                        <div className="avatar-edit-overlay">
                                            <span>📷 Change</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* STATISTICS SECTION */}
                            <div className="stats-container">
                                <div className="stat-card">
                                    <span className="stat-label">Total Spent</span>
                                    <h3 className="stat-value">$14,250.00</h3>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Disbursement Rate</span>
                                    <h3 className="stat-value">85.4%</h3>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-label">Feedback</span>
                                    <h3 className="stat-value">
                                        <span style={{ color: '#10b981', marginRight: 10 }}>👍 124</span> 
                                        <span style={{ color: '#ef4444' }}>👎 2</span>
                                    </h3>
                                </div>
                            </div>

                            {/* NARROW 1-COLUMN FORM (LÚC ĐẦU) */}
                            <div className='fields narrow-grid'>
                                <label>
                                    <span>Full Name</span>
                                    <input type='text' value={FormValues.Name} onChange={handleInputChange('Name')} disabled={!isEditing} placeholder="Enter your full name" />
                                </label>
                                <label>
                                    <span>Email Address</span>
                                    <input type='email' value={FormValues.Email} onChange={handleInputChange('Email')} disabled={!isEditing} placeholder="Enter your email" />
                                </label>
                                <label>
                                    <span>Phone Number</span>
                                    <input type='text' value={FormValues.Phone} onChange={handleInputChange('Phone')} disabled={!isEditing} placeholder="Enter your phone number" />
                                </label>
                                <label>
                                    <span>Bio</span>
                                    <textarea value={FormValues.Bio} onChange={handleInputChange('Bio')} disabled={!isEditing} rows={4} placeholder="Write a short description about yourself..." />
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Profile;
