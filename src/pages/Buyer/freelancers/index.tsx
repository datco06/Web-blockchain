import { history } from 'umi';
import { useState } from 'react';
import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../components/topbar';

import type { Talent } from '@/services/buyer/freelancers/typing';
import { useModel } from 'umi';

const FreelancerFinder = () => {
    const { filteredTalents, filterTalents, setFilteredTalents } = useModel('buyer.freelancers.index');
    const [filters, setFilters] = useState({
        specialty: 'design',
        experience: 'senior'
    });

    const handleView = (talent: any) => {
        history.push({
            pathname: `/buyer/view-profile/${talent.id}`,
            state: { 
                freelancer: {
                    ...talent,
                    jobTitle: talent.role,
                },
                from: 'freelancers'
            }
        });
    };

    const handleFilterChange = (field: string, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const applyFilters = () => {
        const results = filterTalents(filters);
        setFilteredTalents(results);
    };

    return (
        <div className='buyer-shell'>
            <Sidebar active='freelancers' />
            <main className='buyer-main'>
                <TopBar active='dashboard' />
                <div className='buyer-content freelancer-content'>
                    <section className='overview-header'>
                        <div>
                            <p className='eyebrow'>Find freelancers</p>
                            <h1>Browse curated pitches powered by TrustFlow AI.</h1>
                        </div>
                    </section>

                    <section className='talent-table'>
                        <form className='talent-filters' onSubmit={(e) => e.preventDefault()}>
                            <label>
                                <span>Specialty</span>
                                <select 
                                    value={filters.specialty} 
                                    onChange={(e) => handleFilterChange('specialty', e.target.value)}
                                >
                                    <option value='design'>Product Design</option>
                                    <option value='frontend'>Front-end Development</option>
                                    <option value='backend'>Backend / API</option>
                                    <option value='ai'>AI &amp; Data</option>
                                </select>
                            </label>
                            <label>
                                <span>Experience</span>
                                <select 
                                    value={filters.experience} 
                                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                                >
                                    <option value='mid'>3+ years</option>
                                    <option value='senior'>5+ years</option>
                                    <option value='lead'>8+ years</option>
                                </select>
                            </label>
                            <button type='button' className='search-btn' onClick={applyFilters}>
                                Find talent
                            </button>
                        </form>

                        <div className='table-wrapper'>
                            <div className='table-head'>
                                <span>Freelancer</span>
                                <span>Bid Amount</span>
                                <span>Experience</span>
                                <span>AI Match Score</span>
                                <span />
                            </div>
                            <ul>
                                {filteredTalents.length > 0 ? (
                                    filteredTalents.map((talent) => (
                                        <li key={talent.name}>
                                            <div className='freelancer'>
                                                <div className='avatar'>{talent.avatar}</div>
                                                <div>
                                                    <strong>{talent.name}</strong>
                                                    <p>{talent.role}</p>
                                                </div>
                                            </div>
                                            <div className='bid'>
                                                <strong>{talent.bid}</strong>
                                                <span>{talent.bidType}</span>
                                            </div>
                                            <div className='experience'>{talent.experience}</div>
                                            <div className='match'>
                                                <div className='bar'>
                                                    <span style={{ width: `${talent.match}%` }} />
                                                </div>
                                                <strong>{talent.match}%</strong>
                                            </div>
                                            <div className='action'>
                                                <button type='button' onClick={() => handleView(talent)}>View</button>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                                        No freelancers found matching these criteria.
                                    </div>
                                )}
                            </ul>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default FreelancerFinder;
