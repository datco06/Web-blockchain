import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';
import './Sidebar.less';

interface SidebarProps {
	active?: string;
	appearance?: 'light' | 'dark';
}

type IconName = 'dashboard' | 'profile' | 'briefcase' | 'wallet' | 'message' | 'settings' | 'search';

const iconMap: Record<IconName, ReactNode> = {
	dashboard: (
		<svg viewBox='0 0 24 24'>
			<rect x='3' y='3' width='7' height='7' rx='1.5' />
			<rect x='14' y='3' width='7' height='7' rx='1.5' />
			<rect x='14' y='14' width='7' height='7' rx='1.5' />
			<rect x='3' y='14' width='7' height='7' rx='1.5' />
		</svg>
	),
	profile: (
		<svg viewBox='0 0 24 24'>
			<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
			<circle cx='12' cy='7' r='4' />
		</svg>
	),
	briefcase: (
		<svg viewBox='0 0 24 24'>
			<rect x='2' y='7' width='20' height='14' rx='2' />
			<path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' />
		</svg>
	),
	wallet: (
		<svg viewBox='0 0 24 24'>
			<path d='M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4' />
			<path d='M4 6v12c0 1.1.9 2 2 2h14v-4' />
			<path d='M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h2v-4z' />
		</svg>
	),
	message: (
		<svg viewBox='0 0 24 24'>
			<path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
		</svg>
	),
	settings: (
		<svg viewBox='0 0 24 24'>
			<circle cx='12' cy='12' r='3' />
			<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' />
		</svg>
	),
	search: (
		<svg viewBox='0 0 24 24'>
			<circle cx='11' cy='11' r='8' />
			<line x1='21' y1='21' x2='16.65' y2='16.65' />
		</svg>
	),
};

type MenuItem = {
	key: string;
	label: string;
	icon: IconName;
	href: string;
};

const menuItems: MenuItem[] = [
	{ key: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/freelancer' },
	{ key: 'find-jobs', label: 'Find Jobs', icon: 'search', href: '/freelancer/find-jobs' },
	{ key: 'profile', label: 'Profile', icon: 'profile', href: '/freelancer/profile' },
	{ key: 'active-jobs', label: 'Active Jobs', icon: 'briefcase', href: '/freelancer/active-jobs' },
	{ key: 'messages', label: 'Messages', icon: 'message', href: '/freelancer/messages' },

];

const Sidebar = ({ active = 'dashboard', appearance = 'light' }: SidebarProps) => {
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
		<div className={`sidebar freelancer-sidebar ${appearance}`}>
			<div className='sidebar-brand'>
				<div className='brand-icon'>TF</div>
				<strong>TrustFlow</strong>
			</div>
			<div className='sidebar-menu'>
				<p className='menu-heading'>Main Menu</p>
				<Menu
					mode='inline'
					theme={appearance}
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
