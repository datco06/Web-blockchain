import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../../Freelancer/components/topbar';

const CreateJob = () => (
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
						<button type='button' className='ghost'>Save Draft</button>
						<button type='button' className='primary'>Publish Job</button>
					</div>
				</section>

					<div className='create-job-body'>
						<section className='form-card'>
							<h2>Project Details</h2>
							<label>
								<span>Job Title</span>
								<input type='text' placeholder='e.g. Senior Product Designer for Fintech App' />
							</label>
							<label>
								<span>Description</span>
								<textarea placeholder='Describe the scope, deliverables, and expectations.' />
							</label>
							<label>
								<span>Main Functionality</span>
								<textarea placeholder='List the core flows, features, or milestones you expect.' />
							</label>
							<label>
								<span>Technical Requirements</span>
								<textarea placeholder='Stack preferences, integrations, compliance, or performance targets.' />
							</label>
							<div className='two-col'>
								<label>
									<span>Deadline</span>
									<input type='date' />
								</label>
								<label>
									<span>Budget</span>
									<input type='text' placeholder='$5,000 – $7,500' />
								</label>
							</div>
							<label className='file-upload'>
								<span>Supporting Documents</span>
								<input type='file' multiple />
								<div className='file-drop'>
									<p>Drag & drop briefs, mockups, or requirements (PDF, DOCX, PNG)</p>
									<button type='button'>Upload files</button>
								</div>
							</label>
						</section>
					</div>
				</div>
			</main>
	</div>
);

export default CreateJob;
