import { useLocation, history } from 'umi';
import { ArrowLeftOutlined, ClockCircleOutlined, DollarOutlined, SolutionOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, List, Tag, Modal, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import '../index.less';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import './index.less';
import { MOCK_APPLIED_FREELANCERS } from '@/services/buyer/project-detail';

import { useModel } from 'umi';

const ProjectDetail = () => {
    const { getProjectFromState } = useModel('buyer.project-detail.index');
    const location = useLocation();
    const project = getProjectFromState(location.state);
    const [form] = Form.useForm();

    const [milestones, setMilestones] = useState(project?.milestones || []);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleViewProfile = (freelancer: any) => {
        history.push({
            pathname: `/buyer/view-profile/${freelancer.id}`,
            state: { freelancer, project }
        });
    };

    const handleSaveEdit = () => {
        form.validateFields().then(values => {
            const newMilestones = [...milestones];
            newMilestones[editingIndex!] = values;
            setMilestones(newMilestones);
            const allProjects = JSON.parse(localStorage.getItem('pushed_projects') || '[]');
            const updatedProjects = allProjects.map((p: any) => {
                if (p.title === project.title && p.postDate === project.postDate) {
                    return { ...p, milestones: newMilestones };
                }
                return p;
            });
            localStorage.setItem('pushed_projects', JSON.stringify(updatedProjects));

            setEditingIndex(null);
            message.success("Roadmap updated successfully!");
        }).catch(info => {
            console.log('Validate Failed:', info);
        });
    };

    if (!project) {
        return (
            <div className='buyer-shell'>
                <Sidebar active='projects' />
                <main className='buyer-main'>
                    <TopBar active='dashboard' />
                    <div style={{ padding: 40, textAlign: 'center' }}>
                        <h2>Project not found</h2>
                        <Button type="primary" onClick={() => history.push('/buyer/projects')}>Back to Projects</Button>
                    </div>
                </main>
            </div>
        );
    }


    return (
        <div className='buyer-shell'>
            <Sidebar active='projects' />
            <main className='buyer-main'>
                <TopBar active='dashboard' />
                <div className='buyer-content project-detail-content'>
                    <div className='back-nav'>
                        <Button
                            icon={<ArrowLeftOutlined rev="" />}
                            type="link"
                            onClick={() => history.push('/buyer/projects')}
                            className="back-btn"
                        >
                            Back to Management
                        </Button>
                    </div>

                    <section className='overview-header' style={{ marginBottom: 24 }}>
                        <div>
                            <p className='eyebrow'>Project Detail</p>
                            <h1>{project.title}</h1>
                        </div>
                    </section>

                    <div className='detail-grid'>
                        <div className='left-column'>
                            <Card className='main-detail-card'>
                                <div className='detail-header'>
                                    <h2 style={{ margin: 0, fontSize: 20 }}>Project Overview</h2>
                                    <Tag color="processing">{project.statusLabel}</Tag>
                                </div>
                                <div className='post-date'>Posted on {project.postDate || 'Recently'}</div>

                                <Divider />

                                <div className='section'>
                                    <h3 className='section-title'>Description</h3>
                                    <p className='description-text'>{project.description}</p>
                                </div>

                                <div className='section'>
                                    <h3 className='section-title'>Technical Requirements</h3>
                                    <p className='description-text'>{project.requirements}</p>
                                    {project.category && (
                                        <div style={{ marginTop: 8 }}>
                                            <Tag color="blue">{project.category}</Tag>
                                        </div>
                                    )}
                                </div>

                                <div className='section-grid'>
                                    <div className='info-item'>
                                        <div className='info-label'><DollarOutlined rev="" /> Budget</div>
                                        <div className='info-value'>{project.budget}</div>
                                    </div>
                                    <div className='info-item'>
                                        <div className='info-label'><ClockCircleOutlined rev="" /> Duration</div>
                                        <div className='info-value'>{project.duration}</div>
                                    </div>
                                </div>
                            </Card>

                            <Card className='roadmap-card' title="AI Implementation Roadmap">
                                {milestones && milestones.length > 0 ? (
                                    <div className="roadmap-list">
                                        {milestones.map((item: any, index: number) => (
                                            <div className="roadmap-item" key={index}>
                                                <div className="roadmap-index">{index + 1}</div>
                                                <div className="roadmap-info" style={{ flex: 1 }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <h4 style={{ margin: 0 }}>{item.milestoneName}</h4>
                                                        <Button
                                                            type="text"
                                                            className="edit-roadmap-btn"
                                                            icon={<EditOutlined rev="" />}
                                                            onClick={() => {
                                                                setEditingIndex(index);
                                                                form.setFieldsValue(item);
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </div>
                                                    <p style={{ marginTop: 8 }}>{item.description}</p>
                                                    <div className="roadmap-meta">
                                                        <span>{item.duration}</span> • <span>{item.payment}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-roadmap">No AI tasks generated for this project.</div>
                                )}
                            </Card>

                            <Card className='documents-card' title='Supporting documents' style={{ marginTop: 24 }}>
                                {project.documents && project.documents.length > 0 ? (
                                    <List
                                        dataSource={project.documents}
                                        renderItem={(file: any) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar icon={<SolutionOutlined rev="" />} style={{ backgroundColor: '#f1f5f9', color: '#64748b' }} />}
                                                    title={<span style={{ fontWeight: 500 }}>{file.name}</span>}
                                                    description={`${(file.size / 1024).toFixed(1)} KB`}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                ) : (
                                    <div style={{ color: '#94a3b8', textAlign: 'center', padding: '20px 0' }}>
                                        No supporting documents uploaded.
                                    </div>
                                )}
                            </Card>
                        </div>

                        <div className='right-column'>
                            <Card className='freelancers-card' title="Applicants">
                                <List
                                    dataSource={MOCK_APPLIED_FREELANCERS}
                                    renderItem={(item) => (
                                        <List.Item className="freelancer-item">
                                            <List.Item.Meta
                                                avatar={<Avatar style={{ backgroundColor: '#2563eb' }}>{item.avatar}</Avatar>}
                                                title={item.name}
                                                description={item.role}
                                            />
                                            <div className="freelancer-score">
                                                <span>Rating: {item.rating}</span>
                                                <button
                                                    className="view-profile-btn"
                                                    onClick={() => handleViewProfile(item)}
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                                <Button
                                    block
                                    type="primary"
                                    style={{ marginTop: 16, backgroundColor: '#2563eb', borderColor: '#2563eb' }}
                                >
                                    Manage All Applications
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>

                <Modal
                    title="Edit Roadmap Step"
                    visible={editingIndex !== null}
                    onOk={handleSaveEdit}
                    onCancel={() => setEditingIndex(null)}
                    okText="Save Changes"
                    cancelText="Cancel"
                    destroyOnClose
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="milestoneName" label="Milestone Title" rules={[{ required: true, message: 'Please enter title' }]}>
                            <Input placeholder="e.g. Discovery & Research" />
                        </Form.Item>
                        <Form.Item name="description" label="Detailed Description">
                            <Input.TextArea rows={4} placeholder="What needs to be done?" />
                        </Form.Item>
                        <Form.Item name="duration" label="Estimated Duration">
                            <Input placeholder="e.g. 1 week" />
                        </Form.Item>
                        <Form.Item name="payment" label="Budget Allocation">
                            <Input placeholder="e.g. 0.3 ETH" />
                        </Form.Item>
                    </Form>
                </Modal>
            </main>
        </div>
    );
};

export default ProjectDetail;
