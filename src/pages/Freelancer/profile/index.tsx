import './index.less';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/topbar';
import Contact from './components/contact';
import Serviceskill from './components/serviceskill';
import Portfolio from './components/portfolio';
import RightPanels from './components/rightpanels';

const Profile = () => (
	<div className='profile-shell'>
		<aside className='profile-sidebar'>
			<Sidebar active='profile' />
		</aside>
		<main className='profile-main'>
			<TopBar active='profile' />
			<div className='profile-content'>
				<div className='profile-left'>
					<section className='edit-intro'>
						<div>
							<h1>Edit Profile</h1>
							<p>Refine your professional appearance and service offerings.</p>
						</div>
						<div className='edit-actions'>
							<button className='ghost'>Discard Changes</button>
							<button className='primary'>Save Profile</button>
						</div>
					</section>
					<Contact />
					<Serviceskill />
					<Portfolio />
				</div>
				<div className='profile-right'>
					<RightPanels />
				</div>
			</div>
		</main>
	</div>
);

export default Profile;
