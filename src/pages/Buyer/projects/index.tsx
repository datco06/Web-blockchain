import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../../Freelancer/components/topbar';

const ProjectManagement = () => (
	<div className='buyer-shell'>
		<Sidebar active='projects' />
		<main className='buyer-main'>
			<TopBar active='dashboard' />
			<div className='buyer-content project-content'>
				<section className='overview-header'>
					<div>
						<p className='eyebrow'>Project management</p>
						<h1>Track every project across its lifecycle.</h1>
					</div>
				</section>

				<section className='project-empty'>
					<h2>Project health overview coming soon</h2>
					<p>Use the Freelancers tab to review bids and shortlist talent while we finish this dashboard.</p>
					<a className='primary link-button' href='/buyer/freelancers'>
						Go to freelancers
					</a>
				</section>
			</div>
		</main>
	</div>
);

export default ProjectManagement;
