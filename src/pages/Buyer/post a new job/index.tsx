import type { UploadFile, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload } from 'antd';
import { useState } from 'react';
import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../../Freelancer/components/topbar';

const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

interface JobFormValues {
	title: string;
	category: string;
	description: string;
	functionality: string;
	requirements: string;
	deadline: string;
	budgetRange: string;
	documents?: UploadFile[];
}

const budgetRanges = [
	{ label: '$3,000 – $5,000', value: '3k-5k' },
	{ label: '$5,000 – $7,500', value: '5k-75k' },
	{ label: '$7,500 – $10,000', value: '75k-10k' },
	{ label: '$10,000+', value: '10k+' },
];

const CreateJob = () => {
	const [form] = Form.useForm<JobFormValues>();
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (values: JobFormValues) => {
		setSubmitting(true);
		try {
			// TODO: integrate AI-assisted drafting + API call
			console.info('Job draft', values);
		} finally {
			setSubmitting(false);
		}
	};

	const normFile: UploadProps['getValueFromEvent'] = (event) => {
		if (Array.isArray(event)) {
			return event;
		}
		return event?.fileList;
	};

	return (
		<div className='buyer-shell'>
			<Sidebar active='active' />
			<main className='buyer-main'>
				<TopBar active='dashboard' />
				<div className='buyer-content create-job-content'>
					<section className='create-job-hero'>
						<div>
							<p className='eyebrow'>Post a job</p>
							<h1>Create a New Job</h1>
							<p>Share the project scope, timeline, and budget so the best freelancers can respond.</p>
						</div>
						<div className='hero-actions'>
							<Button size='large' ghost onClick={() => form.resetFields()}>
								Save Draft
							</Button>
							<Button type='primary' size='large' loading={submitting} onClick={() => form.submit()}>
								Publish Job
							</Button>
						</div>
					</section>

					<div className='create-job-body'>
						<section className='form-card'>
							<h2>Project Details</h2>
							<Form<JobFormValues>
								form={form}
								layout='vertical'
								className='job-form'
								onFinish={handleSubmit}
								requiredMark={false}
								initialValues={{
									category: 'product',
									budgetRange: '5k-75k',
								}}
							>
								<Form.Item
									label='Job Title'
									name='title'
									rules={[{ required: true, message: 'Please enter a title for this project.' }]}
								>
									<Input size='large' placeholder='e.g. Senior Product Designer for Fintech App' />
								</Form.Item>

								<Form.Item
									label='Project Category'
									name='category'
									rules={[{ required: true, message: 'Select the most relevant category.' }]}
								>
									<Select size='large' placeholder='Select a category'>
										<Option value='product'>Product Design</Option>
										<Option value='frontend'>Front-end Engineering</Option>
										<Option value='backend'>Backend / API</Option>
										<Option value='ai'>AI &amp; Data</Option>
									</Select>
								</Form.Item>

								<Form.Item
									label='Description'
									name='description'
									rules={[{ required: true, message: 'Share the overall scope and vision.' }]}
								>
									<TextArea
										rows={4}
										placeholder='Describe the scope, deliverables, and expectations.'
										showCount
										maxLength={1200}
									/>
								</Form.Item>

								<Form.Item
									label='Main Functionality'
									name='functionality'
									rules={[{ required: true, message: 'List the core flows or milestones.' }]}
								>
									<TextArea
										rows={4}
										placeholder='List the core flows, features, or milestones you expect.'
										showCount
										maxLength={1200}
									/>
								</Form.Item>

								<Form.Item
									label='Technical Requirements'
									name='requirements'
									rules={[{ required: true, message: 'Note stack preferences or compliance needs.' }]}
								>
									<TextArea
										rows={4}
										placeholder='Stack preferences, integrations, compliance, or performance targets.'
										showCount
										maxLength={1200}
									/>
								</Form.Item>

								<div className='form-row'>
									<Form.Item
										label='Deadline'
										name='deadline'
										rules={[{ required: true, message: 'Provide an estimated deadline.' }]}
									>
										<Input type='date' size='large' />
									</Form.Item>
									<Form.Item
										label='Budget Range'
										name='budgetRange'
										rules={[{ required: true, message: 'Select a budget range.' }]}
									>
										<Select size='large' placeholder='Select a range'>
											{budgetRanges.map((option) => (
												<Option key={option.value} value={option.value}>
													{option.label}
												</Option>
											))}
										</Select>
									</Form.Item>
								</div>

								<Form.Item
									label='Supporting Documents'
									name='documents'
									valuePropName='fileList'
									getValueFromEvent={normFile}
									extra='Upload briefs, mockups, or requirements (PDF, DOCX, PNG)'
								>
									<Dragger multiple beforeUpload={() => false}>
										<p className='ant-upload-drag-icon'>
											<InboxOutlined />
										</p>
										<p className='ant-upload-text'>Click or drag files to this area to upload</p>
										<p className='ant-upload-hint'>Up to 25MB each. We will keep them private.</p>
									</Dragger>
								</Form.Item>

								<Form.Item className='form-actions'>
									<Button size='large' onClick={() => form.resetFields()}>
										Clear Form
									</Button>
									<Button type='primary' size='large' htmlType='submit' loading={submitting}>
										Publish Job
									</Button>
								</Form.Item>
							</Form>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
};

export default CreateJob;
