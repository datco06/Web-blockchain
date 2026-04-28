import React, { useEffect, useState } from 'react';
import { history, useParams, useModel } from 'umi';
import { Tag, Button, Spin, Avatar, Modal, Form, Input, message } from 'antd';
import {
    ArrowLeftOutlined,
    FileTextOutlined,
    CheckCircleFilled,
    CheckCircleOutlined,
    ClockCircleFilled,
    RobotOutlined,
    UserOutlined,
    MessageOutlined,
    MailOutlined,
    PhoneOutlined,
    GithubOutlined,
    LinkOutlined
} from '@ant-design/icons';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/topbar';
import '../../index.less';
import './index.less';
import type { ClientFile, AITask } from '@/services/freelancer/active-jobs/typing.d';

const MOCK_PROJECT = {
    id: 'mock-1',
    title: 'Default Project Details',
    description: 'This is a fallback project view because specific data for this job ID was not mocked in the service.',
    technologies: ['React', 'TypeScript', 'Not Found'],
    files: [
        { id: 'f1', name: 'placeholder.pdf', size: '1.0 MB' },
    ],
    tasks: [
        {
            id: 't1',
            title: 'Fallback Task 1',
            description: 'Default description',
            duration: 'TBD',
            payment: '$0',
            deadline: 'TBD',
            status: 'not_completed' as any
        }
    ],
    category: 'Fallback',
    budget: '$0',
    client: 'N/A',
    progress: 0,
    startDate: '',
    deadline: '',
    statusLabel: 'Unknown',
    status: 0 as any
};

const ActiveDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [submitModalVisible, setSubmitModalVisible] = useState(false);
    const [submittingTaskId, setSubmittingTaskId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    const model = useModel('freelancer.active-jobs.active-detail' as any);
    const { jobDetail, loading, loadJobDetail } = model as any;

    const handleOpenSubmit = (taskId: string) => {
        setSubmittingTaskId(taskId);
        setSubmitModalVisible(true);
        form.resetFields();
    };

    const handleConfirmSubmit = () => {
        form.validateFields().then(values => {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setSubmitModalVisible(false);
                message.success('Sản phẩm đã được gửi thành công để AI xét duyệt!');
            }, 800);
        }).catch(() => {});
    };

    useEffect(() => {
        if (id) {
            loadJobDetail(id);
        }
    }, [id, loadJobDetail]);

    const project = jobDetail || MOCK_PROJECT;

    const renderTaskStatus = (status: string) => {
        switch (status) {
            case 'completed':
                return (
                    <div className="ad-status-wrapper">
                        <CheckCircleFilled className="ad-status-green" rev="" />
                        <span style={{ color: '#10b981' }}>Completed</span>
                    </div>
                );
            case 'pending_review':
                return (
                    <div className="ad-status-red">
                        <ClockCircleFilled rev="" />
                        <span>Chờ duyệt</span>
                    </div>
                );
            case 'not_completed':
            default:
                return (
                    <div className="ad-status-wrapper">
                        <CheckCircleOutlined className="ad-status-grey" rev="" />
                        <span style={{ color: '#64748b' }}>To do</span>
                    </div>
                );
        }
    };

    const getButtonProps = (status: string) => {
        if (status === 'completed') {
            return { text: 'Submitted', disabled: true, className: 'completed-btn' };
        }
        if (status === 'pending_review') {
            return { text: 'In Review', disabled: true };
        }
        return { text: 'Submit Task', disabled: false };
    };

    return (
        <div className="dashboard-shell">
            <Sidebar active="active-jobs" />
            <main className="freelancer-main">
                <TopBar active="active-jobs" />

                <div className="ad-page-container">
                    <div className="ad-header">
                        <span className="ad-back-link" onClick={() => history.goBack()}>
                            <ArrowLeftOutlined rev="" /> Back to Active Jobs
                        </span>
                    </div>

                    <Spin spinning={loading}>
                        <div className="ad-card">
                            <h1 className="ad-card-title">{project.title}</h1>
                            <p className="ad-card-desc">{project.description}</p>

                            <div className="ad-client-info">
                                <div className="ad-client-profile">
                                    <Avatar size={44} icon={<UserOutlined rev="" />} src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                                    <div className="ad-client-details">
                                        <h4>{project.client}</h4>
                                        <p>Hiring Manager</p>
                                    </div>
                                </div>
                                <div className="ad-client-actions">
                                    <Button
                                        className="ad-message-btn"
                                        icon={<MessageOutlined rev="" />}
                                        onClick={() => history.push('/freelancer/messages')}
                                    >
                                        Message
                                    </Button>
                                    <Button
                                        className="ad-message-btn"
                                        icon={<MailOutlined rev="" />}
                                        onClick={() => window.location.href = 'mailto:client@example.com'}
                                    >
                                        Email
                                    </Button>
                                    <Button
                                        className="ad-message-btn"
                                        icon={<PhoneOutlined rev="" />}
                                        onClick={() => window.location.href = 'tel:+1234567890'}
                                    >
                                        Call
                                    </Button>
                                </div>
                            </div>

                            <h3 className="ad-section-title">Technical Requirements</h3>
                            <div className="ad-tech-tags">
                                {project.technologies?.map((tech: string) => (
                                    <Tag key={tech}>{tech}</Tag>
                                ))}
                            </div>

                            <h3 className="ad-section-title">Client Files</h3>
                            <div className="ad-file-list">
                                {project.files?.length > 0 ? (
                                    project.files.map((file: ClientFile) => (
                                        <div key={file.id} className="ad-file-item">
                                            <FileTextOutlined className="ad-file-item-icon" rev="" />
                                            <div>
                                                <div style={{ fontWeight: 500, fontSize: 15 }}>{file.name}</div>
                                                <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{file.size}</div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b' }}>
                                        No files attached.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="ad-card" style={{ padding: '32px 32px 40px 32px' }}>
                            <h3 className="ad-section-title" style={{ marginTop: 0, fontSize: 20, marginBottom: 8 }}>Project Implementation Roadmap</h3>
                            <p style={{ color: '#475569', marginBottom: 24 }}>Complete the AI-generated milestones step by step to finish this project.</p>

                            <div className="ad-task-list">
                                {project.tasks?.map((task: AITask, index: number) => {
                                    const btnProps = getButtonProps(task.status);

                                    return (
                                        <div key={task.id} className="ad-task-item">
                                            <div className="ad-task-badge">{index + 1}</div>
                                            <div className="ad-task-card">
                                                <div className="ad-task-header">
                                                    <div className="ad-task-title-group">
                                                        <h3>{task.title}</h3>
                                                    </div>
                                                </div>

                                                <div className="ad-task-desc">
                                                    {task.description}
                                                </div>

                                                <div className="ad-task-meta">
                                                    <span className="ad-meta-tag">Duration: {task.duration}</span>
                                                    <span className="ad-meta-tag">Payment: {task.payment}</span>
                                                    <span className="ad-meta-tag">Deadline: {task.deadline}</span>
                                                </div>

                                                {task.aiNote && (
                                                    <div className="ad-ai-note">
                                                        <strong><RobotOutlined rev="" /> AI Note</strong>
                                                        {task.aiNote}
                                                    </div>
                                                )}

                                                <div className="ad-task-footer">
                                                    {renderTaskStatus(task.status)}
                                                    <Button
                                                        type="primary"
                                                        className={`ad-submit-task-btn ${btnProps.className || ''}`}
                                                        disabled={btnProps.disabled}
                                                        onClick={() => {
                                                            if (!btnProps.disabled) handleOpenSubmit(task.id);
                                                        }}
                                                    >
                                                        {btnProps.text}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Spin>
                </div>
                
                <Modal
                    title={<span style={{ fontSize: 18, fontWeight: 600 }}>Nộp sản phẩm Task</span>}
                    visible={submitModalVisible}
                    onCancel={() => setSubmitModalVisible(false)}
                    onOk={handleConfirmSubmit}
                    confirmLoading={isSubmitting}
                    okText="Gửi Xét Duyệt"
                    cancelText="Hủy"
                    okButtonProps={{ style: { background: '#f0b90b', color: '#000', borderColor: '#f0b90b', fontWeight: 600 } }}
                >
                    <div style={{ marginBottom: 20, color: '#475569' }}>
                        Vui lòng cung cấp các liên kết để hệ thống AI tự động đánh giá và đối chiếu chất lượng sản phẩm của bạn.
                    </div>
                    <Form form={form} layout="vertical">
                        <Form.Item name="github" label="Github Repository" rules={[{ required: true, message: 'Vui lòng nhập link Github!' }]}>
                            <Input prefix={<GithubOutlined rev="" style={{ color: '#94a3b8' }} />} placeholder="https://github.com/..." />
                        </Form.Item>
                        <Form.Item name="report" label="Link Báo cáo / Mô tả (Docs, PDF)">
                            <Input prefix={<FileTextOutlined rev="" style={{ color: '#94a3b8' }} />} placeholder="VD: Link Google Drive, Notion..." />
                        </Form.Item>
                        <Form.Item name="demo" label="Link Video Demo / Ảnh tham khảo">
                            <Input prefix={<LinkOutlined rev="" style={{ color: '#94a3b8' }} />} placeholder="VD: Youtube, Loom, Figma..." />
                        </Form.Item>
                        <Form.Item name="note" label="Ghi chú thêm (Tùy chọn)">
                            <Input.TextArea rows={3} placeholder="Mô tả ngắn gọn về các khó khăn hoặc cấu hình cần thiết để chạy demo..." />
                        </Form.Item>
                    </Form>
                </Modal>
            </main>
        </div>
    );
};

export default ActiveDetail;
