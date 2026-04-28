export default [
	{
		path: '/',
		component: './Home',
		layout: false,
	},
	{
		path: '/sign-in',
		component: './sign-in',
		layout: false,
	},
	{
		path: '/login',
		component: './Login',
		layout: false,

	},
	{
		path: '/freelancer',
		component: './Freelancer',
		layout: false,

	},
	{
		path: '/freelancer/profile',
		component: './Freelancer/profile',
		layout: false,

	},
	{
		path: '/buyer',
		component: './Buyer',
		layout: false,

	},
	{
		path: '/buyer/profile',
		component: './Buyer/profile',
		layout: false,

	},
	{
		path: '/buyer/post-job',
		component: './Buyer/post a new job',
		layout: false,

	},
	{
		path: '/buyer/projects',
		component: './Buyer/projects',
		layout: false,

	},
	{
		path: '/buyer/freelancers',
		component: './Buyer/freelancers',
		layout: false,

	},
	{
		path: '/buyer/project-breakdown',
		component: './Buyer/project-breakdown',
		layout: false,
	},
	{
		path: '/buyer/project-detail',
		component: './Buyer/project-detail',
		layout: false,
	},
	{
		path: '/buyer/view-profile/:id',
		component: './Buyer/view-profile',
		layout: false,
	},
	{
		path: '/buyer/messages',
		component: './Buyer/messages',
		layout: false,
	},
	{
		path: '/freelancer/find-jobs',
		component: './Freelancer/find-jobs',
		layout: false,
	},
	{
		path: '/freelancer/detail',
		component: './Freelancer/find-jobs/detail',
		layout: false,
	},
	{
		path: '/freelancer/messages',
		component: './Freelancer/messages',
		layout: false,
	},
	{
		path: '/freelancer/active-jobs',
		component: './Freelancer/active-jobs',
		layout: false,
	},
	{
		path: '/freelancer/active-jobs/detail/:id',
		component: './Freelancer/active-jobs/active-detail',
		layout: false,
	},
	{
		component: './404',
	},
];
