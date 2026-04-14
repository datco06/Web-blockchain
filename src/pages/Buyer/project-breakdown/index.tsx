import '../index.less';
import './index.less';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';
import React, { useState, useEffect } from 'react';
import { useLocation, history } from 'umi';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MoreOutlined, EditOutlined, RocketOutlined, FileOutlined, SolutionOutlined } from '@ant-design/icons';
import { Modal, Input, Button, Form, message, Tag } from 'antd';

const ProjectBreakdown = () => {
    const [dots, setDots] = useState('');
    const [aiTasks, setAiTasks] = useState<any[] | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    const location = useLocation();
    const jobData = (location.state as any)?.jobData;

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const analyzeProject = async () => {
            try {
                if (!jobData) return;
                const API_KEY = 'AIzaSyB36ZzvyJU22h8eiS4QMjHbIObHepbC_dk';
                const genAI = new GoogleGenerativeAI(API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
                const prompt = `
                    You are an expert Project Manager. I have a project with the following details:
                    ${JSON.stringify(jobData)}
                    
                    Please break down this project into logical milestones.
                    RETURN ONLY VALID JSON. The structure must exactly match this format:
                    [
                       {
                           "milestoneName": "Milestone 1: Discovery & Research",
                           "description": "Analyze user needs and market...",
                           "duration": "1 week",
                           "payment": "0.3 ETH (12%)",
                           "aiNote": "Focus on competitor analysis in the Vietnam market."
                       }
                    ]
                `;

                const result = await model.generateContent(prompt);
                const responseText = result.response.text();
                const jsonMatch = responseText.match(/\[[\s\S]*\]/);
                const cleanJson = jsonMatch ? jsonMatch[0] : responseText;
                const breakdownJson = JSON.parse(cleanJson);

                setAiTasks(breakdownJson);

            } catch (error) {
                console.error("AI Error:", error);
                message.error("Failed to analyze project. Please try again.");
            }
        };
        analyzeProject();
    }, [jobData]);

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        form.setFieldsValue(aiTasks![index]);
    };

    const handleSaveEdit = () => {
        form.validateFields().then(values => {
            const newTasks = [...aiTasks!];
            newTasks[editingIndex!] = values;
            setAiTasks(newTasks);
            setEditingIndex(null);
            message.success("Milestone updated!");
        });
    };

    const handlePushJob = async () => {
        setSubmitting(true);
        try {
            const newProject = {
                title: jobData.title,
                description: jobData.description,
                budget: jobData.budgetRange,
                duration: jobData.duration,
                requirements: jobData.requirements,
                category: jobData.category,
                milestones: aiTasks,
                documents: jobData.documents,
                status: 'active',
                statusLabel: 'Active',
                postDate: new Date().toLocaleDateString('en-US'),
                bids: 0
            };

            const existingProjects = JSON.parse(localStorage.getItem('pushed_projects') || '[]');
            const updatedProjects = [newProject, ...existingProjects];
            localStorage.setItem('pushed_projects', JSON.stringify(updatedProjects));

            message.success("Project pushed successfully!");
            setTimeout(() => {
                history.push('/buyer/projects');
            }, 1000);
        } catch (error) {
            console.error("Push Error:", error);
            message.error("Something went wrong while pushing the job.");
            setSubmitting(false);
        }
    };

    return (
        <div className='buyer-shell'>
            <Sidebar active='active' />
            <main className='buyer-main'>
                <TopBar active='dashboard' />
                <div className='buyer-content' style={{ padding: '40px 40px 100px 40px', background: '#f8fafc', minHeight: 'calc(100vh - 64px)' }}>
                    {!aiTasks ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                            <h1 style={{ color: '#000000ff', fontWeight: 400 }}>AI is analyzing{dots}</h1>
                        </div>
                    ) : (
                        <div className="roadmap-container">
                            <div className="roadmap-header">
                                <h2>Project Implementation Roadmap</h2>
                                <p>Review and refine the AI-generated milestones before publishing.</p>
                            </div>

                            <div className="roadmap-steps">
                                {aiTasks.map((item, index) => (
                                    <div className="step-item" key={index}>
                                        <div className="step-badge">{index + 1}</div>
                                        <div className="step-card">
                                            <div className="step-card-header">
                                                <h3>{item.milestoneName}</h3>
                                                <MoreOutlined className="more-icon" rev="" />
                                            </div>
                                            <div className="step-desc">
                                                {item.description}
                                            </div>
                                            <div className="step-meta">
                                                <div className="tags-wrapper">
                                                    <span className="meta-tag">Est. Duration: {item.duration}</span>
                                                    <span className="meta-tag">Payment: {item.payment}</span>
                                                </div>
                                            </div>
                                            <div className="ai-note-box">
                                                <div className="note-text">
                                                    <strong>AI Note</strong>
                                                    {item.aiNote}
                                                </div>
                                                <button className="edit-btn" onClick={() => handleEdit(index)}>
                                                    <EditOutlined rev="" /> Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* SUPPORTING DOCUMENTS SECTION */}
                            <div className="roadmap-header" style={{ marginTop: 48, borderTop: '1px solid #e2e8f0', paddingTop: 32 }}>
                                <h2>Supporting Documents</h2>
                                <p>Files you uploaded to help freelancers understand your requirements.</p>
                            </div>

                            <div className="roadmap-steps" style={{ marginTop: 24 }}>
                                {jobData?.documents && jobData.documents.length > 0 ? (
                                    jobData.documents.map((file: any, index: number) => (
                                        <div className="step-item" key={index} style={{ marginBottom: 16 }}>
                                            <div className="step-badge" style={{ background: '#f1f5f9', color: '#64748b' }}>
                                                <FileOutlined rev="" />
                                            </div>
                                            <div className="step-card" style={{ padding: '16px 24px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div>
                                                        <h3 style={{ margin: 0, fontSize: 16 }}>{file.name}</h3>
                                                        <span style={{ fontSize: 12, color: '#94a3b8' }}>{(file.size / 1024).toFixed(1)} KB</span>
                                                    </div>
                                                    <Tag color="blue">Attached</Tag>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center', color: '#64748b' }}>
                                        No documents attached to this project.
                                    </div>
                                )}
                            </div>

                            <div className="push-job-section" style={{ marginTop: 48 }}>
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<RocketOutlined rev="" />}
                                    loading={submitting}
                                    onClick={handlePushJob}
                                    className="push-job-btn"
                                >
                                    Confirm & Push Job
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                <Modal
                    title="Edit Step"
                    visible={editingIndex !== null}
                    onOk={handleSaveEdit}
                    onCancel={() => setEditingIndex(null)}
                    okText="Save"
                    cancelText="Cancel"
                >
                    <Form form={form} layout="vertical">
                        <Form.Item name="milestoneName" label="Milestone Title">
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item name="duration" label="Estimated Duration">
                            <Input />
                        </Form.Item>
                        <Form.Item name="payment" label="Payment (Est.)">
                            <Input />
                        </Form.Item>
                        <Form.Item name="aiNote" label="AI Note">
                            <Input.TextArea rows={2} />
                        </Form.Item>
                    </Form>
                </Modal>
            </main>
        </div>
    );
};

export default ProjectBreakdown;
