import '../index.less';
import './index.less';
import Sidebar from '../components/sidebar';
import TopBar from '../../Freelancer/components/topbar';

const ProjectManagement = () => (
	<div className='buyer-shell'>
		<Sidebar active='projects' />
		<main className='buyer-main'>
			<TopBar active='dashboard' />
			<div className='list-project'>


			</div>
		</main>
	</div>
);

export default ProjectManagement;
