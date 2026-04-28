import './index.less';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/topbar';
import Contact from './components/contact';
import Serviceskill from './components/serviceskill';
import Portfolio from './components/portfolio';
import RightPanels from './components/rightpanels';

import { useModel } from 'umi';

const Profile = () => {
	const { isEditing, setIsEditing } = useModel('freelancer.profile.index');

	return (
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
								<h1>{isEditing ? 'Editing Profile' : 'Profile'}</h1>
								<p>
									{isEditing
										? 'Refine your professional appearance and service offerings.'
										: 'Your public identity on the TrustFlow network.'}
								</p>
							</div>
							<div className='edit-actions'>
								{isEditing ? (
									<>

										<button className='primary' onClick={() => setIsEditing(false)}>
											Save Profile
										</button>
									</>
								) : (
									<button className='primary' onClick={() => setIsEditing(true)}>
										Edit Profile
									</button>
								)}
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
};

export default Profile;
