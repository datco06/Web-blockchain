import { useState } from 'react';
import { useLocation, history, useParams } from 'umi';
import {
    ArrowLeftOutlined,
    StarFilled,
    CalendarOutlined,
    CheckCircleFilled,
    MailOutlined,
    PhoneOutlined,
    IdcardOutlined,
    CreditCardOutlined,
    ShareAltOutlined,
    CommentOutlined,
    AppstoreOutlined,
    SolutionOutlined,
    TranslationOutlined,
    MessageOutlined
} from '@ant-design/icons';
import { Button, Avatar, Divider, Modal, message } from 'antd';
import '../index.less';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import './index.less';
import { useModel } from 'umi';

const ViewProfile = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const freelancer = (location.state as any)?.freelancer;
    const project = (location.state as any)?.project;
    const from = (location.state as any)?.from;

    const { resolveFreelancerProfile, copyProfileLink } = useModel('buyer.view-profile.index');

    const [isContactModalVisible, setIsContactModalVisible] = useState(false);

    const handleBack = () => {
        if (from === 'freelancers') {
            history.push('/buyer/freelancers');
        } else {
            history.push({
                pathname: '/buyer/project-detail',
                state: { project }
            });
        }
    };

    const handleContactAction = (type: 'chat' | 'email' | 'phone') => {
        switch (type) {
            case 'chat':
                history.push({
                    pathname: '/buyer/messages',
                    state: { selectedId: (freelancerData as any).id || 1 }
                });
                break;
            case 'email':
                window.location.href = `mailto:alex@example.com?subject=Contact from Blockchain Platform`;
                break;
            case 'phone':
                window.location.href = `tel:+1234567890`;
                break;
        }
        setIsContactModalVisible(false);
    };

    const handleShare = async () => {
        await copyProfileLink();
        message.success('Contact link copied to clipboard!');
    };

    const freelancerData = resolveFreelancerProfile(freelancer);

    return (
        <div className="view-shell">
            <aside className='view-sidebar'>
                <Sidebar active={from === 'freelancers' ? 'freelancers' : 'projects'} />
            </aside>
            <main className='view-man'>
                <TopBar active={from === 'freelancers' ? 'dashboard' : 'projects'} />
                <div className='view-profile-wrapper'>
                    <div className='profile-banner' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')" }}>
                        <div className='profile-avatar-wrapper'>
                            <img
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                                alt="avatar"
                                className='avatar-img'
                            />
                        </div>
                    </div>

                    { }
                    <div className='profile-main-area'>

                        { }
                        <div className='profile-sidebar-content'>
                            <div className='action-buttons'>
                                <Button
                                    type="primary"
                                    size="large"
                                    className='contact-btn'
                                    onClick={() => setIsContactModalVisible(true)}
                                >
                                    Contact Me
                                </Button>
                                <button className='share-btn' onClick={handleShare}>
                                    <ShareAltOutlined rev="" />
                                </button>
                            </div>

                            <div className='verification-box'>
                                <h3>Verifications</h3>
                                <div className='verify-item'>
                                    <div className='verify-label'><IdcardOutlined rev="" /> Identity Verified</div>
                                    <div className='verify-status is-verified'><CheckCircleFilled rev="" /></div>
                                </div>
                                <div className='verify-item'>
                                    <div className='verify-label'><MailOutlined rev="" /> Email Verified</div>
                                    <div className='verify-status is-verified'><CheckCircleFilled rev="" /></div>
                                </div>
                                <div className='verify-item'>
                                    <div className='verify-label'><PhoneOutlined rev="" /> Phone Verified</div>
                                    <div className='verify-status is-verified'><CheckCircleFilled rev="" /></div>
                                </div>
                                <div className='verify-item'>
                                    <div className='verify-label'><CreditCardOutlined rev="" /> Payment Method</div>
                                    <div className='verify-status is-verified'><CheckCircleFilled rev="" /></div>
                                </div>

                                <div className='verify-stats'>
                                    <div className='stat-row'>
                                        <span className='label'>Completed Jobs</span>
                                        <span className='value'>47</span>
                                    </div>
                                    <div className='stat-row'>
                                        <span className='label'>On Budget</span>
                                        <span className='value'>100%</span>
                                    </div>
                                    <div className='stat-row'>
                                        <span className='label'>On Time</span>
                                        <span className='value'>98%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='profile-details-content'>
                            <div className='profile-header-info'>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h1>{freelancerData.name}</h1>
                                        <p className='username'>{freelancerData.username}</p>
                                    </div>
                                    <div className='back-nav'>
                                        <Button
                                            icon={<ArrowLeftOutlined rev="" />}
                                            type="link"
                                            onClick={handleBack}
                                            style={{ color: '#64748b' }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </div>

                                <div className='rating-row'>
                                    <span className='stars'><StarFilled rev="" /> {freelancerData.rating}</span>
                                    <span className='reviews-count'>{freelancerData.reviewsCount} Reviews</span>
                                    <span className='join-date'><CalendarOutlined rev="" /> {freelancerData.joinDate}</span>
                                </div>
                            </div>

                            <div className='profile-section'>
                                <h3 className='section-title'><SolutionOutlined rev="" /> About Me</h3>
                                <p className='bio-text'>{freelancerData.bio}</p>
                            </div>

                            <div className='profile-section'>
                                <h3 className='section-title'><TranslationOutlined rev="" /> Service & Skills</h3>
                                <div className='skills-list'>
                                    {freelancerData.skills.map((skill: string, i: number) => (
                                        <span key={i} className='skill-tag'>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
                                <div>
                                    <h4 style={{ color: '#64748b', marginBottom: '8px' }}>Primary Service</h4>
                                    <p style={{ fontWeight: 600 }}>{freelancerData.primaryService}</p>
                                </div>
                                <div>
                                    <h4 style={{ color: '#64748b', marginBottom: '8px' }}>Pricing Preference</h4>
                                    <p style={{ fontWeight: 600 }}>{freelancerData.pricing}</p>
                                </div>
                            </div>

                            <div className='profile-section'>
                                <h3 className='section-title'><AppstoreOutlined rev="" /> Portfolio</h3>
                                <div className='portfolio-grid'>
                                    {freelancerData.portfolio.map((item: any, i: number) => (
                                        <div key={i} className='portfolio-item'>
                                            <div className='portfolio-img' style={{ backgroundImage: `url(${item.img})` }}></div>
                                            <div className='portfolio-info'>
                                                <h4>{item.title}</h4>
                                                <p>{item.type}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='profile-section'>
                                <h3 className='section-title'><CommentOutlined rev="" /> Reviews & Feedback</h3>
                                <div className='review-list'>
                                    {freelancerData.reviews.map((rev: any, i: number) => (
                                        <div key={i} className='review-item'>
                                            <div className='buyer-avatar'>{rev.author.charAt(0)}</div>
                                            <div className='review-content'>
                                                <div className='review-header'>
                                                    <h5>{rev.author}</h5>
                                                    <div className='stars'>
                                                        {[...Array(rev.rating)].map((_, j) => <StarFilled key={j} rev="" />)}
                                                    </div>
                                                </div>
                                                <div className='review-date'>{rev.date}</div>
                                                <p className='review-txt'>{rev.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <Modal
                    title={<div style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>Contact {freelancerData.name}</div>}
                    visible={isContactModalVisible}
                    onCancel={() => setIsContactModalVisible(false)}
                    footer={null}
                    centered
                    width={400}
                    className="contact-modal"
                >
                    <div className="contact-options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                        <Button
                            icon={<MessageOutlined rev="" />}
                            size="large"
                            style={{ height: '60px', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}
                            onClick={() => handleContactAction('chat')}
                        >
                            Chat via Messages
                        </Button>
                        <Button
                            icon={<MailOutlined rev="" />}
                            size="large"
                            style={{ height: '60px', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}
                            onClick={() => handleContactAction('email')}
                        >
                            Send Email
                        </Button>
                        <Button
                            icon={<PhoneOutlined rev="" />}
                            size="large"
                            style={{ height: '60px', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}
                            onClick={() => handleContactAction('phone')}
                        >
                            Call via Phone
                        </Button>
                    </div>
                </Modal>
            </main>
        </div>
    );
};

export default ViewProfile;
