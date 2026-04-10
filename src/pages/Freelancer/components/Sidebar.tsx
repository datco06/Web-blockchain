import { ConfigProvider, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import type { ConfigProviderProps } from 'antd/lib/config-provider';
import type { ReactNode } from 'react';
import './Sidebar.less';

const { Sider } = Layout;

interface SidebarProps {
	active?: string;
	appearance?: 'light' | 'dark';
}

type IconName = 'dashboard' | 'profile' | 'briefcase' | 'wallet' | 'message' | 'settings';

const iconMap: Record<IconName, ReactNode> = {
	dashboard: (
		<svg viewBox='0 0 24 24'>
			<path d='M3 13h7V3H3zm11 8h7v-8h-7zM3 21h7v-6H3zm11-10h7V3h-7z' />
		</svg>
	),
	profile: (
		<svg viewBox='0 0 24 24'>
			<circle cx='12' cy='8' r='3' />
			<path d='M5 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1' />
		</svg>
	),
	briefcase: (
		<svg viewBox='0 0 24 24'>
			<path d='M4 7h16v12H4z' />
			<path d='M9 7V5h6v2' />
			<path d='M4 12h16' />
		</svg>
	),
	wallet: (
		<svg viewBox='0 0 24 24'>
			<rect x='3' y='6' width='18' height='12' rx='2' />
			<path d='M16 12h5' />
			<circle cx='17' cy='12' r='1' />
		</svg>
	),
	message: (
		<svg viewBox='0 0 24 24'>
			<path d='M4 5h16v12H7l-3 3z' />
		</svg>
	),
	settings: (
		<svg viewBox='0 0 24 24'>
			<circle cx='12' cy='12' r='1.5' />
			<path d='M19.4 15a7.8 7.8 0 0 0 .1-6l2.1-1.7-2-3.4-2.5 1a8.1 8.1 0 0 0-5.8 0l-2.5-1-2 3.4 2.1 1.7a7.8 7.8 0 0 0 0 6L4.7 16.7l2 3.4 2.5-1a8.1 8.1 0 0 0 5.8 0l2.5 1 2-3.4Z' />
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
	{ key: 'profile', label: 'Profile', icon: 'profile', href: '/freelancer/profile' },
	{ key: 'earnings', label: 'Earnings', icon: 'wallet', href: '/freelancer/earnings' },
	{ key: 'messages', label: 'Messages', icon: 'message', href: '#' },
];

const Sidebar = ({ active = 'dashboard', appearance = 'dark' }: SidebarProps) => {
	const themeConfig: ConfigProviderProps['theme'] =
		appearance === 'dark'
			? {
					primaryColor: '#2563eb',
					infoColor: '#94a3b8',
					successColor: '#22c55e',
					warningColor: '#f97316',
					errorColor: '#ef4444',
			  }
			: {
					primaryColor: '#2563eb',
					infoColor: '#475569',
					successColor: '#16a34a',
					warningColor: '#d97706',
					errorColor: '#dc2626',
			  };

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
		<ConfigProvider theme={themeConfig}>
			<Layout hasSider className='sidebar-layout'>
				<Sider
					width={264}
					breakpoint='lg'
					collapsedWidth={84}
					theme={appearance}
					className={`sidebar ${appearance}`}
				>
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
					<div className='sidebar-upgrade'>
						<h4>Upgrade to Pro</h4>
						<p>Get 0% service fees and priority bidding.</p>
						<button>Go Pro Now</button>
					</div>
				</Sider>
			</Layout>
		</ConfigProvider>
	);
};

export default Sidebar;
