import './sidebar.less';

interface SidebarProps {
	active?: string;
}

const menuItems = [
	{ key: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: '/buyer' },
	{ key: 'active', label: 'Active Jobs', icon: 'briefcase', href: '#' },
	{ key: 'projects', label: 'Project Management', icon: 'document', href: '/buyer/projects' },
	{ key: 'escrow', label: 'Escrow', icon: 'wallet', href: '/buyer/escrow' },
	{ key: 'messages', label: 'Messages', icon: 'message', href: '#' },
	{ key: 'freelancers', label: 'Freelancers', icon: 'users', href: '/buyer/freelancers' },
];

const iconMap: Record<string, JSX.Element> = {
	dashboard: (
		<svg viewBox='0 0 24 24'>
			<path d='M3 13h7V3H3zm11 8h7v-8h-7zM3 21h7v-6H3zm11-10h7V3h-7z' />
		</svg>
	),
	briefcase: (
		<svg viewBox='0 0 24 24'>
			<path d='M4 7h16v12H4z' />
			<path d='M9 7V5h6v2' />
			<path d='M4 12h16' />
		</svg>
	),
	document: (
		<svg viewBox='0 0 24 24'>
			<path d='M7 3h7l5 5v13H7z' />
			<path d='M14 3v5h5' />
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
	users: (
		<svg viewBox='0 0 24 24'>
			<circle cx='9' cy='8' r='4' />
			<path d='M17 11a4 4 0 1 0-3-7' />
			<path d='M3 21a6 6 0 0 1 12 0' />
			<path d='M14 18a5 5 0 0 1 7 3' />
		</svg>
	),
};

const Sidebar = ({ active = 'dashboard' }: SidebarProps) => (
	<div className='sidebar buyer-sidebar'>
		<div className='sidebar-brand'>
			<div className='brand-icon'>TF</div>
			<strong>TrustFlow</strong>
		</div>
		<nav className='sidebar-menu'>
			<p className='menu-heading'>Main Menu</p>
			{menuItems.map((item) => (
				<a
					key={item.key}
					className={active === item.key ? 'menu-item active' : 'menu-item'}
					href={item.href}
				>
					<span className={`menu-icon ${item.icon}`}>{iconMap[item.icon]}</span>
					<span>{item.label}</span>
					{item.badge && <span className='badge'>{item.badge}</span>}
				</a>
			))}
		</nav>
		<div className='sidebar-spacer' />
		<div className='sidebar-upgrade'>
			<h4>Invite collaborators</h4>
			<p>Share access with your finance team to approve releases faster.</p>
			<button>Invite team</button>
		</div>
	</div>
);

export default Sidebar;
