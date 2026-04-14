import { useLocation, history } from 'umi';
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
    TranslationOutlined
} from '@ant-design/icons';
import { Button, Avatar, Divider } from 'antd';
import '../index.less';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import './index.less';

const ViewProfile = () => {
    const location = useLocation();
    const freelancer = (location.state as any)?.freelancer;
    const project = (location.state as any)?.project;
    const from = (location.state as any)?.from;

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

    // Rich Mock Data for Wow factor
    const defaultData = {
        name: 'Alex Rivera',
        username: '@arivera_design',
        role: 'Senior Product Designer & Brand Strategist',
        rating: 4.9,
        reviewsCount: 124,
        joinDate: 'Joined March 2021',
        bio: "I'm a digital product designer with over 8 years of experience building scalable design systems and intuitive user interfaces for tech startups and established brands globally. I specialize in turning complex problems into simple, beautiful, and intuitive designs that drive business growth. My approach combines user-centric research with pixel-perfect visual execution.",
        skills: ['UI/UX Design', 'Figma', 'System Architecture', 'Brand Identity', 'React', 'Motion Design', 'Prototyping'],
        languages: ['English (Native)', 'Vietnamese (Fluent)', 'French (Intermediate)'],
        pricing: '$45 - $65 / hour',
        primaryService: 'Mobile & Web Product Design',
        experience: [
            { company: 'DesignFlow Studio', role: 'Lead Designer', period: '2021 - Present' },
            { company: 'TechNova Inc.', role: 'Senior UI Artist', period: '2018 - 2021' },
            { company: 'CreativePulse', role: 'Junior Designer', period: '2016 - 2018' }
        ],
        portfolio: [
            { title: 'Fintech Mobile App', type: 'UI/UX', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
            { title: 'E-commerce Platform', type: 'Web Design', img: 'https://images.unsplash.com/photo-1523474253046-2cd2c78a0dbb?auto=format&fit=crop&w=600&q=80' },
            { title: 'Luxury Brand Identity', type: 'Branding', img: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=600&q=80' }
        ],
        reviews: [
            { author: 'Michael Chen', rating: 5, date: '2 weeks ago', text: 'Alex is one of the most talented designers I have worked with. Their attention to detail and understanding of UX patterns is exceptional.' },
            { author: 'Sarah Jenkins', rating: 5, date: '1 month ago', text: 'Delivered the project ahead of schedule and precisely to specifications. Highly recommended for any complex UI work.' }
        ]
    };

    const freelancerData = freelancer ? { ...defaultData, name: freelancer.name, role: freelancer.role || freelancer.jobTitle, rating: freelancer.rating } : defaultData;

    return (
        <div className="view-shell">
            <aside className='view-sidebar'>
                <Sidebar active={from === 'freelancers' ? 'freelancers' : 'projects'} />
            </aside>
            <main className='view-man'>
                <TopBar active={from === 'freelancers' ? 'dashboard' : 'projects'} />
                <div className='view-profile-wrapper'>
                    {/* BANNER SECTION */}
                    <div className='profile-banner' style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')" }}>
                        <div className='profile-avatar-wrapper'>
                            <img
                                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                                alt="avatar"
                                className='avatar-img'
                            />
                        </div>
                    </div>

                    {/* MAIN CONTENT GRID */}
                    <div className='profile-main-area'>

                        {/* LEFT COLUMN */}
                        <div className='profile-sidebar-content'>
                            <div className='action-buttons'>
                                <Button type="primary" size="large" className='contact-btn'>Contact Me</Button>
                                <button className='share-btn'><ShareAltOutlined rev="" /></button>
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

                        {/* RIGHT COLUMN */}
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

                            {/* BIO SECTION */}
                            <div className='profile-section'>
                                <h3 className='section-title'><SolutionOutlined rev="" /> About Me</h3>
                                <p className='bio-text'>{freelancerData.bio}</p>
                            </div>

                            {/* SKILLS SECTION */}
                            <div className='profile-section'>
                                <h3 className='section-title'><TranslationOutlined rev="" /> Service & Skills</h3>
                                <div className='skills-list'>
                                    {freelancerData.skills.map((skill: string, i: number) => (
                                        <span key={i} className='skill-tag'>{skill}</span>
                                    ))}
                                </div>
                            </div>

                            {/* INFO GRID */}
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

                            {/* PORTFOLIO SECTION */}
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

                            {/* REVIEWS SECTION */}
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
            </main>
        </div>
    );
};

export default ViewProfile;
