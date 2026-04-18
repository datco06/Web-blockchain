import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import './sidebar.less';

interface SidebarProps {
	active?: string;
}

const menuItems = [
	{ key: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/buyer' },
	{ key: 'active', label: 'Active Jobs', icon: 'briefcase', href: '/buyer/post-job' },
	{ key: 'projects', label: 'Project Management', icon: 'project', href: '/buyer/projects' },
	{ key: 'messages', label: 'Messages', icon: 'message', href: '/buyer/messages' },
	{ key: 'freelancers', label: 'Freelancers', icon: 'users', href: '/buyer/freelancers' },
];

const iconMap: Record<string, React.ReactNode> = {
	dashboard: (
		<svg viewBox='0 0 24 24' className='custom-svg-icon'>
			<rect x='3' y='3' width='7' height='7' rx='1.5' />
			<rect x='14' y='3' width='7' height='7' rx='1.5' />
			<rect x='14' y='14' width='7' height='7' rx='1.5' />
			<rect x='3' y='14' width='7' height='7' rx='1.5' />
		</svg>
	),
	briefcase: (
		<svg viewBox='0 0 24 24' className='custom-svg-icon'>
			<rect x='2' y='7' width='20' height='14' rx='2' />
			<path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' />
		</svg>
	),
	project: (
		<svg viewBox='0 0 24 24' className='custom-svg-icon'>
			<rect x='3' y='3' width='18' height='18' rx='2' />
			<line x1='9' y1='3' x2='9' y2='21' />
			<path d='M13 8h4' />
			<path d='M13 12h4' />
		</svg>
	),
	wallet: (
		<svg viewBox='0 0 24 24' className='custom-svg-icon'>
			<path d='M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4' />
			<path d='M4 6v12c0 1.1.9 2 2 2h14v-4' />
			<path d='M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h2v-4z' />
		</svg>
	),
	message: (
		<svg viewBox='0 0 24 24' className='custom-svg-icon'>
			<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
		</svg>
	),
	users: (
		<svg viewBox='0 0 24 24' className='custom-svg-icon'>
			<path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
			<circle cx='9' cy='7' r='4' />
			<path d='M23 21v-2a4 4 0 0 0-3-3.87' />
			<path d='M16 3.13a4 4 0 0 1 0 7.75' />
		</svg>
	),
};

const Sidebar = ({ active = 'dashboard' }: SidebarProps) => {
	const items: MenuProps['items'] = menuItems.map((item) => ({
		key: item.key,
		icon: iconMap[item.icon],
		label: item.label,
	}));

	const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
		const target = menuItems.find((item) => item.key === key);
		if (target?.href) {
			window.location.href = target.href;
		}
	};

	return (
		<div className='sidebar buyer-sidebar'>
			<div className='sidebar-brand'>
				<div className='brand-icon'>TF</div>
				<strong>TrustFlow</strong>
			</div>

			<div className='sidebar-menu'>
				<p className='menu-heading'>Main Menu</p>
				<Menu
					mode='inline'
					items={items}
					selectedKeys={[active]}
					onClick={handleMenuClick}
				/>
			</div>

			<div className='sidebar-spacer' />

		</div>
	);
};

export default Sidebar;
